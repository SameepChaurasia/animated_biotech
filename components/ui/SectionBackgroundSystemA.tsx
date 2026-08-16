"use client";

import React from "react";
import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("@/components/canvas/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false }
);

interface SectionBackgroundSystemAProps {
  children: React.ReactNode;
}

const PALETTE_A = ["#38bdf8", "#818cf8", "#c084fc", "#60a5fa"];

/**
 * SYSTEM A — Continuous background canvas for Sections 03 (Research Hub) + 04 (Capabilities).
 * 
 * Deep space / Quantum Genomics aesthetic with rich sci-fi animations:
 * - Glowing multi-spectral vertical laser sweep
 * - Rotating holographic radar sweep arm & concentric quantum rings
 * - Floating molecular hexagon clusters
 * - Floating cyber HUD telemetry markers
 * - High-visibility Three.js ParticleField with proximity constellation lines
 */
export const SectionBackgroundSystemA: React.FC<SectionBackgroundSystemAProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* ── 1. Continuous Background Layer (CSS Gradients & Blobs) (z-0) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, #05070d 0%, #070c18 40%, #0a0e1a 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        {/* Blob 1 — Deep blue, upper-left quadrant */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "6%",
            left: "10%",
            width: "55vw",
            height: "45vh",
            maxWidth: "900px",
            maxHeight: "600px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(30, 64, 175, 0.20) 0%, rgba(30, 58, 138, 0.10) 45%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* Blob 2 — Muted violet/white, lower-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "8%",
            right: "6%",
            width: "50vw",
            height: "40vh",
            maxWidth: "800px",
            maxHeight: "550px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.18) 0%, rgba(226, 232, 240, 0.08) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ── 2. Animated Ambient Decoratives Layer (z-[5]) ── */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        {/* Drifting Glowing Orb A1 (Deep Blue / Electric Cyan) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-1"
          style={{
            top: "12%",
            left: "6%",
            width: "45vw",
            height: "40vh",
            maxWidth: "700px",
            maxHeight: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(37, 99, 235, 0.08) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Drifting Glowing Orb A2 (Electric Indigo / Violet) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-2"
          style={{
            top: "55%",
            right: "8%",
            width: "48vw",
            height: "44vh",
            maxWidth: "750px",
            maxHeight: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Dynamic Multi-Spectral Glowing Laser Scanner Beam */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-sky-300 to-transparent shadow-[0_0_25px_#22d3ee,0_0_50px_rgba(59,130,246,0.6)] animate-laser-sweep pointer-events-none z-10 opacity-70" />

        {/* Rotating Holographic Radar & Concentric Quantum Discs behind Capabilities */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none">
          {/* Active 360-degree Conic Radar Sector Glow */}
          <div
            className="absolute inset-16 rounded-full animate-radar-sweep opacity-30 pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, rgba(56, 189, 248, 0.25) 0deg, rgba(99, 102, 241, 0.10) 45deg, transparent 90deg, transparent 360deg)",
            }}
          />

          <svg viewBox="0 0 850 850" className="w-full h-full">
            {/* Outer Slow Rotating Dashed Arc */}
            <circle
              cx="425"
              cy="425"
              r="395"
              fill="none"
              stroke="rgba(99, 102, 241, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="18 36"
              className="animate-orbital-ring-slow"
            />
            {/* Inner Reverse Rotating Dashed Arc */}
            <circle
              cx="425"
              cy="425"
              r="295"
              fill="none"
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="10 30"
              className="animate-orbital-ring-reverse"
            />
            {/* Innermost Ring */}
            <circle
              cx="425"
              cy="425"
              r="195"
              fill="none"
              stroke="rgba(168, 85, 247, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 16"
              className="animate-orbital-ring-slow"
            />

            {/* Radar Crosshair & Compass Degree Ticks */}
            <line x1="425" y1="15" x2="425" y2="40" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" />
            <line x1="425" y1="810" x2="425" y2="835" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" />
            <line x1="15" y1="425" x2="40" y2="425" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" />
            <line x1="810" y1="425" x2="835" y2="425" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" />

            {/* Pulsing Signal Beacon Nodes */}
            <circle cx="425" cy="30" r="4" fill="#38bdf8" />
            <circle cx="820" cy="425" r="4" fill="#818cf8" />
            <circle cx="425" cy="820" r="4" fill="#c084fc" />
            <circle cx="30" cy="425" r="4" fill="#38bdf8" />
          </svg>
        </div>

        {/* Floating Molecular Benzene Hexagon Cluster 1 (Left Gutter) */}
        <div className="absolute top-[20%] left-4 lg:left-12 pointer-events-none animate-float-cluster-1 opacity-40 hidden md:block">
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5">
            <polygon points="60,10 105,35 105,85 60,110 15,85 15,35" />
            <polygon points="60,25 90,42 90,78 60,95 30,78 30,42" strokeDasharray="3 3" />
            <circle cx="60" cy="10" r="3" fill="#38bdf8" />
            <circle cx="105" cy="35" r="3" fill="#818cf8" />
            <circle cx="105" cy="85" r="3" fill="#38bdf8" />
            <circle cx="60" cy="110" r="3" fill="#c084fc" />
            <circle cx="15" cy="85" r="3" fill="#38bdf8" />
            <circle cx="15" cy="35" r="3" fill="#818cf8" />
          </svg>
        </div>

        {/* Floating Molecular Hexagon Cluster 2 (Right Gutter) */}
        <div className="absolute top-[68%] right-4 lg:right-12 pointer-events-none animate-float-cluster-2 opacity-40 hidden md:block">
          <svg width="130" height="150" viewBox="0 0 130 150" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1.5">
            <polygon points="65,12 115,40 115,95 65,122 15,95 15,40" />
            <line x1="65" y1="12" x2="65" y2="122" stroke="rgba(99, 102, 241, 0.3)" strokeDasharray="4 4" />
            <circle cx="65" cy="12" r="3.5" fill="#c084fc" />
            <circle cx="115" cy="40" r="3.5" fill="#818cf8" />
            <circle cx="115" cy="95" r="3.5" fill="#38bdf8" />
            <circle cx="65" cy="122" r="3.5" fill="#c084fc" />
            <circle cx="15" cy="95" r="3.5" fill="#818cf8" />
            <circle cx="15" cy="40" r="3.5" fill="#38bdf8" />
          </svg>
        </div>

        {/* Floating Sci-Fi HUD Telemetry Badges in Margins */}
        <div className="absolute top-[8%] left-8 font-mono text-[9px] text-cyan-400/60 hidden xl:flex items-center gap-1.5 animate-hud-blink">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span>[SYS.PETABASE //petabase_stream.03]</span>
        </div>
        <div className="absolute top-[48%] right-8 font-mono text-[9px] text-indigo-400/60 hidden xl:flex items-center gap-1.5 animate-hud-blink">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
          <span>[ORBITAL_SYNTHESIS: 99.99% PRECISION]</span>
        </div>
      </div>

      {/* ── 3. High-Visibility Ambient Particle Field (z-10) ── */}
      <ParticleField
        palette={PALETTE_A}
        count={175}
        speed={0.028}
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

      {/* ── 5. Section Content (03 + 04) (z-30) ── */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};


