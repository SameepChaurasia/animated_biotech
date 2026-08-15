"use client";

import React from "react";

interface DynamicScrollBackgroundProps {
  scrollProgress: number; // 0 to 1
}

export const DynamicScrollBackground: React.FC<DynamicScrollBackgroundProps> = ({ scrollProgress }) => {
  // Clamp scrollProgress between 0 and 1
  const sp = Math.max(0, Math.min(1, scrollProgress));

  // Determine active section color theme
  let topGlowColor = "rgba(255, 255, 255, 0.75)"; // Pure Radiant White Top Dome
  let primaryOrbColor = "rgba(59, 130, 246, 0.26)"; // Royal Blue
  let secondaryOrbColor = "rgba(99, 102, 241, 0.18)"; // Indigo

  if (sp < 0.25) {
    // HERO & ABOUT: Pure Radiant White Dome blending into Deep Dark Blue & Obsidian Black Sides
    topGlowColor = "rgba(255, 255, 255, 0.75)";
    primaryOrbColor = "rgba(59, 130, 246, 0.28)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.20)";
  } else if (sp < 0.40) {
    // PLATFORM: Transition into Midnight Cyber Blue
    topGlowColor = "rgba(56, 189, 248, 0.20)";
    primaryOrbColor = "rgba(30, 64, 175, 0.18)";
    secondaryOrbColor = "rgba(99, 102, 241, 0.14)";
  } else if (sp < 0.70) {
    // 03 RESEARCH HUB & CAPABILITIES: Stealth Pitch Black & Crisp White/Platinum Grid Lighting
    topGlowColor = "rgba(255, 255, 255, 0.14)";
    primaryOrbColor = "rgba(255, 255, 255, 0.07)";
    secondaryOrbColor = "rgba(226, 232, 240, 0.05)";
  } else {
    // GENE PLAYGROUND, 04 IMPACT & FINAL CTA: Pure Obsidian Void with Pure White Spotlights
    topGlowColor = "rgba(255, 255, 255, 0.16)";
    primaryOrbColor = "rgba(255, 255, 255, 0.08)";
    secondaryOrbColor = "rgba(241, 245, 249, 0.06)";
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

      {/* 2. Radiant Pure White Horizon & Dome spanning across header row (whiter around header left and right) */}
      <div
        className="absolute top-0 left-0 right-0 h-[480px] sm:h-[550px] transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 130% 85% at 50% -20%, ${topGlowColor} 0%, rgba(255, 255, 255, 0.45) 25%, rgba(186, 230, 253, 0.26) 50%, rgba(37, 99, 235, 0.14) 75%, transparent 100%)`,
          opacity: 1,
        }}
      />

      {/* 3. Deep Obsidian Darkening Vignette from Left and Right Sides below header row */}
      <div
        className="absolute inset-0 pointer-events-none z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_80px,black_160px,black_100%)]"
        style={{
          background: `linear-gradient(to right, #000000 0%, rgba(0,0,0,0.85) 12%, rgba(0,0,0,0.35) 24%, transparent 35%, transparent 65%, rgba(0,0,0,0.35) 76%, rgba(0,0,0,0.85) 88%, #000000 100%)`,
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
