"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    if (isReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Lagging trail animation loop
    let reqId: number;
    const animateTrail = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      reqId = requestAnimationFrame(animateTrail);
    };

    reqId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, [position.x, position.y, isReducedMotion, isMobile]);

  if (isReducedMotion || isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none">
      {/* Inner Dot */}
      <div
        className="fixed w-2.5 h-2.5 bg-accent-lime rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_10px_#C8FF4D]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Outer Lagging Ring */}
      <div
        className={`fixed border rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovered
            ? "w-12 h-12 border-accent-lime bg-accent-lime/10 scale-125"
            : "w-8 h-8 border-accent-cyan/60 bg-transparent"
        }`}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
      />
    </div>
  );
};
