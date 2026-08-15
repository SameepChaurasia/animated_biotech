"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Binary,
  Dna,
  Activity,
  FileCheck,
  Cpu,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAPABILITIES, CapabilityItem } from "@/data/content";
import { soundManager } from "@/lib/audio";

interface CapabilitiesProps {
  onOpenDetail: (detailId: string) => void;
}

interface NodeTheme {
  icon: React.ReactNode;
  accentHex: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  hoverBorder: string;
  hoverGlow: string;
  gradientId: string;
  colorFrom: string;
  colorTo: string;
}

const THEME_MAP: Record<string, NodeTheme> = {
  "drug-discovery": {
    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-sky-400" />,
    accentHex: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    badgeBg: "bg-sky-950/70",
    badgeText: "text-sky-300",
    badgeBorder: "border-sky-500/40",
    hoverBorder: "group-hover:border-sky-400",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]",
    gradientId: "spoke-sky",
    colorFrom: "#38bdf8",
    colorTo: "#3b82f6",
  },
  "genomic-analytics": {
    icon: <Binary className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />,
    accentHex: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.4)",
    badgeBg: "bg-indigo-950/70",
    badgeText: "text-indigo-300",
    badgeBorder: "border-indigo-500/40",
    hoverBorder: "group-hover:border-indigo-400",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(129,140,248,0.35)]",
    gradientId: "spoke-indigo",
    colorFrom: "#818cf8",
    colorTo: "#6366f1",
  },
  "synthetic-design": {
    icon: <Dna className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />,
    accentHex: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.4)",
    badgeBg: "bg-purple-950/70",
    badgeText: "text-purple-300",
    badgeBorder: "border-purple-500/40",
    hoverBorder: "group-hover:border-purple-400",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.35)]",
    gradientId: "spoke-purple",
    colorFrom: "#c084fc",
    colorTo: "#a855f7",
  },
  "clinical-accel": {
    icon: <Activity className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />,
    accentHex: "#2dd4bf",
    glowColor: "rgba(45, 212, 191, 0.4)",
    badgeBg: "bg-teal-950/70",
    badgeText: "text-teal-300",
    badgeBorder: "border-teal-500/40",
    hoverBorder: "group-hover:border-teal-400",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(45,212,191,0.35)]",
    gradientId: "spoke-teal",
    colorFrom: "#2dd4bf",
    colorTo: "#14b8a6",
  },
  "regulatory-intel": {
    icon: <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />,
    accentHex: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.4)",
    badgeBg: "bg-amber-950/70",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-500/40",
    hoverBorder: "group-hover:border-amber-400",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]",
    gradientId: "spoke-amber",
    colorFrom: "#fbbf24",
    colorTo: "#f59e0b",
  },
  "bio-compute": {
    icon: <Cpu className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />,
    accentHex: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.4)",
    badgeBg: "bg-emerald-950/70",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-500/40",
    hoverBorder: "group-hover:border-emerald-400",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]",
    gradientId: "spoke-emerald",
    colorFrom: "#34d399",
    colorTo: "#10b981",
  },
};

// 6 Node Coordinates on a 800x800 SVG canvas (Radius: 270px around center (400, 400))
// Angles: -90° (top), -30° (top-right), 30° (bottom-right), 90° (bottom), 150° (bottom-left), 210° (top-left)
const RADIAL_COORDINATES = [
  { cx: 400, cy: 130, percentX: 50, percentY: 16.25, angleDeg: -90, tooltipPlacement: "bottom" as const },
  { cx: 634, cy: 265, percentX: 79.25, percentY: 33.1, angleDeg: -30, tooltipPlacement: "bottom" as const },
  { cx: 634, cy: 535, percentX: 79.25, percentY: 66.9, angleDeg: 30, tooltipPlacement: "top" as const },
  { cx: 400, cy: 670, percentX: 50, percentY: 83.75, angleDeg: 90, tooltipPlacement: "top" as const },
  { cx: 166, cy: 535, percentX: 20.75, percentY: 66.9, angleDeg: 150, tooltipPlacement: "top" as const },
  { cx: 166, cy: 265, percentX: 20.75, percentY: 33.1, angleDeg: 210, tooltipPlacement: "bottom" as const },
];

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenDetail }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>("drug-discovery");
  const [isHubHovered, setIsHubHovered] = useState<boolean>(false);

  const handleNodeClick = (id: string) => {
    soundManager.playClickSound();
    onOpenDetail(id);
  };

  const handleNodeHover = (id: string | null) => {
    if (id && id !== hoveredId) {
      soundManager.playHoverSound();
    }
    setHoveredId(id);
  };

  return (
    <section id="capabilities" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 04 — CAPABILITIES"
          headline="Full-Stack Synthetic Biology & High-Performance Bio-Compute."
          subheading="Interactive orbital hub connecting in silico generative modeling, wet-lab robotic synthesis, and Bayesian clinical pipeline design."
        />

        {/* ── DESKTOP & TABLET: RADIAL ORBITAL HUB-SPOKE SYSTEM (>= 768px) ── */}
        <div className="hidden md:flex flex-col items-center justify-center relative mt-6 lg:mt-12">
          {/* Orbital Canvas Wrapper */}
          <div className="relative w-full max-w-[880px] aspect-[1/0.95] max-h-[780px] flex items-center justify-center select-none py-6">
            
            {/* SVG Connecting Spokes & Orbital Guides Layer */}
            <svg
              viewBox="0 0 800 800"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            >
              <defs>
                {/* Radial gradients for each spoke line */}
                {CAPABILITIES.map((cap) => {
                  const theme = THEME_MAP[cap.id] || THEME_MAP["drug-discovery"];
                  return (
                    <linearGradient
                      key={theme.gradientId}
                      id={theme.gradientId}
                      x1="400"
                      y1="400"
                      x2={RADIAL_COORDINATES[CAPABILITIES.findIndex((c) => c.id === cap.id)]?.cx || 400}
                      y2={RADIAL_COORDINATES[CAPABILITIES.findIndex((c) => c.id === cap.id)]?.cy || 400}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="70%" stopColor={theme.colorFrom} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={theme.colorTo} stopOpacity="1" />
                    </linearGradient>
                  );
                })}

                {/* Center Hub Ambient Glow Radial */}
                <radialGradient id="hub-ambient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#6366f1" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#030712" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Orbital Guide Circles (Cosmic & Molecular Blueprint Aesthetic) */}
              <circle
                cx="400"
                cy="400"
                r="380"
                fill="none"
                stroke="rgba(148, 163, 184, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="400"
                cy="400"
                r="285"
                fill="none"
                stroke="rgba(148, 163, 184, 0.12)"
                strokeWidth="1"
                strokeDasharray="6 12"
              />
              <circle
                cx="400"
                cy="400"
                r="175"
                fill="none"
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="1"
                strokeDasharray="2 6"
              />

              {/* Ambient Hub Backdrop Flare */}
              <circle cx="400" cy="400" r="140" fill="url(#hub-ambient)" />

              {/* Dynamic Spoke Lines Connecting Center Hub to Each Node */}
              {CAPABILITIES.map((cap, idx) => {
                const coord = RADIAL_COORDINATES[idx];
                const theme = THEME_MAP[cap.id] || THEME_MAP["drug-discovery"];
                const isHovered = hoveredId === cap.id || isHubHovered;

                return (
                  <g key={`spoke-${cap.id}`} className="transition-all duration-300">
                    {/* Passive Base Structural Line */}
                    <line
                      x1="400"
                      y1="400"
                      x2={coord.cx}
                      y2={coord.cy}
                      stroke="rgba(148, 163, 184, 0.18)"
                      strokeWidth="1.5"
                    />

                    {/* Active Pulsing Flow Stroke */}
                    <line
                      x1="400"
                      y1="400"
                      x2={coord.cx}
                      y2={coord.cy}
                      stroke={`url(#${theme.gradientId})`}
                      strokeWidth={isHovered ? "2.5" : "1.5"}
                      strokeDasharray="8 14"
                      className="animate-spoke-flow"
                      style={{
                        opacity: isHovered ? 1 : 0.35,
                        filter: isHovered ? `drop-shadow(0 0 8px ${theme.accentHex})` : "none",
                        transition: "opacity 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease",
                      }}
                    />

                    {/* Animated Contact Joint / Signal Blip on Node Boundary */}
                    <circle
                      cx={coord.cx}
                      cy={coord.cy}
                      r={isHovered ? 4.5 : 2.5}
                      fill={theme.accentHex}
                      style={{
                        filter: `drop-shadow(0 0 6px ${theme.accentHex})`,
                        transition: "r 0.3s ease",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* ── CENTRAL HUB NODE ── */}
            <div
              onMouseEnter={() => {
                setIsHubHovered(true);
                soundManager.playHoverSound();
              }}
              onMouseLeave={() => setIsHubHovered(false)}
              className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-default group"
            >
              {/* Outer Pulsing Aura Ring */}
              <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full p-[2px] bg-gradient-to-tr from-blue-500/40 via-cyan-400/50 to-indigo-500/40 shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_60px_rgba(34,211,238,0.55)] group-hover:scale-105 transition-all duration-500">
                
                {/* Rotating 3D Specular Track */}
                <div className="w-full h-full rounded-full bg-slate-950/95 backdrop-blur-2xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden border border-slate-800/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.8)]">
                  
                  {/* Subtle Background Radial Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

                  {/* Core Icon Mark */}
                  <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-cyan-400/50 flex items-center justify-center mb-1 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <span className="font-mono text-cyan-300 font-black text-xs">CB</span>
                  </div>

                  {/* Hub Label */}
                  <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest leading-none">
                    // CORE SYSTEM
                  </span>
                  
                  <span className="font-sans font-extrabold text-white text-xs lg:text-sm tracking-tight mt-0.5">
                    CAPABILITIES
                  </span>

                  {/* Status Indicator */}
                  <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[9px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>6 NODES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 6 ORBITAL CAPABILITY NODES ── */}
            {CAPABILITIES.map((cap, idx) => {
              const coord = RADIAL_COORDINATES[idx];
              const theme = THEME_MAP[cap.id] || THEME_MAP["drug-discovery"];
              const isHovered = hoveredId === cap.id;

              return (
                <div
                  key={cap.id}
                  style={{
                    top: `${coord.percentY}%`,
                    left: `${coord.percentX}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute z-30"
                >
                  <div
                    onMouseEnter={() => handleNodeHover(cap.id)}
                    onMouseLeave={() => handleNodeHover(null)}
                    onClick={() => handleNodeClick(cap.id)}
                    className="relative group cursor-pointer flex flex-col items-center"
                  >
                    {/* Node Icon Circle Badge */}
                    <div
                      className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl p-[1.5px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.85)] ${theme.hoverBorder} ${theme.hoverGlow} ${
                        isHovered ? "scale-110 -translate-y-1" : "scale-100"
                      }`}
                    >
                      <div className="w-full h-full rounded-[14.5px] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center relative overflow-hidden border border-slate-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                        {/* Glow tint on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${theme.glowColor}, transparent 70%)`,
                          }}
                        />

                        {/* Centered Node Icon */}
                        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                          {theme.icon}
                        </div>
                      </div>
                    </div>

                    {/* Node Title & Category Badge (Compact Always Visible) */}
                    <div className="mt-2.5 flex flex-col items-center text-center max-w-[150px] lg:max-w-[170px]">
                      <span
                        className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1 transition-colors ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                      >
                        {cap.category}
                      </span>
                      
                      <h4 className="font-sans font-bold text-xs lg:text-sm text-white group-hover:text-cyan-300 transition-colors leading-tight">
                        {cap.title}
                      </h4>
                    </div>

                    {/* ── PROGRESSIVE DISCLOSURE: HOVER CARD / EXPANDABLE DRAWER ── */}
                    <div
                      className={`absolute z-40 transition-all duration-300 pointer-events-none ${
                        isHovered
                          ? "opacity-100 translate-y-0 scale-100"
                          : coord.tooltipPlacement === "top"
                          ? "opacity-0 translate-y-2 scale-95"
                          : "opacity-0 -translate-y-2 scale-95"
                      }`}
                      style={{
                        width: "230px",
                        left: "50%",
                        marginLeft: "-115px",
                        ...(coord.tooltipPlacement === "top"
                          ? { bottom: "100%", marginBottom: "14px" }
                          : { top: "100%", marginTop: "14px" }),
                      }}
                    >
                      <div className="p-3.5 rounded-2xl bg-slate-950/98 border border-cyan-500/40 shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(34,211,238,0.25)] backdrop-blur-2xl text-left space-y-2">
                        <p className="font-sans text-[11px] text-slate-300 leading-relaxed">
                          {cap.description}
                        </p>

                        {/* Metric Callout or Action Indicator */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-[10px]">
                          {cap.highlightMetric ? (
                            <span className="text-cyan-300 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              {cap.highlightMetric}
                            </span>
                          ) : (
                            <span className="text-slate-400">READY FOR DEPLOY</span>
                          )}

                          <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:underline">
                            SPECS <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE: INTERACTIVE SPOKE TIMELINE LIST (< 768px) ── */}
        <div className="block md:hidden mt-8">
          {/* Mobile Central Hub Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/90 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <div className="w-6 h-6 rounded-md bg-blue-950 border border-cyan-400/50 flex items-center justify-center font-mono text-cyan-300 text-[10px] font-black">
                CB
              </div>
              <span className="font-mono text-xs text-white font-bold tracking-wider">
                CAPABILITIES // 6 ACTIVE ENGINES
              </span>
            </div>
          </div>

          {/* Vertical Spoke Timeline */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-blue-500/80 before:via-cyan-400/60 before:to-indigo-500/80">
            {CAPABILITIES.map((cap) => {
              const theme = THEME_MAP[cap.id] || THEME_MAP["drug-discovery"];
              const isExpanded = expandedMobileId === cap.id;

              return (
                <div key={`mobile-${cap.id}`} className="relative">
                  {/* Left Spoke Joint Dot */}
                  <div
                    className={`absolute -left-[19px] top-4 w-3.5 h-3.5 rounded-full border-2 border-slate-950 transition-all duration-300 ${
                      isExpanded
                        ? "bg-cyan-400 shadow-[0_0_12px_#22d3ee] scale-125"
                        : "bg-slate-700"
                    }`}
                  />

                  {/* Spoke Card */}
                  <div
                    onClick={() => {
                      soundManager.playClickSound();
                      setExpandedMobileId(isExpanded ? null : cap.id);
                    }}
                    className={`p-4 rounded-2xl bg-slate-950/90 border transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.7)] ${
                      isExpanded
                        ? "border-cyan-500/60 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl p-[1px] bg-slate-800 border flex items-center justify-center shrink-0 ${theme.badgeBorder}`}
                        >
                          {theme.icon}
                        </div>
                        <div>
                          <span
                            className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} inline-block mb-0.5`}
                          >
                            {cap.category}
                          </span>
                          <h4 className="font-sans font-bold text-sm text-white">
                            {cap.title}
                          </h4>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isExpanded ? "rotate-90 text-cyan-400" : ""
                        }`}
                      />
                    </div>

                    {/* Expandable Accordion Body */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-3 animate-fadeIn">
                        <p className="font-sans text-xs text-slate-300 leading-relaxed">
                          {cap.description}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          {cap.highlightMetric && (
                            <span className="font-mono text-[10px] text-cyan-300 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              {cap.highlightMetric}
                            </span>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNodeClick(cap.id);
                            }}
                            className="ml-auto min-h-[44px] px-3.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-cyan-400/50 text-cyan-200 font-mono text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <span>EXPLORE SPECS</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
