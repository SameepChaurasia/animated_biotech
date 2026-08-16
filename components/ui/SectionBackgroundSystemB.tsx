"use client";

import React from "react";
import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("@/components/canvas/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false }
);

interface SectionBackgroundSystemBProps {
  children: React.ReactNode;
}

const PALETTE_B = ["#14b8a6", "#a855f7", "#f59e0b", "#10b981"];

/**
 * SYSTEM B — Continuous background canvas for Sections 05 (Gene Sandbox) + 06 (Impact).
 * 
 * Bio-Synthetic and Empirical Impact aesthetic:
 * - Dynamic Genetic Code Rain (Cascading nucleotide sequences)
 * - Luminescent DNA Double-Helix with illuminated base-pair ladder rungs
 * - Expanding biological sonar waves & organelle ripple pulses
 * - Ambient sci-fi HUD gene synthesis telemetry markers
 * - High-visibility Three.js ParticleField with proximity constellation lines
 */
export const SectionBackgroundSystemB: React.FC<SectionBackgroundSystemBProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* ── 1. Continuous Background Layer (CSS Gradients & Blobs) (z-0) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, #05070d 0%, #080d19 35%, #0a0e1a 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        {/* Blob 1 — Teal, upper-right area */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            right: "8%",
            width: "52vw",
            height: "42vh",
            maxWidth: "850px",
            maxHeight: "550px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.18) 0%, rgba(45, 212, 191, 0.08) 40%, transparent 70%)",
            filter: "blur(85px)",
          }}
        />

        {/* Blob 2 — Neon Purple, center-left area */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "42%",
            left: "5%",
            width: "48vw",
            height: "40vh",
            maxWidth: "780px",
            maxHeight: "520px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.16) 0%, rgba(124, 58, 237, 0.08) 45%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Blob 3 — Emerald / Amber, lower-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "6%",
            right: "12%",
            width: "42vw",
            height: "38vh",
            maxWidth: "720px",
            maxHeight: "480px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.08) 35%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── 2. Animated Ambient Decoratives Layer (z-[5]) ── */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        {/* Drifting Glowing Orb B1 (Bioluminescent Teal) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-1"
          style={{
            top: "14%",
            right: "6%",
            width: "46vw",
            height: "42vh",
            maxWidth: "700px",
            maxHeight: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 184, 166, 0.16) 0%, rgba(52, 211, 153, 0.07) 45%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />

        {/* Drifting Glowing Orb B2 (Neon Purple / Ultraviolet) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-2"
          style={{
            top: "48%",
            left: "4%",
            width: "44vw",
            height: "40vh",
            maxWidth: "680px",
            maxHeight: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.07) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Drifting Glowing Orb B3 (Warm Amber Glow) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-3"
          style={{
            bottom: "10%",
            right: "18%",
            width: "38vw",
            height: "34vh",
            maxWidth: "550px",
            maxHeight: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.05) 40%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Real-Time Genetic Code Rain (Bio-Matrix Falling Streams) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden font-mono text-[9px] select-none">
          {/* Stream Column 1 (Left Margin - Teal) */}
          <div className="absolute left-[5%] top-0 text-teal-400/50 flex flex-col items-center gap-1.5 animate-gene-stream-1">
            <span className="text-white font-bold animate-pulse text-[10px]">A</span>
            <span>T</span><span>C</span><span>G</span><span>G</span><span>C</span><span>T</span><span>A</span>
            <span>A</span><span>T</span><span>C</span><span>G</span><span>T</span><span>A</span><span>G</span>
          </div>

          {/* Stream Column 2 (Left-Center - Purple) */}
          <div className="absolute left-[24%] top-0 text-purple-400/40 hidden sm:flex flex-col items-center gap-1.5 animate-gene-stream-2">
            <span className="text-purple-200 font-bold animate-pulse text-[10px]">C</span>
            <span>G</span><span>A</span><span>T</span><span>C</span><span>G</span><span>A</span><span>T</span>
            <span>T</span><span>A</span><span>A</span><span>G</span><span>C</span><span>C</span><span>T</span>
          </div>

          {/* Stream Column 3 (Right-Center - Emerald) */}
          <div className="absolute right-[24%] top-0 text-emerald-400/45 hidden sm:flex flex-col items-center gap-1.5 animate-gene-stream-3">
            <span className="text-emerald-200 font-bold animate-pulse text-[10px]">G</span>
            <span>A</span><span>T</span><span>C</span><span>A</span><span>T</span><span>C</span><span>G</span>
            <span>G</span><span>C</span><span>T</span><span>A</span><span>A</span><span>T</span><span>G</span>
          </div>

          {/* Stream Column 4 (Right Margin - Amber) */}
          <div className="absolute right-[6%] top-0 text-amber-400/45 flex flex-col items-center gap-1.5 animate-gene-stream-4">
            <span className="text-amber-200 font-bold animate-pulse text-[10px]">T</span>
            <span>A</span><span>G</span><span>C</span><span>T</span><span>A</span><span>G</span><span>C</span>
            <span>C</span><span>G</span><span>A</span><span>T</span><span>T</span><span>A</span><span>C</span>
          </div>
        </div>

        {/* Luminescent Traveling DNA Double-Helix Ribbon with Base-Pair Ladder Rungs */}
        <div className="absolute top-[62%] left-0 right-0 w-full h-[220px] pointer-events-none">
          <svg viewBox="0 0 1400 220" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="dna-strand-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="dna-strand-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Base-Pair Connecting Rung Ladders (A-T / G-C Links) */}
            {[70, 140, 210, 280, 350, 420, 490, 560, 630, 700, 770, 840, 910, 980, 1050, 1120, 1190, 1260, 1330].map((x, i) => {
              const y1 = 110 + Math.sin((x / 1400) * Math.PI * 4) * 70;
              const y2 = 110 - Math.sin((x / 1400) * Math.PI * 4) * 70;
              return (
                <g key={`dna-rung-${i}`}>
                  <line
                    x1={x}
                    y1={y1}
                    x2={x}
                    y2={y2}
                    stroke={i % 2 === 0 ? "rgba(34, 211, 238, 0.35)" : "rgba(168, 85, 247, 0.35)"}
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                  />
                  <circle cx={x} cy={y1} r="2.5" fill={i % 2 === 0 ? "#14b8a6" : "#a855f7"} />
                  <circle cx={x} cy={y2} r="2.5" fill={i % 2 === 0 ? "#a855f7" : "#14b8a6"} />
                </g>
              );
            })}

            {/* Strand 1 (Teal/Cyan Ribbon) */}
            <path
              d="M 0 110 Q 175 20, 350 110 T 700 110 T 1050 110 T 1400 110"
              fill="none"
              stroke="url(#dna-strand-1)"
              strokeWidth="2.5"
              className="animate-helix-traveling-1"
              style={{ filter: "drop-shadow(0 0 8px rgba(20, 184, 166, 0.6))" }}
            />

            {/* Strand 2 (Purple/Violet Ribbon) */}
            <path
              d="M 0 110 Q 175 200, 350 110 T 700 110 T 1050 110 T 1400 110"
              fill="none"
              stroke="url(#dna-strand-2)"
              strokeWidth="2.5"
              className="animate-helix-traveling-2"
              style={{ filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))" }}
            />
          </svg>
        </div>

        {/* Expanding Biological Sonar Ripples behind Section 06 Impact Cards */}
        <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="absolute w-56 h-56 rounded-full border border-cyan-400/40 animate-sonar-pulse-1 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
            <div className="absolute w-56 h-56 rounded-full border border-purple-500/40 animate-sonar-pulse-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
            <div className="w-4 h-4 rounded-full bg-cyan-400/60 animate-pulse shadow-[0_0_12px_#22d3ee]" />
          </div>
        </div>

        {/* Sci-Fi HUD Telemetry Badges in Margins */}
        <div className="absolute top-[6%] right-8 font-mono text-[9px] text-teal-400/60 hidden xl:flex items-center gap-1.5 animate-hud-blink">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_#14b8a6]" />
          <span>[CRISPR-Cas12a // SEQUENCE_WORKBENCH ONLINE]</span>
        </div>
        <div className="absolute top-[46%] left-8 font-mono text-[9px] text-purple-400/60 hidden xl:flex items-center gap-1.5 animate-hud-blink">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7]" />
          <span>[THERMODYNAMIC EQUILIBRIUM: ΔG = -24.4 kcal/mol]</span>
        </div>
      </div>

      {/* ── 3. High-Visibility Ambient Particle Field (z-10) ── */}
      <ParticleField
        palette={PALETTE_B}
        count={160}
        speed={0.032}
        bondDist={70}
        maxBonds={40}
        size={3.2}
      />

      {/* ── 4. Pulsing Dot-Grid Overlay (z-20) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20 animate-grid-fade"
        style={{
          backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.45) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── 5. Section Content (05 + 06) (z-30) ── */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};


