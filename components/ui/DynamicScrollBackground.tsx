"use client";

import React from "react";

interface DynamicScrollBackgroundProps {
  scrollProgress: number; // 0 to 1
}

export const DynamicScrollBackground: React.FC<DynamicScrollBackgroundProps> = ({ scrollProgress }) => {
  // Clamp scrollProgress between 0 and 1
  const sp = Math.max(0, Math.min(1, scrollProgress));

  // Determine active section color theme
  let topGlowColor = "rgba(59, 130, 246, 0.35)"; // Ice/Sky Blue
  let primaryOrbColor = "rgba(59, 130, 246, 0.22)"; // Royal Blue
  let secondaryOrbColor = "rgba(99, 102, 241, 0.18)"; // Indigo
  let gridOpacity = 0.4;
  let heroHeaderGradientOpacity = 1;

  if (sp < 0.18) {
    // HERO: DeepPiction Ice-White & Sky Blue Top Backdrop Blend
    topGlowColor = "rgba(186, 230, 253, 0.45)"; // Crisp Ice-White / Sky Blue
    primaryOrbColor = "rgba(59, 130, 246, 0.28)"; // Royal Blue
    secondaryOrbColor = "rgba(248, 250, 252, 0.15)"; // Crisp White Light Glow
    heroHeaderGradientOpacity = 1 - sp * 4;
  } else if (sp < 0.35) {
    // ABOUT: Deep Pitch Black, Slate & Crisp White Accents
    topGlowColor = "rgba(147, 197, 253, 0.25)";
    primaryOrbColor = "rgba(99, 102, 241, 0.28)"; // Indigo
    secondaryOrbColor = "rgba(255, 255, 255, 0.12)"; // White Light
    heroHeaderGradientOpacity = 0;
  } else if (sp < 0.52) {
    // PLATFORM: Electric Sapphire & Dark Cyan
    topGlowColor = "rgba(56, 189, 248, 0.25)";
    primaryOrbColor = "rgba(2, 132, 199, 0.28)"; // Cyan
    secondaryOrbColor = "rgba(224, 242, 254, 0.18)"; // Ice Blue
    heroHeaderGradientOpacity = 0;
  } else if (sp < 0.68) {
    // RESEARCH HUB: Cyber Teal & Deep Emerald
    topGlowColor = "rgba(45, 212, 191, 0.25)";
    primaryOrbColor = "rgba(20, 184, 166, 0.25)"; // Teal
    secondaryOrbColor = "rgba(56, 189, 248, 0.2)"; // Sky Blue
    heroHeaderGradientOpacity = 0;
  } else if (sp < 0.82) {
    // CAPABILITIES: Amethyst Violet & White Light Highlights
    topGlowColor = "rgba(168, 85, 247, 0.25)";
    primaryOrbColor = "rgba(139, 92, 246, 0.28)"; // Purple
    secondaryOrbColor = "rgba(255, 255, 255, 0.14)"; // Crisp White Glow
    heroHeaderGradientOpacity = 0;
  } else {
    // STATS & FINAL CTA: Deep Obsidian Void & Ice Blue Light Ray
    topGlowColor = "rgba(56, 189, 248, 0.25)";
    primaryOrbColor = "rgba(59, 130, 246, 0.28)";
    secondaryOrbColor = "rgba(224, 242, 254, 0.2)";
    heroHeaderGradientOpacity = 0;
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

      {/* 2. DeepPiction Sky/Ice-Blue Top Atmospheric Backdrop Gradient Layer */}
      <div
        className="absolute top-0 left-0 right-0 h-[720px] transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${topGlowColor} 0%, rgba(15, 23, 42, 0.5) 45%, rgba(3, 7, 18, 0) 100%)`,
          opacity: Math.max(0.2, heroHeaderGradientOpacity),
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
