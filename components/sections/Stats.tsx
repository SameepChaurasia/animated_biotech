"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { STATS } from "@/data/content";

export const Stats: React.FC = () => {
  return (
    <section id="impact" className="py-24 md:py-32 bg-surface-elevated relative border-t border-border overflow-hidden">
      {/* Decorative SVG Sparkline Data Curve */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 1200 400" className="w-full h-full stroke-accent-cyan fill-none stroke-[2]">
          <path d="M 0 300 Q 300 350, 600 150 T 1200 50" />
          <path d="M 0 250 Q 400 100, 800 220 T 1200 120" stroke="#C8FF4D" strokeDasharray="6 6" />
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
          {STATS.map((stat, idx) => (
            <RevealOnScroll key={stat.label} delay={idx * 100}>
              <div className="glass-panel p-8 rounded-2xl border border-border flex flex-col justify-between h-full hover:border-accent-lime/50 transition-colors">
                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-accent-lime mb-3 tracking-tight">
                    <AnimatedCounter
                      target={stat.targetNumber}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    {stat.label}
                  </h3>
                  <p className="font-sans text-xs text-ink-muted leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-[11px] font-mono text-accent-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  <span>EMPIRICALLY VALIDATED</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
};
