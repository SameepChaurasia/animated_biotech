"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2000,
  className,
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setCount(target);
      setHasAnimated(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = easeOutProgress * target;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target, duration, hasAnimated, isReducedMotion]);

  const formattedValue = count.toFixed(decimals);

  return (
    <span ref={containerRef} className={cn("font-mono text-accent-lime font-bold", className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
