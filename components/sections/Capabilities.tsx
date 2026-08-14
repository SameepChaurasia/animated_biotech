"use client";

import React from "react";
import { Sparkles, Binary, Dna, Activity, FileCheck, Cpu, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CAPABILITIES } from "@/data/content";

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-blue-400" />,
  Binary: <Binary className="w-6 h-6 text-indigo-400" />,
  Dna: <Dna className="w-6 h-6 text-purple-400" />,
  Activity: <Activity className="w-6 h-6 text-blue-400" />,
  FileCheck: <FileCheck className="w-6 h-6 text-indigo-400" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-400" />,
};

interface CapabilitiesProps {
  onOpenDetail: (detailId: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenDetail }) => {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-hex-matrix relative overflow-hidden">
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
                <GlassCard
                  onClick={() => onOpenDetail(cap.id)}
                  className="h-full flex flex-col justify-between p-8 group border-slate-800 hover:border-blue-500/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all rounded-3xl cursor-pointer"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-all duration-300">
                        {ICON_MAP[cap.iconName]}
                      </div>

                      <span className="font-mono text-xs uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 font-semibold">
                        {cap.category}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-2xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {cap.title}
                    </h3>

                    <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                      {cap.description}
                    </p>
                  </div>

                  {/* Footer Metric highlight if available */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
                    {cap.highlightMetric ? (
                      <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        {cap.highlightMetric}
                      </span>
                    ) : (
                      <span className="text-slate-400/80 font-medium">READY FOR DEPLOYMENT</span>
                    )}

                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

