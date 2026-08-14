"use client";

import React from "react";

interface CurvedSectionTransitionProps {
  variant?: "hero-to-about" | "about-to-platform" | "platform-to-research" | "research-to-capabilities" | "capabilities-to-sandbox" | "default";
  className?: string;
}

export const CurvedSectionTransition: React.FC<CurvedSectionTransitionProps> = ({
  variant = "default",
  className = "",
}) => {
  // Theme color curves matching DeepPiction's curved atmospheric screenshot
  let gradientColors = {
    top: "rgba(59, 130, 246, 0.35)", // Sky Blue
    mid: "rgba(99, 102, 241, 0.2)",  // Indigo
    glow: "#3b82f6",
  };

  if (variant === "hero-to-about") {
    gradientColors = {
      top: "rgba(186, 230, 253, 0.45)", // Ice Blue
      mid: "rgba(59, 130, 246, 0.25)",
      glow: "#60a5fa",
    };
  } else if (variant === "about-to-platform") {
    gradientColors = {
      top: "rgba(99, 102, 241, 0.3)", // Royal Indigo
      mid: "rgba(139, 92, 246, 0.2)",
      glow: "#818cf8",
    };
  } else if (variant === "platform-to-research") {
    gradientColors = {
      top: "rgba(56, 189, 248, 0.3)", // Electric Cyan
      mid: "rgba(14, 116, 144, 0.2)",
      glow: "#38bdf8",
    };
  } else if (variant === "research-to-capabilities") {
    gradientColors = {
      top: "rgba(45, 212, 191, 0.3)", // Cyber Teal
      mid: "rgba(20, 184, 166, 0.2)",
      glow: "#2dd4bf",
    };
  } else if (variant === "capabilities-to-sandbox") {
    gradientColors = {
      top: "rgba(168, 85, 247, 0.3)", // Amethyst Purple
      mid: "rgba(124, 58, 237, 0.2)",
      glow: "#c084fc",
    };
  }

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none z-20 my-[-2px] ${className}`}>
      {/* Organic Curved Parabolic Arc SVG */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-24 lg:h-32 preserve-3d block"
      >
        {/* Soft Background Curved Layer */}
        <path
          d="M0,0 C480,110 960,110 1440,0 L1440,120 L0,120 Z"
          fill="url(#curved-gradient-bg)"
        />

        {/* Glowing Curved Border Line Accent */}
        <path
          d="M0,0 C480,110 960,110 1440,0"
          stroke="url(#curved-line-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-75"
        />

        <defs>
          <linearGradient id="curved-gradient-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.top} />
            <stop offset="50%" stopColor={gradientColors.mid} />
            <stop offset="100%" stopColor="rgba(3, 7, 18, 0)" />
          </linearGradient>

          <linearGradient id="curved-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientColors.glow} stopOpacity="0" />
            <stop offset="50%" stopColor={gradientColors.glow} stopOpacity="0.9" />
            <stop offset="100%" stopColor={gradientColors.glow} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
