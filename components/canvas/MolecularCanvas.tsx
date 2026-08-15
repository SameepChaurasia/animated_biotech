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
  targetX: number;
  targetY: number;
  phase: number;
}

interface MolecularCanvasProps {
  scrollProgress?: number; // 0 to 1
  className?: string;
}

const COLORS = ["#38BDF8", "#60A5FA", "#818CF8", "#A78BFA", "#C084FC", "#FFFFFF"];

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
  const scrollProgressRef = useRef<number>(scrollProgress);
  const isReducedMotion = useReducedMotion();

  // Keep scrollProgressRef updated without re-triggering the particle setup effect
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let smoothedScroll = scrollProgressRef.current;
    const PARTICLE_COUNT = 240;
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
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.4 + 1.2,
        color: COLORS[i % COLORS.length],
        baseAlpha: Math.random() * 0.4 + 0.5,
        targetX: 0,
        targetY: 0,
        phase: Math.random() * Math.PI * 2,
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Main continuous render loop
    const render = () => {
      time += 0.016;
      const currentWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const currentHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      const centerX = currentWidth * 0.5;
      const centerY = currentHeight * 0.5;

      // Smoothly interpolate scroll progress for silky fluid morphs
      const targetScroll = scrollProgressRef.current;
      smoothedScroll += (targetScroll - smoothedScroll) * 0.08;
      const sp = Math.max(0, Math.min(1, smoothedScroll));

      // Clear canvas cleanly so background gradients shine through
      ctx.clearRect(0, 0, currentWidth, currentHeight);

      // Calculate Topic-Matched Targets for every particle based on active scroll
      particles.forEach((p, i) => {
        let tx = p.x;
        let ty = p.y;
        const normIndex = i / PARTICLE_COUNT;

        if (sp < 0.18) {
          // MODE 1: HERO — 3D Rotating DNA Double-Helix Strand Morph
          const angle = normIndex * Math.PI * 8 + sp * Math.PI * 4;
          const strand = i % 2 === 0 ? 1 : -1;
          const helixRadius = Math.min(currentWidth * 0.28, 240);
          tx = centerX + Math.cos(angle + time * 0.7) * helixRadius * strand;
          ty = normIndex * (currentHeight * 0.82) + currentHeight * 0.09 + Math.sin(time + normIndex * 4) * 12;
        } else if (sp < 0.38) {
          // MODE 2: ABOUT / MISSION — Concentric Atomic Orbital Rings
          const ring = i % 3;
          const r = ring === 0 ? 110 : ring === 1 ? 210 : 330;
          const angle = normIndex * Math.PI * 4 + time * (ring === 1 ? -0.35 : 0.35) + sp * Math.PI * 6;
          tx = centerX + Math.cos(angle) * r;
          ty = centerY + Math.sin(angle) * (r * 0.65);
        } else if (sp < 0.58) {
          // MODE 3: PLATFORM — High-Velocity Parallel Cyber Matrix Streams
          const channel = i % 4;
          const channelY = currentHeight * (0.2 + channel * 0.2);
          const speed = (channel + 1) * 70;
          tx = (i * 35 + time * speed) % (currentWidth + 100) - 50;
          ty = channelY + Math.sin(tx * 0.02 + time * 2) * 20;
        } else if (sp < 0.73) {
          // MODE 4: CAPABILITIES & RESEARCH — Bento Bio-Grid Polyhedron Lattice
          const cols = 8;
          const col = i % cols;
          const row = Math.floor(i / cols) % 12;
          const gridX = (col / (cols - 1)) * (currentWidth * 0.8) + currentWidth * 0.1;
          const gridY = (row / 11) * (currentHeight * 0.8) + currentHeight * 0.1;
          tx = gridX + Math.sin(time * 1.5 + i + sp * 10) * 22;
          ty = gridY + Math.cos(time * 1.5 + i + sp * 10) * 22;
        } else if (sp < 0.88) {
          // MODE 5: GENE PLAYGROUND — Harmonic Nucleotide Sequence Wave
          const waveX = (i / PARTICLE_COUNT) * currentWidth;
          const waveY = centerY + Math.sin(waveX * 0.015 + time * 3 + sp * 8) * 120 * Math.cos(time + i * 0.1);
          tx = waveX;
          ty = waveY;
        } else if (sp < 0.96) {
          // MODE 6: STATS — Flowing Empirical Data Telemetry Waves
          const waveFreq = 0.008;
          const xPos = (i / PARTICLE_COUNT) * currentWidth;
          const yPos = centerY + Math.sin(xPos * waveFreq + time * 2) * 140 + Math.sin(xPos * 0.02 + time + sp * 12) * 45;
          tx = xPos;
          ty = yPos;
        } else {
          // MODE 7: FINAL CTA — Convergent Cyan Light Ray Vortex
          const vortexRadius = (1 - normIndex) * Math.min(currentWidth, currentHeight) * 0.48;
          const vortexAngle = normIndex * Math.PI * 12 + time * 1.4;
          tx = centerX + Math.cos(vortexAngle) * vortexRadius;
          ty = centerY + Math.sin(vortexAngle) * vortexRadius;
        }

        p.targetX = tx;
        p.targetY = ty;

        if (isReducedMotion) {
          p.x = p.targetX;
          p.y = p.targetY;
        } else {
          // Smooth fluid interpolation towards active conformation
          p.x += (p.targetX - p.x) * 0.06;
          p.y += (p.targetY - p.y) * 0.06;

          // Gentle ambient floating drift
          p.x += Math.sin(time + p.phase) * 0.35;
          p.y += Math.cos(time + p.phase) * 0.35;

          // Interactive mouse repulsion physics
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 180;

            if (dist < maxDist) {
              const force = (maxDist - dist) / maxDist;
              const pushX = (dx / dist) * force * 10;
              const pushY = (dy / dist) * force * 10;
              p.x += pushX;
              p.y += pushY;
            }
          }
        }

        // Render Glowing Node Sphere
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.35, Math.min(1, p.baseAlpha));
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Dynamic Constellation Connection Lines
      const maxDistance = sp >= 0.35 && sp < 0.6 ? 130 : 95;
      for (let i = 0; i < PARTICLE_COUNT; i += 2) {
        let connectionCount = 0;
        for (let j = i + 1; j < PARTICLE_COUNT; j += 2) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance && connectionCount < 2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.35;
            ctx.lineWidth = 0.9;
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`inset-0 w-full h-full ${className}`}
    />
  );
};
