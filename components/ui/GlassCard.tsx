"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  tilt?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = true,
  tilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });

    if (!tilt || isReducedMotion || isMobile) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl p-6 md:p-8 bg-surface-elevated/75 backdrop-blur-xl border border-border/90 transition-all duration-300 group overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        glow && "hover:border-accent-cyan/60 hover:shadow-[0_0_40px_rgba(0,229,255,0.22)]",
        className
      )}
      style={{ transformStyle: "preserve-3d", transitionProperty: "transform, border-color, box-shadow" }}
    >
      {/* Cyber Corner Bracket Accent Lights */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-cyan/40 group-hover:border-accent-cyan transition-colors pointer-events-none rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-lime/40 group-hover:border-accent-lime transition-colors pointer-events-none rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-emerald/40 group-hover:border-accent-emerald transition-colors pointer-events-none rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-cyan/40 group-hover:border-accent-cyan transition-colors pointer-events-none rounded-br-2xl" />

      {/* Dynamic Cursor Spotlight Radial Glow inside Card */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 229, 255, 0.12), transparent 80%)`,
        }}
      />

      {/* Ambient background glow blob inside card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-cyan/5 rounded-full blur-3xl group-hover:bg-accent-cyan/15 transition-colors pointer-events-none" />
      {children}
    </div>
  );
};

