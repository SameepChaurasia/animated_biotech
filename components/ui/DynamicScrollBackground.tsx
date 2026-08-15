"use client";

import React from "react";

interface DynamicScrollBackgroundProps {
  scrollProgress: number; // 0 to 1
}

export const DynamicScrollBackground: React.FC<DynamicScrollBackgroundProps> = ({ scrollProgress }) => {
  // Clamp scrollProgress between 0 and 1
  const sp = Math.max(0, Math.min(1, scrollProgress));

  // Determine active section color theme
  let topGlowColor = "rgba(255, 255, 255, 0.72)"; // Pure Radiant White Top Dome
  let primaryOrbColor = "rgba(59, 130, 246, 0.26)"; // Royal Blue
  let secondaryOrbColor = "rgba(99, 102, 241, 0.18)"; // Indigo

  if (sp < 0.25) {
    // HERO & ABOUT: Radiant Top Horizon smoothly fading into Deep Void Space with Blue/Indigo Ambient Lighting
    topGlowColor = "rgba(255, 255, 255, 0.72)";
    primaryOrbColor = "rgba(59, 130, 246, 0.25)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.18)";
  } else if (sp < 0.40) {
    // PLATFORM: Transition into Midnight Cyber Blue
    topGlowColor = "rgba(56, 189, 248, 0.15)";
    primaryOrbColor = "rgba(30, 64, 175, 0.18)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.14)";
  } else if (sp < 0.70) {
    // 03 RESEARCH HUB & CAPABILITIES (System A handles primary atmosphere)
    topGlowColor = "rgba(255, 255, 255, 0.06)";
    primaryOrbColor = "rgba(30, 64, 175, 0.04)";
    secondaryOrbColor = "rgba(139, 92, 246, 0.03)";
  } else {
    // GENE PLAYGROUND, 04 IMPACT & FINAL CTA (System B handles primary atmosphere)
    topGlowColor = "rgba(255, 255, 255, 0.06)";
    primaryOrbColor = "rgba(20, 184, 166, 0.04)";
    secondaryOrbColor = "rgba(168, 85, 247, 0.03)";
  }

  // Fade out the top horizon dome smoothly as user scrolls past hero so it never casts a horizontal line on lower sections
  const topDomeOpacity = Math.max(0, 1 - sp * 6);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-all duration-1000 ease-out bg-[#030712]">
      {/* 1. Continuous Global Dot-Mesh Grid Layer across the whole viewport */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. Radiant Horizon Dome at top of Hero - feathered and dissolved smoothly as you scroll */}
      <div
        className="absolute top-0 left-0 right-0 h-[480px] sm:h-[550px] transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 130% 85% at 50% -20%, ${topGlowColor} 0%, rgba(255, 255, 255, 0.40) 25%, rgba(186, 230, 253, 0.22) 50%, rgba(37, 99, 235, 0.10) 75%, transparent 100%)`,
          opacity: topDomeOpacity,
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      {/* 3. Deep Obsidian Darkening Vignette from Left and Right Sides */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to right, #000000 0%, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.30) 22%, transparent 35%, transparent 65%, rgba(0,0,0,0.30) 78%, rgba(0,0,0,0.85) 90%, #000000 100%)`,
        }}
      />

      {/* 4. Continuous Smooth Radial Color Transition Layer */}
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(1400px circle at 50% ${Math.min(100, sp * 100)}%, ${primaryOrbColor}, transparent 75%)`,
        }}
      />

      {/* 5. Primary Floating Ambient Glow Orb - Continuous Motion */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[190px] transition-all duration-1000 ease-out animate-pulse-glow pointer-events-none"
        style={{
          top: `${10 + sp * 50}%`,
          left: `${10 + Math.sin(sp * Math.PI) * 22}%`,
          backgroundColor: primaryOrbColor,
        }}
      />

      {/* 6. Secondary Floating Accent Glow Orb - Continuous Motion */}
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
