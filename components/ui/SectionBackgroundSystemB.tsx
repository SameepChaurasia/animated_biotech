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

const PALETTE_B = ["#14b8a6", "#a855f7", "#f59e0b"];

/**
 * SYSTEM B — Continuous background canvas for Sections 05 (Gene Sandbox) + 06 (Impact).
 * 
 * Warmer, more colorful "playful" aesthetic using page accent colors:
 * teal, purple, green/amber — pulled from nucleotide/codon badges in GenePlayground.
 * Layered with dynamic ambient Three.js ParticleField, bio-data streams, and DNA helix waves.
 * mask-image fades at top/bottom for seamless blending into sections 04 and 07.
 * 
 * Stacking:
 * z-0:   Gradient base + teal / purple / emerald blobs
 * z-[5]: Animated ambient decoratives (drifting glowing orbs, bio-data streams, DNA helix curve)
 * z-10:  Three.js ambient ParticleField (transparent)
 * z-20:  Pulsing Dot-grid overlay
 * z-30:  Section Content (05 + 06)
 */
export const SectionBackgroundSystemB: React.FC<SectionBackgroundSystemBProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* ── 1. Continuous Background Layer (CSS Gradients & Blobs) (z-0) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, #05070d 0%, #080c16 35%, #0a0e1a 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Blob 1 — Teal, upper-right area (from cyan/teal nucleotide accents) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "12%",
            right: "10%",
            width: "50vw",
            height: "40vh",
            maxWidth: "850px",
            maxHeight: "550px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.10) 0%, rgba(45, 212, 191, 0.05) 40%, transparent 70%)",
            filter: "blur(85px)",
          }}
        />

        {/* Blob 2 — Purple, center-left area (from purple codon badges) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "45%",
            left: "5%",
            width: "45vw",
            height: "38vh",
            maxWidth: "750px",
            maxHeight: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.09) 0%, rgba(124, 58, 237, 0.04) 45%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Blob 3 — Green/emerald, lower-right (from complement strand emerald accents) */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "8%",
            right: "15%",
            width: "40vw",
            height: "35vh",
            maxWidth: "700px",
            maxHeight: "450px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.09) 0%, rgba(16, 185, 129, 0.08) 35%, rgba(52, 211, 153, 0.03) 50%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── 2. Animated Ambient Decoratives Layer (z-[5]) ── */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        {/* Drifting Glowing Orb B1 (Teal / Emerald) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-1"
          style={{
            top: "18%",
            right: "8%",
            width: "44vw",
            height: "40vh",
            maxWidth: "650px",
            maxHeight: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 184, 166, 0.09) 0%, rgba(52, 211, 153, 0.04) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Drifting Glowing Orb B2 (Neon Purple / Violet) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-2"
          style={{
            top: "50%",
            left: "6%",
            width: "42vw",
            height: "38vh",
            maxWidth: "620px",
            maxHeight: "440px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.04) 45%, transparent 70%)",
            filter: "blur(75px)",
          }}
        />

        {/* Drifting Glowing Orb B3 (Amber / Golden Spark) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-3"
          style={{
            bottom: "12%",
            right: "20%",
            width: "36vw",
            height: "32vh",
            maxWidth: "500px",
            maxHeight: "380px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, rgba(251, 191, 36, 0.02) 40%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Vertical Bio-Data Stream Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          {/* Stream Line 1 (Teal) */}
          <line
            x1="18%"
            y1="0"
            x2="18%"
            y2="100%"
            stroke="#14b8a6"
            strokeWidth="1"
            strokeDasharray="4 20"
            className="animate-data-stream-1"
            opacity="0.2"
          />
          {/* Stream Line 2 (Purple) */}
          <line
            x1="42%"
            y1="0"
            x2="42%"
            y2="100%"
            stroke="#a855f7"
            strokeWidth="1"
            strokeDasharray="6 28"
            className="animate-data-stream-2"
            opacity="0.18"
          />
          {/* Stream Line 3 (Emerald) */}
          <line
            x1="68%"
            y1="0"
            x2="68%"
            y2="100%"
            stroke="#10b981"
            strokeWidth="1"
            strokeDasharray="4 24"
            className="animate-data-stream-3"
            opacity="0.22"
          />
          {/* Stream Line 4 (Amber) */}
          <line
            x1="86%"
            y1="0"
            x2="86%"
            y2="100%"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="5 32"
            className="animate-data-stream-1"
            opacity="0.15"
          />
        </svg>

        {/* Decorative Intertwined DNA Helix Sine-Waves behind Section 06 */}
        <div className="absolute top-[68%] left-0 right-0 w-full h-[180px] pointer-events-none opacity-50">
          <svg viewBox="0 0 1400 180" preserveAspectRatio="none" className="w-full h-full">
            {/* Strand 1 (Teal) */}
            <path
              d="M 0 90 Q 175 10, 350 90 T 700 90 T 1050 90 T 1400 90"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="1.5"
              strokeDasharray="6 10"
              className="animate-helix-wave"
            />
            {/* Strand 2 (Purple - Phase Inverted) */}
            <path
              d="M 0 90 Q 175 170, 350 90 T 700 90 T 1050 90 T 1400 90"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="6 10"
              className="animate-helix-wave"
              style={{ animationDelay: "-5s" }}
            />
          </svg>
        </div>
      </div>

      {/* ── 3. Ambient Particle Field (z-10) ── */}
      <ParticleField
        palette={PALETTE_B}
        count={120}
        speed={0.035}
        bondDist={35}
        maxBonds={20}
      />

      {/* ── 4. Pulsing Dot-Grid Overlay (z-20) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20 animate-grid-fade"
        style={{
          backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── 5. Section Content (05 + 06) (z-30) ── */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};

