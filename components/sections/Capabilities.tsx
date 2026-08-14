"use client";

import React from "react";
import { Sparkles, Binary, Dna, Activity, FileCheck, Cpu, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CAPABILITIES } from "@/data/content";

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-accent-cyan" />,
  Binary: <Binary className="w-6 h-6 text-accent-lime" />,
  Dna: <Dna className="w-6 h-6 text-accent-emerald" />,
  Activity: <Activity className="w-6 h-6 text-accent-cyan" />,
  FileCheck: <FileCheck className="w-6 h-6 text-accent-lime" />,
  Cpu: <Cpu className="w-6 h-6 text-accent-cyan" />,
};

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-transparent relative">
      <Container>
        <SectionHeading
          eyebrow="// 03 — CAPABILITIES"
          headline="Full-Stack Synthetic Biology & High-Performance Bio-Compute."
          subheading="Our infrastructure spans in silico generative modeling, wet-lab robotic synthesis, and Bayesian clinical pipeline design."
        />

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const isLarge = cap.size === "large";

            return (
              <RevealOnScroll
                key={cap.id}
                delay={idx * 80}
                className={isLarge ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <GlassCard className="h-full flex flex-col justify-between p-8 group border-accent-cyan/25 hover:border-accent-cyan hover:shadow-[0_0_35px_rgba(0,229,255,0.2)] transition-all">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-surface border border-accent-cyan/30 flex items-center justify-center group-hover:border-accent-cyan group-hover:shadow-[0_0_18px_rgba(0,229,255,0.3)] group-hover:scale-110 transition-all duration-300">
                        {ICON_MAP[cap.iconName]}
                      </div>

                      <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan px-3 py-1 rounded-full bg-surface/90 border border-accent-cyan/30">
                        {cap.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-accent-cyan transition-colors">
                      {cap.title}
                    </h3>

                    <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed mb-6">
                      {cap.description}
                    </p>
                  </div>

                  {/* Footer Metric highlight if available */}
                  <div className="pt-4 border-t border-accent-cyan/20 flex items-center justify-between font-mono text-xs text-ink-muted">
                    {cap.highlightMetric ? (
                      <span className="text-accent-cyan font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        {cap.highlightMetric}
                      </span>
                    ) : (
                      <span className="text-ink-muted/80">READY FOR DEPLOYMENT</span>
                    )}

                    <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-accent-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </GlassCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

