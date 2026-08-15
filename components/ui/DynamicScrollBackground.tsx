"use client";

import React from "react";

interface DynamicScrollBackgroundProps {
  scrollProgress: number; // 0 to 1
}

export const DynamicScrollBackground: React.FC<DynamicScrollBackgroundProps> = ({ scrollProgress }) => {
  // Clamp scrollProgress between 0 and 1
  const sp = Math.max(0, Math.min(1, scrollProgress));

  // Determine active section color theme
  let topGlowColor = "rgba(186, 230, 253, 0.30)"; // Soft Sky Blue Glow
  let primaryOrbColor = "rgba(59, 130, 246, 0.22)"; // Royal Blue
  let secondaryOrbColor = "rgba(99, 102, 241, 0.18)"; // Indigo

  if (sp < 0.25) {
    // HERO & ABOUT: Deep Sky Blue & Electric Indigo Glow
    topGlowColor = "rgba(186, 230, 253, 0.32)";
    primaryOrbColor = "rgba(59, 130, 246, 0.24)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.20)";
  } else if (sp < 0.50) {
    // PLATFORM: Electric Sapphire & Dark Cyan
    topGlowColor = "rgba(56, 189, 248, 0.25)";
    primaryOrbColor = "rgba(59, 130, 246, 0.22)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.18)";
  } else if (sp < 0.75) {
    // RESEARCH HUB & CAPABILITIES: Cyber Teal & Royal Indigo
    topGlowColor = "rgba(45, 212, 191, 0.22)";
    primaryOrbColor = "rgba(59, 130, 246, 0.22)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.18)";
  } else {
    // STATS & FINAL CTA: Deep Obsidian Void & Ice Blue
    topGlowColor = "rgba(56, 189, 248, 0.24)";
    primaryOrbColor = "rgba(59, 130, 246, 0.22)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.18)";
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-all duration-1000 ease-out">
      {/* 1. Continuous Global Dot-Mesh Grid Layer across the whole viewport */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. DeepPiction Sky/Ice-Blue Top Atmospheric Backdrop Gradient Layer - Aligned with Hero Box level & ultra-smooth falloff */}
      <div
        className="absolute top-0 left-0 right-0 h-[320px] sm:h-[340px] md:h-[360px] transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 130% 100% at 50% 0%, ${topGlowColor} 0%, rgba(59, 130, 246, 0.10) 40%, rgba(15, 23, 42, 0.03) 75%, transparent 100%)`,
          opacity: 0.85,
        }}
      />

      {/* 3. Soft Radial Color Transition Masking Layer */}
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(1300px circle at 50% ${sp * 100}%, ${primaryOrbColor}, transparent 75%)`,
        }}
      />

      {/* 4. Primary Floating Ambient Glow Orb */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[190px] transition-all duration-1000 ease-out animate-pulse-glow pointer-events-none"
        style={{
          top: `${10 + sp * 50}%`,
          left: `${10 + Math.sin(sp * Math.PI) * 22}%`,
          backgroundColor: primaryOrbColor,
        }}
      />

      {/* 5. Secondary Floating Accent Glow Orb */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[190px] transition-all duration-1000 ease-out animate-pulse-glow pointer-events-none"
        style={{
          bottom: `${10 - sp * 40}%`,
          right: `${10 + Math.cos(sp * Math.PI) * 22}%`,
          backgroundColor: secondaryOrbColor,
          animationDelay: "3.5s",
        }}
      />
    </div>
  );
};
