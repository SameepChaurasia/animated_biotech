"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const COLORS = ["#C8FF4D", "#00E5FF", "#0FA37F"];

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    if (isReducedMotion || isMobile) return;

    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle creation slightly
      if (Math.random() > 0.4) return;

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 4 + 2,
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [isReducedMotion, isMobile]);

  if (isReducedMotion || isMobile || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full blur-[1px] transition-all duration-500 ease-out animate-ping"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};
