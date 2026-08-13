"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/audio";

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const COLORS = ["#C8FF4D", "#00E5FF", "#0FA37F", "#FF6B9D"];

export const ParticleBurstContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundManager.playClickSound();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newParticles: BurstParticle[] = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 800);
  };

  return (
    <div onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {children}
      <AnimatePresence>
        {particles.map((p) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 60 + 20;
          const targetX = p.x + Math.cos(angle) * distance;
          const targetY = p.y + Math.sin(angle) * distance;

          return (
            <motion.span
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
              animate={{ x: targetX, y: targetY, opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full pointer-events-none z-50 shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: p.color, color: p.color }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};
