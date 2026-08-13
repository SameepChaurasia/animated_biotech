"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void text-ink select-none pointer-events-none"
        >
          {/* Logo Monogram Animated SVG */}
          <div className="relative w-20 h-20 mb-8">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-accent-lime fill-none stroke-[2.5]"
            >
              {/* Helix strand 1 */}
              <motion.path
                d="M 20 50 Q 35 20, 50 50 T 80 50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Helix strand 2 */}
              <motion.path
                d="M 20 50 Q 35 80, 50 50 T 80 50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Nucleotide rungs */}
              <motion.line
                x1="35"
                y1="35"
                x2="35"
                y2="65"
                stroke="#00E5FF"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
              <motion.line
                x1="65"
                y1="35"
                x2="65"
                y2="65"
                stroke="#00E5FF"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-sm uppercase tracking-widest text-accent-lime font-semibold">
              // CODEX BIO SEQUENCING ENGINE
            </span>
            <div className="font-mono text-4xl font-bold text-ink">
              {Math.min(progress, 100)}
              <span className="text-accent-lime text-2xl">%</span>
            </div>
            {/* Progress bar line */}
            <div className="w-48 h-1 bg-surface-elevated rounded-full overflow-hidden mt-3">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-emerald"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
