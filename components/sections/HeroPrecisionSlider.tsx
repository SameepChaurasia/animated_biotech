"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Activity } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface HeroPrecisionSliderProps {
  onOpenDetail?: (detailId: string) => void;
}

export const HeroPrecisionSlider: React.FC<HeroPrecisionSliderProps> = ({ onOpenDetail }) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(3, Math.min(97, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
    soundManager.playClickSound();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback if capture already released
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Main Interactive Split-Comparison Showcase Card */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[320px] sm:h-[400px] lg:h-[430px] rounded-[28px] overflow-hidden border-2 border-blue-500/40 bg-slate-950 shadow-[0_25px_80px_rgba(0,0,0,0.9)] select-none group cursor-ew-resize touch-none"
      >
        {/* BASE LAYER (Right/Underlying): Codex Bio Cell-Level High-Resolution Precision (0.38Å RMSD) */}
        <div className="absolute inset-0 bg-slate-950 pointer-events-none">
          <Image
            src="/high_res_structure.jpg"
            alt="Codex Bio Cell-Level High-Resolution Cryo-EM Structure (0.38Å RMSD)"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover object-center opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40 pointer-events-none" />
        </div>

        {/* OVERLAY LAYER (Left/Clipped): Conventional Low-Resolution Unrefined Cryo-EM Screening */}
        <div
          className="absolute inset-0 bg-slate-950 pointer-events-none overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          }}
        >
          <Image
            src="/low_res_scan.jpg"
            alt="Conventional Screening Low-Resolution Scan (14Å Unrefined Density)"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover object-center opacity-85"
            priority
          />
          {/* Cyber scanlines overlay for uncalibrated detector look */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40 pointer-events-none" />
        </div>

        {/* FLOATING HUD BADGES: Top Row (Anchored to corners so they never overlap or get clipped) */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none max-w-[48%]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 border border-slate-700/80 text-slate-300 font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-lg truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
            <span className="truncate">CONVENTIONAL · LOW RES (14Å)</span>
          </span>
        </div>

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-none max-w-[48%] text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950/80 border border-cyan-400/80 text-cyan-200 font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)] truncate">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse flex-shrink-0" />
            <span className="truncate">CODEX BIO · 0.38Å RMSD</span>
          </span>
        </div>

        {/* FLOATING HUD METRICS: Bottom Row */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-none max-w-[48%]">
          <div className="font-mono text-[9px] sm:text-[11px] text-slate-400 font-semibold bg-slate-950/85 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md shadow-md truncate">
            UNREFINED DENSITY MAP
          </div>
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-none max-w-[48%] text-right">
          <div className="font-mono text-[9px] sm:text-[11px] text-cyan-300 font-semibold bg-slate-950/85 px-3 py-1.5 rounded-xl border border-blue-500/40 backdrop-blur-md shadow-md truncate">
            SUB-NANOMOLAR ATOMIC BINDING
          </div>
        </div>

        {/* DRAGGABLE SLIDER DIVIDER LINE & NEON GLOW HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-gradient-to-b from-cyan-400 via-white to-blue-500 shadow-[0_0_15px_#38BDF8] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Central Illuminated Dial */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/95 border-2 border-cyan-300 text-white flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.9)] transition-transform group-hover:scale-110">
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 -mr-1" />
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 -ml-1" />
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
          className="px-5 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-400 transition-all font-semibold hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
        >
          Our Science
        </button>

        <button
          onClick={() => {
            soundManager.playClickSound();
            if (onOpenDetail) onOpenDetail("genomic-pipeline");
          }}
          className="px-5 py-2 rounded-full bg-blue-600/25 border border-cyan-500/60 text-cyan-300 font-bold hover:bg-blue-600 hover:text-white transition-all shadow-md cursor-pointer"
        >
          The Precision Platform
        </button>

        <button
          onClick={() => {
            soundManager.playClickSound();
            if (onOpenDetail) onOpenDetail("pillar-velocity");
          }}
          className="px-5 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-400 transition-all font-semibold hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
        >
          Our Impact
        </button>
      </div>
    </div>
  );
};
