"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TextDecodeProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const NUCLEOTIDES = ["A", "T", "C", "G"];

export const TextDecode: React.FC<TextDecodeProps> = ({
  text,
  className,
  delay = 0,
  speed = 35,
}) => {
  const isReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState<string>(text);
  const [hasDecoded, setHasDecoded] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayText(text);
      setHasDecoded(true);
      return;
    }

    let intervalId: NodeJS.Timeout;
    const length = text.length;

    // Start decoding after delay
    const timeoutId = setTimeout(() => {
      let iteration = 0;

      intervalId = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " " || char === "." || char === "-" || char === ",") return char;
              if (index < iteration) {
                return text[index];
              }
              return NUCLEOTIDES[Math.floor(Math.random() * NUCLEOTIDES.length)];
            })
            .join("")
        );

        if (iteration >= length) {
          clearInterval(intervalId);
          setHasDecoded(true);
        }

        iteration += 1 / 3;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed, isReducedMotion]);

  return (
    <span ref={containerRef} className={cn("inline-block", className)}>
      {displayText}
      {!hasDecoded && !isReducedMotion && (
        <span className="inline-block w-[0.4em] h-[0.9em] ml-1 bg-accent-lime animate-pulse align-baseline" />
      )}
    </span>
  );
};
