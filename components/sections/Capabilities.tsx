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
  Zap,
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
  telemetryTag: string;
}

const THEME_MAP: Record<string, NodeTheme> = {
  "drug-discovery": {
    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-sky-400" />,
    accentHex: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    badgeBg: "bg-sky-950/80",
    badgeText: "text-sky-300",
    badgeBorder: "border-sky-500/50",
    hoverBorder: "group-hover:border-sky-400",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(56,189,248,0.5)]",
    gradientId: "spoke-sky",
    colorFrom: "#38bdf8",
    colorTo: "#3b82f6",
    telemetryTag: "AFFINITY: < 0.01 nM",
  },
  "genomic-analytics": {
    icon: <Binary className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />,
    accentHex: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.45)",
    badgeBg: "bg-indigo-950/80",
    badgeText: "text-indigo-300",
    badgeBorder: "border-indigo-500/50",
    hoverBorder: "group-hover:border-indigo-400",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(129,140,248,0.5)]",
    gradientId: "spoke-indigo",
    colorFrom: "#818cf8",
    colorTo: "#6366f1",
    telemetryTag: "PETABASE STREAM: 4.8 TB/s",
  },
  "synthetic-design": {
    icon: <Dna className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />,
    accentHex: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.45)",
    badgeBg: "bg-purple-950/80",
    badgeText: "text-purple-300",
    badgeBorder: "border-purple-500/50",
    hoverBorder: "group-hover:border-purple-400",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(192,132,252,0.5)]",
    gradientId: "spoke-purple",
    colorFrom: "#c084fc",
    colorTo: "#a855f7",
    telemetryTag: "CRISPR-Cas12a: ONLINE",
  },
  "clinical-accel": {
    icon: <Activity className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />,
    accentHex: "#2dd4bf",
    glowColor: "rgba(45, 212, 191, 0.45)",
    badgeBg: "bg-teal-950/80",
    badgeText: "text-teal-300",
    badgeBorder: "border-teal-500/50",
    hoverBorder: "group-hover:border-teal-400",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(45,212,191,0.5)]",
    gradientId: "spoke-teal",
    colorFrom: "#2dd4bf",
    colorTo: "#14b8a6",
    telemetryTag: "BAYESIAN ACCEL: 6.4x",
  },
  "regulatory-intel": {
    icon: <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />,
    accentHex: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    badgeBg: "bg-amber-950/80",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-500/50",
    hoverBorder: "group-hover:border-amber-400",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]",
    gradientId: "spoke-amber",
    colorFrom: "#fbbf24",
    colorTo: "#f59e0b",
    telemetryTag: "IND-COMPLIANT: 100%",
  },
  "bio-compute": {
    icon: <Cpu className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />,
    accentHex: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.45)",
    badgeBg: "bg-emerald-950/80",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-500/50",
    hoverBorder: "group-hover:border-emerald-400",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(52,211,153,0.5)]",
    gradientId: "spoke-emerald",
    colorFrom: "#34d399",
    colorTo: "#10b981",
    telemetryTag: "INFERENCE: < 3.8 ms",
  },
};

// 6 Node Coordinates on a 800x800 SVG canvas (Radius: 270px around center (400, 400))
// Angles: -90° (top), -30° (top-right), 30° (bottom-right), 90° (bottom), 150° (bottom-left), 210° (top-left)
const RADIAL_COORDINATES = [
  { cx: 400, cy: 130, percentX: 50, percentY: 16.25, angleDeg: -90, label: "000°", tooltipPlacement: "bottom" as const },
  { cx: 634, cy: 265, percentX: 79.25, percentY: 33.1, angleDeg: -30, label: "060°", tooltipPlacement: "bottom" as const },
  { cx: 634, cy: 535, percentX: 79.25, percentY: 66.9, angleDeg: 30, label: "120°", tooltipPlacement: "top" as const },
  { cx: 400, cy: 670, percentX: 50, percentY: 83.75, angleDeg: 90, label: "180°", tooltipPlacement: "top" as const },
  { cx: 166, cy: 535, percentX: 20.75, percentY: 66.9, angleDeg: 150, label: "240°", tooltipPlacement: "top" as const },
  { cx: 166, cy: 265, percentX: 20.75, percentY: 33.1, angleDeg: 210, label: "300°", tooltipPlacement: "bottom" as const },
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
          subheading="Interactive orbital command hub connecting in silico generative modeling, wet-lab robotic synthesis, and Bayesian clinical pipeline design."
        />

        {/* ── DESKTOP & TABLET: RADIAL ORBITAL HUB-SPOKE SYSTEM (>= 768px) ── */}
        <div className="hidden md:flex flex-col items-center justify-center relative mt-6 lg:mt-12">
          
          {/* 4 Corner Ambient Cyber HUD Widgets */}
          <div className="absolute top-2 left-0 font-mono text-[9px] text-cyan-400/70 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>[GENOMICS MODELING // 10^18 FLOPS]</span>
          </div>

          <div className="absolute top-2 right-0 font-mono text-[9px] text-indigo-400/70 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-indigo-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_#818cf8]" />
            <span>[WET-LAB ROBOTICS // CLOSED-LOOP]</span>
          </div>

          <div className="absolute bottom-2 left-0 font-mono text-[9px] text-teal-400/70 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-teal-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(45,212,191,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
            <span>[BAYESIAN SIMULATOR // ACTIVE]</span>
          </div>

          <div className="absolute bottom-2 right-0 font-mono text-[9px] text-purple-400/70 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-purple-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
            <span>[REGULATORY AUTOMATION // SOC-2]</span>
          </div>

          {/* Orbital Canvas Wrapper */}
          <div className="relative w-full max-w-[880px] aspect-[1/0.95] max-h-[780px] flex items-center justify-center select-none py-6">
            
            {/* SVG Connecting Spokes, Energy Photon Packets & Orbital Rings */}
            <svg
              viewBox="0 0 800 800"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            >
              <defs>
                {/* Radial gradients for each spoke line */}
                {CAPABILITIES.map((cap) => {
                  const theme = THEME_MAP[cap.id] || THEME_MAP["drug-discovery"];
                  const coord = RADIAL_COORDINATES[CAPABILITIES.findIndex((c) => c.id === cap.id)];
                  return (
                    <linearGradient
                      key={theme.gradientId}
                      id={theme.gradientId}
                      x1="400"
                      y1="400"
                      x2={coord?.cx || 400}
                      y2={coord?.cy || 400}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                      <stop offset="70%" stopColor={theme.colorFrom} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={theme.colorTo} stopOpacity="1" />
                    </linearGradient>
                  );
                })}

                {/* Center Hub Ambient Glow Radial */}
                <radialGradient id="hub-ambient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#6366f1" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#030712" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Outer Rotating Holographic Track with Degree Glyphs */}
              <g className="animate-spin-32s-reverse" style={{ transformOrigin: "400px 400px" }}>
                <circle
                  cx="400"
                  cy="400"
                  r="380"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="6 14"
                />
                {/* Degree Tick Ticks */}
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x1 = 400 + Math.cos(rad) * 370;
                  const y1 = 400 + Math.sin(rad) * 370;
                  const x2 = 400 + Math.cos(rad) * 390;
                  const y2 = 400 + Math.sin(rad) * 390;
                  return (
                    <line
                      key={`deg-tick-${deg}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(56, 189, 248, 0.45)"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </g>

              {/* Middle Primary Orbital Track with Crosshair Nodes */}
              <g className="animate-spin-20s" style={{ transformOrigin: "400px 400px" }}>
                <circle
                  cx="400"
                  cy="400"
                  r="270"
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="12 18"
                />
                <circle cx="670" cy="400" r="4" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 6px #38bdf8)" }} />
                <circle cx="130" cy="400" r="4" fill="#c084fc" style={{ filter: "drop-shadow(0 0 6px #c084fc)" }} />
              </g>

              {/* Inner High-Speed Ring */}
              <circle
                cx="400"
                cy="400"
                r="160"
                fill="none"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />

              {/* Inter-Node Neural Constellation Perimeter Links */}
              <polygon
                points={RADIAL_COORDINATES.map((c) => `${c.cx},${c.cy}`).join(" ")}
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                className="animate-perimeter-flow"
              />

              {/* Ambient Hub Backdrop Flare */}
              <circle cx="400" cy="400" r="140" fill="url(#hub-ambient)" />

              {/* Dynamic Spoke Lines with Real-Time Photon Packets */}
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
                      stroke="rgba(148, 163, 184, 0.2)"
                      strokeWidth="1.5"
                    />

                    {/* Active Pulsing Energy Stroke */}
                    <line
                      x1="400"
                      y1="400"
                      x2={coord.cx}
                      y2={coord.cy}
                      stroke={`url(#${theme.gradientId})`}
                      strokeWidth={isHovered ? "3.5" : "2"}
                      strokeDasharray="14 18"
                      className="animate-spoke-packet"
                      style={{
                        opacity: isHovered ? 1 : 0.65,
                        filter: isHovered ? `drop-shadow(0 0 12px ${theme.accentHex})` : `drop-shadow(0 0 4px ${theme.accentHex})`,
                        transition: "opacity 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease",
                      }}
                    />

                    {/* Traveling Photon Energy Packet along the Spoke */}
                    <circle
                      r={isHovered ? 4.5 : 3}
                      fill="#FFFFFF"
                      style={{
                        filter: `drop-shadow(0 0 8px ${theme.accentHex}) drop-shadow(0 0 14px ${theme.accentHex})`,
                      }}
                    >
                      <animateMotion
                        path={`M 400 400 L ${coord.cx} ${coord.cy}`}
                        dur={isHovered ? "1.2s" : "2.4s"}
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Animated Contact Joint / Signal Beacon on Node Boundary */}
                    <circle
                      cx={coord.cx}
                      cy={coord.cy}
                      r={isHovered ? 6 : 3.5}
                      fill={theme.accentHex}
                      style={{
                        filter: `drop-shadow(0 0 10px ${theme.accentHex})`,
                        transition: "r 0.3s ease",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* ── CENTRAL HUB COMMAND ENGINE ── */}
            <div
              onMouseEnter={() => {
                setIsHubHovered(true);
                soundManager.playHoverSound();
              }}
              onMouseLeave={() => setIsHubHovered(false)}
              className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-default group"
            >
              {/* Outer Pulsing Aura Ring with Rotating Reactor Track */}
              <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_50px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_80px_rgba(34,211,238,0.7)] group-hover:scale-105 transition-all duration-500 animate-core-reactor">
                
                {/* Rotating 3D Specular Track */}
                <div className="w-full h-full rounded-full bg-slate-950/95 backdrop-blur-2xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden border border-cyan-500/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.8)]">
                  
                  {/* Subtle Background Radial Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-transparent to-indigo-500/15 pointer-events-none" />

                  {/* Core Icon Mark with Pulsing Cyber Beacon */}
                  <div className="w-9 h-9 rounded-xl bg-blue-950 border border-cyan-400/70 flex items-center justify-center mb-1 shadow-[0_0_20px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />
                  </div>

                  {/* Hub Label */}
                  <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest leading-none">
                    // COMMAND CORE
                  </span>
                  
                  <span className="font-sans font-extrabold text-white text-xs lg:text-sm tracking-tight mt-0.5">
                    CAPABILITIES
                  </span>

                  {/* Status Indicator */}
                  <div className="mt-1 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[9px] font-mono text-slate-300 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                    <span className="font-semibold text-cyan-300">6 ENGINES SYNC</span>
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
                    {/* Node Icon Circle Badge with Sci-Fi HUD Bracket Accents */}
                    <div
                      className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl p-[2px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 transition-all duration-300 shadow-[0_14px_30px_rgba(0,0,0,0.9)] ${theme.hoverBorder} ${theme.hoverGlow} ${
                        isHovered ? "scale-115 -translate-y-1.5" : "scale-100"
                      }`}
                    >
                      {/* Top Specular Rim */}
                      <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="w-full h-full rounded-[14px] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center relative overflow-hidden border border-slate-800 group-hover:border-cyan-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
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

                    {/* Node Title & Category Badge */}
                    <div className="mt-2 flex flex-col items-center text-center max-w-[150px] lg:max-w-[170px]">
                      <span
                        className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border mb-1 transition-colors ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} shadow-sm`}
                      >
                        {cap.category}
                      </span>
                      
                      <h4 className="font-sans font-bold text-xs lg:text-sm text-white group-hover:text-cyan-300 transition-colors leading-tight drop-shadow-sm">
                        {cap.title}
                      </h4>

                      {/* Live Telemetry Micro-Tag */}
                      <span className="font-mono text-[8px] text-cyan-400/80 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {theme.telemetryTag}
                      </span>
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
                        width: "240px",
                        left: "50%",
                        marginLeft: "-120px",
                        ...(coord.tooltipPlacement === "top"
                          ? { bottom: "100%", marginBottom: "16px" }
                          : { top: "100%", marginTop: "16px" }),
                      }}
                    >
                      <div className="p-4 rounded-2xl bg-slate-950/98 border border-cyan-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(34,211,238,0.35)] backdrop-blur-2xl text-left space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-[9px] text-cyan-400 border-b border-slate-800 pb-1.5">
                          <span>// NODE TELEMETRY</span>
                          <span className="text-emerald-400 font-bold">● ACTIVE</span>
                        </div>

                        <p className="font-sans text-[11px] text-slate-300 leading-relaxed">
                          {cap.description}
                        </p>

                        {/* Metric Callout */}
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
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/90 border border-cyan-500/50 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
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

