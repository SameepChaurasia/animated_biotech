"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    if (isReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isReducedMotion, isMobile]);

  if (isReducedMotion || isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none">
      {/* Inner Glowing Cursor Dot */}
      <div
        className="fixed w-2.5 h-2.5 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#3B82F6]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
};

