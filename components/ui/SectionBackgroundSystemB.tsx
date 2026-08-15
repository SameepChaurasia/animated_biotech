"use client";

import React from "react";

interface SectionBackgroundSystemBProps {
  children: React.ReactNode;
}

/**
 * SYSTEM B — Continuous background canvas for Sections 05 (Gene Sandbox) + 06 (Impact).
 * 
 * Warmer, more colorful "playful" aesthetic using page accent colors:
 * teal, purple, green — pulled from nucleotide/codon badges in GenePlayground.
 * Pure CSS gradients only — no canvas/WebGL.
 * mask-image fades at top/bottom for seamless blending into sections 04 and 07.
 */
export const SectionBackgroundSystemB: React.FC<SectionBackgroundSystemBProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* ── Continuous Background Layer ── */}
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
            background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.03) 40%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        {/* Fixed dot-grid overlay — same pattern as System A for site-wide consistency */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
        />
      </div>

      {/* ── Section Content (05 + 06) ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
