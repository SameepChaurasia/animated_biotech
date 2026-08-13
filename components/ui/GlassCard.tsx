"use client";

import React, { useRef } from "react";
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
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || isReducedMotion || isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // max 5deg tilt
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
        "relative rounded-2xl p-6 md:p-8 bg-surface/70 backdrop-blur-xl border border-border transition-all duration-300 group overflow-hidden",
        glow && "hover:border-accent-lime/40 hover:shadow-[0_0_40px_rgba(200,255,77,0.12)]",
        className
      )}
      style={{ transformStyle: "preserve-3d", transitionProperty: "transform, border-color, box-shadow" }}
    >
      {/* Glow highlight blob inside card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-lime/5 rounded-full blur-3xl group-hover:bg-accent-lime/10 transition-colors pointer-events-none" />
      {children}
    </div>
  );
};
