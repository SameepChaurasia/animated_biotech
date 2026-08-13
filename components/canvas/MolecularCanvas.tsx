"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
  helixTargetX: number;
  helixTargetY: number;
}

interface MolecularCanvasProps {
  scrollProgress?: number; // 0 to 1
  className?: string;
}

const COLORS = ["#C8FF4D", "#00E5FF", "#0FA37F", "#4DA8FF"];

export const MolecularCanvas: React.FC<MolecularCanvasProps> = ({
  scrollProgress = 0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const PARTICLE_COUNT = 180;
    const particles: Particle[] = [];

    // Resize handler with DevicePixelRatio
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        baseAlpha: Math.random() * 0.5 + 0.4,
        helixTargetX: 0,
        helixTargetY: 0,
      });
    }

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Main render loop
    const render = () => {
      time += 0.015;
      const currentWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const currentHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      const centerX = currentWidth * 0.5;

      // Clear canvas with trail blur
      ctx.fillStyle = "rgba(5, 8, 10, 0.22)";
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      // Calculate particle positions
      particles.forEach((p, i) => {
        // DNA Helix math target
        const angle = (i / PARTICLE_COUNT) * Math.PI * 7;
        const strand = i % 2 === 0 ? 1 : -1;
        const helixRadius = Math.min(currentWidth * 0.22, 180);

        const helixTargetX = centerX + Math.cos(angle + time * 0.5) * helixRadius * strand;
        const helixTargetY = (i / PARTICLE_COUNT) * (currentHeight * 0.78) + currentHeight * 0.11;
        const depth = Math.sin(angle + time * 0.5);

        p.helixTargetX = helixTargetX;
        p.helixTargetY = helixTargetY;

        if (isReducedMotion) {
          // Static positions
          p.x = p.helixTargetX;
          p.y = p.helixTargetY;
        } else {
          // Floating motion
          p.x += p.vx + Math.sin(time + i * 0.1) * 0.3;
          p.y += p.vy + Math.cos(time + i * 0.1) * 0.3;

          // Bounce off screen boundaries when scrollProgress is 0
          if (p.x < 0 || p.x > currentWidth) p.vx *= -1;
          if (p.y < 0 || p.y > currentHeight) p.vy *= -1;

          // Morph to DNA helix based on scrollProgress
          if (scrollProgress > 0.05) {
            const easeProgress = Math.min(scrollProgress * 1.5, 1);
            p.x += (helixTargetX - p.x) * 0.08 * easeProgress;
            p.y += (helixTargetY - p.y) * 0.08 * easeProgress;
          }

          // Mouse repulsion physics
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;

            if (dist < maxDist) {
              const force = (maxDist - dist) / maxDist;
              const pushX = (dx / dist) * force * 6;
              const pushY = (dy / dist) * force * 6;
              p.x += pushX;
              p.y += pushY;
            }
          }
        }

        // Depth alpha scaling in helix mode
        const alpha =
          scrollProgress > 0.3
            ? p.baseAlpha * (0.4 + 0.6 * ((depth + 1) / 2))
            : p.baseAlpha;

        // Render Particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (0.8 + 0.4 * depth), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Proximity & Base-Pair Connection Lines
      const maxDistance = 90;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let connectionCount = 0;
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Draw base pair rungs across helix strands when scrollProgress > 0.3
          const isBasePair =
            scrollProgress > 0.3 &&
            Math.abs(i - j) === 1 &&
            ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0));

          if (isBasePair) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "#C8FF4D";
            ctx.globalAlpha = 0.45;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          } else if (dist < maxDistance && connectionCount < 3) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            connectionCount++;
          }
        }
      }

      ctx.globalAlpha = 1;

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  );
};
