"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 14,
  onClick,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || isMobile || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set((distanceX / (rect.width / 2)) * strength);
    y.set((distanceY / (rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isReducedMotion || isMobile) {
    return (
      <div onClick={onClick} className={cn("inline-block cursor-pointer", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={cn("inline-block cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
};
