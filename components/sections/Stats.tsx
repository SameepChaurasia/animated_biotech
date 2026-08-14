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

export const Stats: React.FC<StatsProps> = ({ onOpenDetail }) => {
  return (
    <section id="impact" className="py-24 md:py-32 bg-radar-grid relative overflow-hidden">
      {/* Decorative SVG Sparkline Data Curve */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 1200 400" className="w-full h-full stroke-blue-500 fill-none stroke-[2]">
          <path d="M 0 300 Q 300 350, 600 150 T 1200 50" />
          <path d="M 0 250 Q 400 100, 800 220 T 1200 120" stroke="#818CF8" strokeDasharray="6 6" />
        </svg>
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 04 — IMPACT"
          headline="Empirical Milestones Across Clinical & Commercial Discovery."
          subheading="Our AI platform consistently delivers validated predictive accuracy and accelerated development timelines."
        />

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => {
            const mapId =
              idx === 0
                ? "drug-discovery"
                : idx === 1
                ? "pillar-velocity"
                : idx === 2
                ? "protein-engine"
                : "clinical-accel";

            return (
              <RevealOnScroll key={stat.label} delay={idx * 100}>
                <div
                  onClick={() => onOpenDetail(mapId)}
                  className="bg-slate-950/80 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 flex flex-col justify-between h-full hover:border-blue-500/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] transition-all cursor-pointer group"
                >
                  <div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-blue-400 mb-3 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:scale-105 transition-transform">
                      <AnimatedCounter
                        target={stat.targetNumber}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        decimals={stat.decimals || 0}
                      />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {stat.label}
                    </h3>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-indigo-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      <span>EMPIRICALLY VALIDATED</span>
                    </div>
                    <span className="text-blue-400 group-hover:underline">SPECS →</span>
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


