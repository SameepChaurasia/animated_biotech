"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Activity, ShieldCheck, Cpu, Database, Zap, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/audio";

const STAGES = [
  "INITIALIZING PETABASE QUANTUM CORE...",
  "LOADING 3D MOLECULAR DIFFUSION MODELS...",
  "SYNTHESIZING 0.38Å ATOMIC BACKBONE...",
  "CALIBRATING CLOSED-LOOP WET LAB...",
  "SYSTEM ONLINE · WELCOME TO CODEX BIO",
];

const CODON_STREAMS = [
  ["A", "T", "G", "C", "A", "T", "C", "G"],
  ["G", "C", "T", "A", "C", "G", "T", "A"],
  ["5'", "A", "T", "C", "G", "0", "3", "3'"],
  ["C", "R", "I", "S", "P", "R", "-", "v4"],
  ["P", "E", "T", "A", "B", "I", "O", "S"],
];

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setLoading(false);
      return;
    }

    // High-speed non-linear telemetry progression (~850ms total)
    const startTime = performance.now();
    const duration = 850;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      // Non-linear easing: snappy initial burst + smooth finish
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const currentProgress = Math.min(100, Math.round(eased * 100));

      setProgress(currentProgress);

      if (currentProgress < 25) setStageIndex(0);
      else if (currentProgress < 50) setStageIndex(1);
      else if (currentProgress < 75) setStageIndex(2);
      else if (currentProgress < 98) setStageIndex(3);
      else setStageIndex(4);

      if (t >= 1) {
        clearInterval(interval);
        setProgress(100);
        setStageIndex(4);
        try {
          soundManager.playSuccessSynth();
        } catch {
          // Audio fallback
        }
        setTimeout(() => setLoading(false), 200);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(8px)",
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] text-white select-none pointer-events-none overflow-hidden"
        >
          {/* High-Tech Background Cyber Grid Overlay */}
          <div className="absolute inset-0 bg-perspective-grid opacity-35 pointer-events-none" />

          {/* Rapid Vertical Laser Scanning Ray */}
          <motion.div
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38BDF8] pointer-events-none z-10 opacity-80"
          />

          {/* Ambient Luminous Biotech Glow Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.25, 1, 1.25],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[550px] h-[550px] bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none"
          />

          {/* Floating DNA Codon Matrix Streams (Left & Right Flanks) */}
          <div className="absolute inset-y-0 left-6 sm:left-12 flex items-center justify-center gap-6 opacity-40 font-mono text-xs text-cyan-400 pointer-events-none hidden md:flex">
            {CODON_STREAMS.slice(0, 3).map((stream, colIdx) => (
              <motion.div
                key={colIdx}
                animate={{ y: [-25, 25, -25] }}
                transition={{ duration: 1.5 + colIdx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col gap-2.5 items-center"
              >
                {stream.map((char, charIdx) => (
                  <span key={charIdx} className="font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                    {char}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="absolute inset-y-0 right-6 sm:right-12 flex items-center justify-center gap-6 opacity-40 font-mono text-xs text-indigo-400 pointer-events-none hidden md:flex">
            {CODON_STREAMS.slice(2, 5).map((stream, colIdx) => (
              <motion.div
                key={colIdx}
                animate={{ y: [25, -25, 25] }}
                transition={{ duration: 1.6 + colIdx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col gap-2.5 items-center"
              >
                {stream.map((char, charIdx) => (
                  <span key={charIdx} className="font-bold text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                    {char}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Holographic Corner Telemetry HUD Brackets */}
          <div className="absolute top-6 left-6 font-mono text-[10px] text-slate-400 flex items-center gap-2 z-20">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-bold tracking-wider">// SYSTEM: CODEX BIO v4.2</span>
          </div>

          <div className="absolute top-6 right-6 font-mono text-[10px] text-slate-400 hidden sm:flex items-center gap-2 z-20">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 tracking-wider">PETABASE COMPUTE: 1.4B PARAMS</span>
          </div>

          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-slate-400 hidden sm:flex items-center gap-2 z-20">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 tracking-wider">BY SAMEEP CHAURASIA</span>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-slate-400 hidden sm:flex items-center gap-2 z-20">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-300 tracking-wider">PRECISION: 0.38Å RMSD · 100% PURITY</span>
          </div>

          {/* Central Holographic Molecular Fusion Core */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-5 flex items-center justify-center z-20">
            {/* Outer Fast-Spinning Neon Dashed Gyroscope Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            />

            {/* Counter-Spinning Cyber Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2.5 rounded-full border-2 border-indigo-400/50 border-t-cyan-300 border-r-transparent shadow-[0_0_25px_rgba(99,102,241,0.35)]"
            />

            {/* Inner Pulsing Bioluminescent Sphere */}
            <motion.div
              animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 rounded-full bg-gradient-to-tr from-cyan-600/25 via-blue-600/30 to-indigo-600/25 border border-cyan-400/70 shadow-[0_0_40px_rgba(56,189,248,0.5)]"
            />

            {/* High-Speed Orbiting Bioluminescent Quantum Nodes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_15px_#38BDF8] absolute -top-1.5" />
              <div className="w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_12px_#818CF8] absolute -bottom-1.5" />
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#FFFFFF] absolute -left-1" />
              <div className="w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_10px_#C084FC] absolute -right-1" />
            </motion.div>

            {/* Central Animated Double Helix SVG Core */}
            <div className="relative w-24 h-24 z-10 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                {/* Strand A */}
                <motion.path
                  d="M 20 50 Q 35 15, 50 50 T 80 50"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                {/* Strand B */}
                <motion.path
                  d="M 20 50 Q 35 85, 50 50 T 80 50"
                  stroke="#818CF8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                {/* Hydrogen Bonds */}
                <motion.line
                  x1="35"
                  y1="30"
                  x2="35"
                  y2="70"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeDasharray="2 2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                />
                <motion.line
                  x1="65"
                  y1="30"
                  x2="65"
                  y2="70"
                  stroke="#C084FC"
                  strokeWidth="3"
                  strokeDasharray="2 2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                />
              </svg>
            </div>
          </div>

          {/* Telemetry Status & Progress Counter */}
          <div className="flex flex-col items-center gap-2.5 z-20 px-4 text-center">
            {/* Recruiter Attribution Tag */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] tracking-widest font-bold uppercase shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CODEX BIO · BY SAMEEP CHAURASIA</span>
            </div>

            {/* High-Speed Percentage Display with Cyber Gradient */}
            <div className="font-mono text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent flex items-baseline gap-1 my-0.5 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
              <motion.span
                key={progress}
                initial={{ opacity: 0.85, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.04 }}
              >
                {progress}
              </motion.span>
              <span className="text-cyan-400 text-3xl font-bold">%</span>
            </div>

            {/* Dynamic Stage Text Ticker */}
            <div className="font-mono text-xs text-slate-300 tracking-wider h-5 flex items-center justify-center font-medium">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-center gap-2 text-slate-200 font-semibold"
                >
                  <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
                  {STAGES[stageIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* High-Speed Progress Bar Container */}
            <div className="w-72 sm:w-96 h-2.5 bg-slate-950 border border-cyan-500/40 rounded-full overflow-hidden mt-2.5 p-0.5 relative shadow-[0_0_25px_rgba(56,189,248,0.3)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_20px_#38BDF8] relative transition-all duration-75"
                style={{ width: `${progress}%` }}
              >
                {/* Light Scanning Ray */}
                <div className="absolute top-0 bottom-0 right-0 w-8 bg-white blur-[2px] animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
