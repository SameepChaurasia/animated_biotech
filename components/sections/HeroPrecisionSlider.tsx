"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface HeroPrecisionSliderProps {
  onOpenDetail?: (detailId: string) => void;
}

export const HeroPrecisionSlider: React.FC<HeroPrecisionSliderProps> = ({ onOpenDetail }) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Main Interactive Split-Comparison Showcase Card */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-[32px] overflow-hidden border-2 border-blue-500/40 bg-slate-950 shadow-[0_25px_80px_rgba(0,0,0,0.9)] select-none group cursor-ew-resize"
      >
        {/* RIGHT PANE: Codex Bio Cell-Level High-Resolution Precision */}
        <div className="absolute inset-0 bg-slate-950 flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
          {/* Background Atmospheric Glow & WebGL Graphic */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-indigo-950/40" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

          {/* High-Resolution Volumetric Structural Simulation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
            <svg viewBox="0 0 500 500" className="w-full h-full max-w-[420px] stroke-blue-400 fill-none">
              {/* Complex Molecular Lattice Graph */}
              <circle cx="250" cy="250" r="160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" className="animate-spin" style={{ animationDuration: "35s" }} />
              <circle cx="250" cy="250" r="110" stroke="#818cf8" strokeWidth="2" />
              <circle cx="250" cy="250" r="60" stroke="#c084fc" strokeWidth="1.5" />

              {/* High-Res Particle Clusters */}
              <g fill="#ffffff">
                <circle cx="250" cy="140" r="6" />
                <circle cx="360" cy="250" r="7" className="animate-ping" style={{ animationDuration: "3s" }} />
                <circle cx="250" cy="360" r="6" />
                <circle cx="140" cy="250" r="7" />
                <circle cx="320" cy="180" r="5" fill="#38bdf8" />
                <circle cx="180" cy="320" r="5" fill="#818cf8" />
                <circle cx="320" cy="320" r="5" fill="#c084fc" />
                <circle cx="180" cy="180" r="5" fill="#38bdf8" />
              </g>

              {/* Connecting Volumetric Ligand Bonds */}
              <path d="M 250 140 L 360 250 L 250 360 L 140 250 Z" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 180 180 L 320 320 M 320 180 L 180 320" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Right Label */}
          <div className="relative z-10 self-end font-mono text-xs text-right">
            <span className="px-3 py-1.5 rounded-full bg-blue-600/30 border border-blue-400 text-white font-bold tracking-wider uppercase backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              CODEX BIO CELL-LEVEL PRECISION
            </span>
          </div>

          <div className="relative z-10 self-end font-mono text-[11px] text-slate-300 font-semibold bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800 backdrop-blur-md">
            CONFIRMATION: 0.38Å RMSD · SUB-NANOMOLAR
          </div>
        </div>

        {/* LEFT PANE: State of the Art Low Resolution (Clipped by sliderPos) */}
        <div
          className="absolute inset-y-0 left-0 bg-slate-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
          style={{ width: `${sliderPos}%` }}
        >
          {/* Background Heatmap Graphic */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80" />

          {/* Pixelated Heatmap Density Blob */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 blur-2xl opacity-60 animate-pulse" />
            <div className="absolute w-40 h-40 bg-cyan-400 blur-xl opacity-40" />
          </div>

          {/* Left Label */}
          <div className="relative z-10 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 font-semibold tracking-wider uppercase backdrop-blur-md">
              STATE OF THE ART LOW RESOLUTION
            </span>
          </div>

          <div className="relative z-10 font-mono text-[11px] text-slate-400 bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800 w-fit">
            CONVENTIONAL SCREENING: LOW RESOLUTION
          </div>
        </div>

        {/* DRAGGABLE SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-white/80 shadow-[0_0_15px_#ffffff] cursor-ew-resize"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Slider Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-white text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:scale-110 transition-transform">
            <ChevronLeft className="w-4 h-4 text-white -mr-1" />
            <ChevronRight className="w-4 h-4 text-white -ml-1" />
          </div>
        </div>
      </div>

      {/* View Mode Nav Pills (Matching DeepPiction's "Our Science | The Precision Platform | Our Impact") */}
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
        <button
          onClick={() => {
            soundManager.playClickSound();
            if (onOpenDetail) onOpenDetail("protein-engine");
          }}
          className="px-5 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:border-blue-400 transition-all font-semibold hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          Our Science
        </button>

        <button
          onClick={() => {
            soundManager.playClickSound();
            if (onOpenDetail) onOpenDetail("genomic-pipeline");
          }}
          className="px-5 py-2 rounded-full bg-blue-600/20 border border-blue-500/50 text-blue-300 font-bold hover:bg-blue-600 hover:text-white transition-all shadow-md"
        >
          The Precision Platform
        </button>

        <button
          onClick={() => {
            soundManager.playClickSound();
            if (onOpenDetail) onOpenDetail("pillar-velocity");
          }}
          className="px-5 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:border-blue-400 transition-all font-semibold hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          Our Impact
        </button>
      </div>

      {/* Institutional Partner Brand Wall (DENALI, REGENERON, BAVARIAN NORDIC, GENENTECH) */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all font-mono text-xs sm:text-sm tracking-widest font-black text-slate-300">
        <span>DENALI</span>
        <span>REGENERON</span>
        <span>BAVARIAN NORDIC</span>
        <span>GENENTECH</span>
      </div>
    </div>
  );
};
