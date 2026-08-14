"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Activity, ShieldCheck, Cpu, Database } from "lucide-react";

const STAGES = [
  "INITIALIZING PETABASE BIO-COMPUTE...",
  "LOADING 3D MOLECULAR DIFFUSION MODELS...",
  "SYNTHESIZING GENOMIC BASE PAIR STRANDS...",
  "CALIBRATING CLOSED-LOOP WET LAB...",
  "SYSTEM ONLINE · WELCOME TO CODEX BIO",
];

const CODON_STREAMS = [
  ["A", "T", "C", "G", "A", "T", "C", "G"],
  ["G", "C", "T", "A", "G", "C", "T", "A"],
  ["5'", "A", "T", "C", "G", "8", "8", "3'"],
  ["C", "R", "I", "S", "P", "R", "-", "V2"],
  ["P", "E", "T", "A", "B", "A", "S", "E"],
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

    const totalDurationMs = 1500; // ~1.5 seconds high-velocity load
    const intervalTime = 20;
    const totalSteps = totalDurationMs / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(nextProgress);

      if (nextProgress < 25) setStageIndex(0);
      else if (nextProgress < 50) setStageIndex(1);
      else if (nextProgress < 75) setStageIndex(2);
      else if (nextProgress < 98) setStageIndex(3);
      else setStageIndex(4);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
    }, intervalTime);

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
            scale: 1.08,
            filter: "blur(6px)",
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white select-none pointer-events-none overflow-hidden"
        >
          {/* Full-Page Perspective Grid Overlay */}
          <div className="absolute inset-0 bg-perspective-grid opacity-40 pointer-events-none" />

          {/* Full-Page Vertical Laser Scanning Line Beam */}
          <motion.div
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_#38BDF8] pointer-events-none z-10 opacity-75"
          />

          {/* Background Ambient Radial Glows */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[650px] h-[650px] bg-blue-600/25 rounded-full blur-[160px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] bg-indigo-600/25 rounded-full blur-[160px] pointer-events-none"
          />

          {/* Full-Page Floating DNA Codon Matrix Streams (Left & Right Flanks) */}
          <div className="absolute inset-y-0 left-6 sm:left-12 flex items-center justify-center gap-6 opacity-35 font-mono text-xs text-blue-400 pointer-events-none hidden md:flex">
            {CODON_STREAMS.slice(0, 3).map((stream, colIdx) => (
              <motion.div
                key={colIdx}
                animate={{ y: [-30, 30, -30] }}
                transition={{ duration: 2 + colIdx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col gap-3 items-center"
              >
                {stream.map((char, charIdx) => (
                  <span key={charIdx} className="font-bold text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                    {char}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="absolute inset-y-0 right-6 sm:right-12 flex items-center justify-center gap-6 opacity-35 font-mono text-xs text-indigo-400 pointer-events-none hidden md:flex">
            {CODON_STREAMS.slice(2, 5).map((stream, colIdx) => (
              <motion.div
                key={colIdx}
                animate={{ y: [30, -30, 30] }}
                transition={{ duration: 2.2 + colIdx * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col gap-3 items-center"
              >
                {stream.map((char, charIdx) => (
                  <span key={charIdx} className="font-bold text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                    {char}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Full-Page Corner HUD Brackets & Diagnostic Markers */}
          <div className="absolute top-6 left-6 font-mono text-[10px] text-slate-400 flex items-center gap-2 z-20">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-blue-400 font-bold">// SYSTEM: CODEX BIO v4.2</span>
          </div>

          <div className="absolute top-6 right-6 font-mono text-[10px] text-slate-400 hidden sm:flex items-center gap-2 z-20">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300">PETABASE CLOUD COMPUTE: ACTIVE</span>
          </div>

          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-slate-400 hidden sm:flex items-center gap-2 z-20">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300">BY SAMEEP CHAURASIA</span>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-slate-400 hidden sm:flex items-center gap-2 z-20">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-300">LATENCY: 0.4ms · 100% ACCURACY</span>
          </div>

          {/* Central Holographic Animation Hub */}
          <div className="relative w-48 h-48 mb-6 flex items-center justify-center z-20">
            {/* Outer Fast Spinning Dashed Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/50"
            />

            {/* Counter-Spinning Ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2.5 rounded-full border-2 border-indigo-400/40 border-t-blue-400 border-r-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            />

            {/* Inner Pulsing Radar Circle */}
            <motion.div
              animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 rounded-full bg-blue-600/15 border border-blue-400/60 shadow-[0_0_35px_rgba(59,130,246,0.4)]"
            />

            {/* Orbiting Bioluminescent Node Spheres */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-3.5 h-3.5 bg-blue-400 rounded-full shadow-[0_0_15px_#3B82F6] absolute -top-2" />
              <div className="w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_12px_#6366F1] absolute -bottom-1.5" />
              <div className="w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#38BDF8] absolute -left-1.5" />
            </motion.div>

            {/* Central High-Speed Double Helix SVG */}
            <div className="relative w-24 h-24 z-10 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                {/* Strand A */}
                <motion.path
                  d="M 20 50 Q 35 15, 50 50 T 80 50"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                />
                {/* Strand B */}
                <motion.path
                  d="M 20 50 Q 35 85, 50 50 T 80 50"
                  stroke="#818CF8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                />
                {/* Nucleotide Bonds */}
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
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
                <motion.line
                  x1="65"
                  y1="30"
                  x2="65"
                  y2="70"
                  stroke="#A855F7"
                  strokeWidth="3"
                  strokeDasharray="2 2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
              </svg>
            </div>
          </div>

          {/* Telemetry Status & Progress Counter */}
          <div className="flex flex-col items-center gap-3 z-20 px-4 text-center">
            {/* Recruiter Attribution Tag */}
            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-400 font-mono text-[11px] tracking-widest font-semibold uppercase shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>CODEX BIO · BY SAMEEP CHAURASIA</span>
            </div>

            {/* High-Speed Percentage Display */}
            <div className="font-mono text-6xl sm:text-7xl font-black tracking-tight text-white flex items-baseline gap-1 my-0.5">
              <motion.span
                key={progress}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.05 }}
              >
                {progress}
              </motion.span>
              <span className="text-blue-400 text-3xl font-bold">%</span>
            </div>

            {/* Dynamic Stage Text Ticker */}
            <div className="font-mono text-xs text-slate-300 tracking-wider h-5 flex items-center justify-center font-medium">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stageIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2 text-slate-200 font-semibold"
                >
                  <Activity className="w-4 h-4 text-blue-400 animate-spin" />
                  {STAGES[stageIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* High-Speed Progress Bar Container */}
            <div className="w-72 sm:w-96 h-2.5 bg-slate-950 border border-blue-500/40 rounded-full overflow-hidden mt-3 p-0.5 relative shadow-[0_0_25px_rgba(59,130,246,0.3)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_20px_#3B82F6] relative"
                style={{ width: `${progress}%` }}
              >
                {/* Light Scanning Ray */}
                <div className="absolute top-0 bottom-0 right-0 w-10 bg-white blur-[2px] animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


