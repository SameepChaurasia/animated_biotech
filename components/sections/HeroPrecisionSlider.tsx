"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
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
          {/* Authentic High-Resolution Cryo-EM Protein Structure Image Asset */}
          <Image
            src="/high_res_structure.jpg"
            alt="Codex Bio Cell-Level High-Resolution Cryo-EM Structure"
            fill
            className="object-cover object-center opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Right Top Label Badge */}
          <div className="relative z-10 self-end font-mono text-xs text-right whitespace-nowrap">
            <span className="px-3 py-1.5 rounded-full bg-blue-600/30 border border-blue-400 text-white font-bold tracking-wider uppercase backdrop-blur-md shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              CODEX BIO CELL-LEVEL PRECISION
            </span>
          </div>

          {/* Right Bottom Metric Badge */}
          <div className="relative z-10 self-end font-mono text-[11px] text-slate-200 font-semibold bg-slate-950/85 px-3.5 py-1.5 rounded-xl border border-blue-500/40 backdrop-blur-md whitespace-nowrap shadow-md">
            CONFIRMATION: 0.38Å RMSD · SUB-NANOMOLAR BINDING
          </div>
        </div>

        {/* LEFT PANE: State of the Art Low Resolution (Clipped by sliderPos with FIXED inner width to prevent text wrap collapse) */}
        <div
          className="absolute inset-y-0 left-0 bg-slate-950 overflow-hidden z-10"
          style={{ width: `${sliderPos}%` }}
        >
          {/* Inner Fixed-Width Container (matches outer card width so text NEVER squashes when sliding) */}
          <div className="absolute top-0 bottom-0 left-0 w-[550px] sm:w-[700px] lg:w-[800px] flex flex-col justify-between p-6 sm:p-8 pointer-events-none">
            {/* Authentic Low-Resolution Pixelated Micro-CT Heatmap Image Asset */}
            <Image
              src="/low_res_scan.jpg"
              alt="State of the Art Low Resolution Scan"
              fill
              className="object-cover object-center opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Left Top Label Badge (whitespace-nowrap guarantees pristine layout) */}
            <div className="relative z-10 font-mono text-xs whitespace-nowrap">
              <span className="px-3 py-1.5 rounded-full bg-slate-950/90 border border-slate-700 text-slate-300 font-semibold tracking-wider uppercase backdrop-blur-md shadow-md whitespace-nowrap inline-block">
                STATE OF THE ART LOW RESOLUTION
              </span>
            </div>

            {/* Left Bottom Metric Badge */}
            <div className="relative z-10 font-mono text-[11px] text-slate-300 bg-slate-950/85 px-3.5 py-1.5 rounded-xl border border-slate-700 w-fit backdrop-blur-md whitespace-nowrap shadow-md">
              CONVENTIONAL SCREENING: LOW RESOLUTION
            </div>
          </div>
        </div>

        {/* DRAGGABLE SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_15px_#ffffff] cursor-ew-resize"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Slider Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-white text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.9)] hover:scale-110 transition-transform">
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
