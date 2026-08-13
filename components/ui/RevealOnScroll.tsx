"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "left" | "right" | "down" | "none";
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getTransformStyle = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 30px, 0)";
      case "down":
        return "translate3d(0, -30px, 0)";
      case "left":
        return "translate3d(-30px, 0, 0)";
      case "right":
        return "translate3d(30px, 0, 0)";
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformStyle(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
