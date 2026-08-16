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

const PALETTE_A = ["#4a6cf7", "#8b7cf6"];

/**
 * SYSTEM A — Continuous background canvas for Sections 03 (Research Hub) + 04 (Capabilities).
 * 
 * Cool, corporate aesthetic: near-black base with deep blue + muted violet blobs.
 * Layered with dynamic ambient Three.js ParticleField and creative CSS ambient overlays.
 * mask-image fades at top/bottom for seamless blending into sections 02 and 05.
 * 
 * Stacking:
 * z-0:   Gradient base + deep blue / violet blobs
 * z-[5]: Animated ambient decoratives (drifting glowing orbs, radar scanline, orbital arcs)
 * z-10:  Three.js ambient ParticleField (transparent)
 * z-20:  Pulsing Dot-grid overlay
 * z-30:  Section Content (03 + 04)
 */
export const SectionBackgroundSystemA: React.FC<SectionBackgroundSystemAProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* ── 1. Continuous Background Layer (CSS Gradients & Blobs) (z-0) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, #05070d 0%, #070b15 40%, #0a0e1a 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Blob 1 — Deep blue, upper-left quadrant of section 03 area */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "8%",
            left: "12%",
            width: "55vw",
            height: "45vh",
            maxWidth: "900px",
            maxHeight: "600px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(30, 64, 175, 0.12) 0%, rgba(30, 58, 138, 0.06) 45%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* Blob 2 — Muted violet/white, lower-right of section 04 area */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "10%",
            right: "8%",
            width: "50vw",
            height: "40vh",
            maxWidth: "800px",
            maxHeight: "550px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.10) 0%, rgba(226, 232, 240, 0.05) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ── 2. Animated Ambient Decoratives Layer (z-[5]) ── */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        {/* Drifting Glowing Orb A1 (Deep Blue / Cyan) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-1"
          style={{
            top: "15%",
            left: "8%",
            width: "42vw",
            height: "38vh",
            maxWidth: "650px",
            maxHeight: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, rgba(34, 211, 238, 0.04) 40%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />

        {/* Drifting Glowing Orb A2 (Indigo / Violet) */}
        <div
          className="absolute pointer-events-none animate-drift-blob-2"
          style={{
            top: "60%",
            right: "10%",
            width: "46vw",
            height: "42vh",
            maxWidth: "700px",
            maxHeight: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 70%)",
            filter: "blur(75px)",
          }}
        />

        {/* Horizontal Laser Scanning Beam */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-horizon-sweep opacity-75 pointer-events-none" />

        {/* Ambient SVG Orbital Concentric Rings behind Section 04 */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-40">
          <svg viewBox="0 0 900 900" className="w-full h-full">
            {/* Outer Slow Rotating Dashed Arc */}
            <circle
              cx="450"
              cy="450"
              r="410"
              fill="none"
              stroke="rgba(99, 102, 241, 0.12)"
              strokeWidth="1"
              strokeDasharray="16 32"
              className="animate-orbital-ring-slow"
            />
            {/* Inner Reverse Rotating Dashed Arc */}
            <circle
              cx="450"
              cy="450"
              r="320"
              fill="none"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="1"
              strokeDasharray="8 24"
              className="animate-orbital-ring-reverse"
            />
            {/* Crosshair Tickmarks */}
            <line x1="450" y1="20" x2="450" y2="40" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
            <line x1="450" y1="860" x2="450" y2="880" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
            <line x1="20" y1="450" x2="40" y2="450" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
            <line x1="860" y1="450" x2="880" y2="450" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* ── 3. Ambient Particle Field (z-10) ── */}
      <ParticleField
        palette={PALETTE_A}
        count={150}
        speed={0.02}
        bondDist={40}
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

      {/* ── 5. Section Content (03 + 04) (z-30) ── */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};

