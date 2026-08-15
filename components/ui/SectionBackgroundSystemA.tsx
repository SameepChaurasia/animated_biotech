"use client";

import React from "react";

interface SectionBackgroundSystemAProps {
  children: React.ReactNode;
}

/**
 * SYSTEM A — Continuous background canvas for Sections 03 (Research Hub) + 04 (Capabilities).
 * 
 * Cool, corporate aesthetic: near-black base with deep blue + muted violet blobs.
 * Pure CSS gradients only — no canvas/WebGL.
 * mask-image fades at top/bottom for seamless blending into sections 02 and 05.
 */
export const SectionBackgroundSystemA: React.FC<SectionBackgroundSystemAProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* ── Continuous Background Layer ── */}
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

        {/* Fixed dot-grid overlay — consistent across both sections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
        />
      </div>

      {/* ── Section Content (03 + 04) ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
