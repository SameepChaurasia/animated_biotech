"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { STATS } from "@/data/content";

interface StatsProps {
  onOpenDetail: (detailId: string) => void;
}

const STAT_THEMES = [
  {
    borderRest: "from-blue-500/50 via-indigo-600/40 to-cyan-500/50",
    borderHover: "group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-indigo-400",
    cornerColor: "border-blue-400 text-blue-400 group-hover:border-blue-300",
    glowShadow: "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.9),0_0_22px_rgba(59,130,246,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_42px_rgba(59,130,246,0.45)]",
    specular: "from-transparent via-blue-400/90 to-transparent",
    numberColor: "text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    code: "NODE.01",
    dotGlow: "bg-blue-400 shadow-[0_0_8px_#3b82f6]",
  },
  {
    borderRest: "from-indigo-500/50 via-purple-600/40 to-blue-500/50",
    borderHover: "group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-blue-400",
    cornerColor: "border-indigo-400 text-indigo-400 group-hover:border-indigo-300",
    glowShadow: "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.9),0_0_22px_rgba(99,102,241,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_42px_rgba(99,102,241,0.45)]",
    specular: "from-transparent via-indigo-400/90 to-transparent",
    numberColor: "text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]",
    code: "NODE.02",
    dotGlow: "bg-indigo-400 shadow-[0_0_8px_#6366f1]",
  },
  {
    borderRest: "from-cyan-500/50 via-teal-600/40 to-blue-500/50",
    borderHover: "group-hover:from-cyan-400 group-hover:via-teal-300 group-hover:to-blue-400",
    cornerColor: "border-cyan-400 text-cyan-400 group-hover:border-cyan-300",
    glowShadow: "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.9),0_0_22px_rgba(34,211,238,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_42px_rgba(34,211,238,0.45)]",
    specular: "from-transparent via-cyan-400/90 to-transparent",
    numberColor: "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]",
    code: "NODE.03",
    dotGlow: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
  },
  {
    borderRest: "from-purple-500/50 via-fuchsia-600/40 to-indigo-500/50",
    borderHover: "group-hover:from-purple-400 group-hover:via-fuchsia-400 group-hover:to-indigo-400",
    cornerColor: "border-purple-400 text-purple-400 group-hover:border-purple-300",
    glowShadow: "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.9),0_0_22px_rgba(168,85,247,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_42px_rgba(168,85,247,0.45)]",
    specular: "from-transparent via-purple-400/90 to-transparent",
    numberColor: "text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    code: "NODE.04",
    dotGlow: "bg-purple-400 shadow-[0_0_8px_#a855f7]",
  },
];

export const Stats: React.FC<StatsProps> = ({ onOpenDetail }) => {
  return (
    <section id="impact" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      {/* Decorative SVG Sparkline Data Curve */}
      <div className="absolute inset-0 opacity-25 pointer-events-none flex items-center justify-center z-0">
        <svg viewBox="0 0 1200 400" className="w-full h-full stroke-white/40 fill-none stroke-[2]">
          <path d="M 0 300 Q 300 350, 600 150 T 1200 50" />
          <path d="M 0 250 Q 400 100, 800 220 T 1200 120" stroke="#CBD5E1" strokeDasharray="6 6" />
        </svg>
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 06 — IMPACT"
          headline="Empirical Milestones Across Clinical & Commercial Discovery."
          subheading="Our AI platform consistently delivers validated predictive accuracy and accelerated development timelines."
        />

        {/* 4 Stats Grid with Creative Cyber HUD Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const mapId =
              idx === 0
                ? "drug-discovery"
                : idx === 1
                ? "pillar-velocity"
                : idx === 2
                ? "protein-engine"
                : "clinical-accel";

            const theme = STAT_THEMES[idx % STAT_THEMES.length];

            return (
              <RevealOnScroll key={stat.label} delay={idx * 100}>
                <div
                  onClick={() => onOpenDetail(mapId)}
                  className={`group relative p-[1.5px] rounded-3xl bg-gradient-to-br ${theme.borderRest} ${theme.borderHover} animate-border-flow transition-all duration-500 ${theme.glowShadow} hover:-translate-y-2 hover:scale-[1.015] cursor-pointer h-full`}
                >
                  {/* Top Specular Rim */}
                  <div className={`absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r ${theme.specular} rounded-full z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />

                  {/* Top-Edge Tech Code Notch */}
                  <div className="absolute -top-[1px] right-6 px-2.5 py-0.5 rounded-b-md bg-slate-950 border-x border-b border-slate-700/60 group-hover:border-cyan-400/50 font-mono text-[8px] tracking-wider text-slate-400 group-hover:text-cyan-300 transition-colors z-20 pointer-events-none shadow-sm flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{theme.code}</span>
                  </div>

                  {/* Sci-Fi HUD Corner Brackets */}
                  <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 rounded-tl-sm ${theme.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-4 group-hover:h-4`} />
                  <div className={`absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 rounded-tr-sm ${theme.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-4 group-hover:h-4 flex items-start justify-end p-0.5`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${theme.dotGlow} animate-pulse`} />
                  </div>
                  <div className={`absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 rounded-bl-sm ${theme.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-4 group-hover:h-4`} />
                  <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 rounded-br-sm ${theme.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-4 group-hover:h-4`} />

                  {/* Interior Slab */}
                  <div className="bg-slate-950/95 backdrop-blur-2xl p-7 rounded-[22.5px] border border-slate-800/80 group-hover:border-slate-700/80 flex flex-col justify-between h-full relative z-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.8)] transition-colors">
                    <div>
                      <div className={`text-4xl sm:text-5xl font-bold font-mono mb-3 tracking-tight group-hover:scale-105 transition-transform ${theme.numberColor}`}>
                        <AnimatedCounter
                          target={stat.targetNumber}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                          decimals={stat.decimals || 0}
                        />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {stat.label}
                      </h3>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-indigo-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                        <span className="text-[10px] text-slate-300">EMPIRICALLY VALIDATED</span>
                      </div>
                      <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5">SPECS →</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
};


