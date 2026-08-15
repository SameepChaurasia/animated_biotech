"use client";

import React, { useState, useRef } from "react";
import { Target, Zap, Layers, Sparkles, Activity, ShieldCheck, ArrowUpRight, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { GlassCard } from "@/components/ui/GlassCard";
import { soundManager } from "@/lib/audio";

const PILLARS = [
  {
    id: "pillar-precision",
    number: "01",
    tag: "ENGINE.01",
    title: "Precision Engineering",
    description: "Atomic-resolution ligand binding & sub-angstrom structural target optimization.",
    icon: <Target className="w-4 h-4 text-cyan-400" />,
    badge: "0.38Å RMSD",
    ringColor: "border-cyan-400/50",
    satelliteColor: "bg-cyan-400 shadow-[0_0_10px_#38BDF8]",
    floatClass: "animate-float-1",
    borderRest: "from-cyan-500/50 via-blue-600/40 to-teal-400/50",
    borderHover: "group-hover:from-cyan-400 group-hover:via-sky-400 group-hover:to-blue-400",
    cornerColor: "border-cyan-400 text-cyan-400 group-hover:border-cyan-300",
    glowShadow: "shadow-[0_16px_36px_-8px_rgba(0,0,0,0.95),0_0_20px_rgba(34,211,238,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_40px_rgba(34,211,238,0.45)]",
    dotGlow: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    specular: "from-transparent via-cyan-400/90 to-transparent",
  },
  {
    id: "pillar-velocity",
    number: "02",
    tag: "SIMULATION.02",
    title: "Algorithmic Velocity",
    description: "Massively parallel cloud bio-simulation reducing multi-year pipelines to 72 hours.",
    icon: <Zap className="w-4 h-4 text-amber-400" />,
    badge: "72h Lead Cycle",
    ringColor: "border-amber-400/50",
    satelliteColor: "bg-amber-400 shadow-[0_0_10px_#F59E0B]",
    floatClass: "animate-float-2",
    borderRest: "from-amber-500/50 via-orange-600/40 to-rose-500/50",
    borderHover: "group-hover:from-amber-400 group-hover:via-orange-400 group-hover:to-rose-400",
    cornerColor: "border-amber-400 text-amber-400 group-hover:border-amber-300",
    glowShadow: "shadow-[0_16px_36px_-8px_rgba(0,0,0,0.95),0_0_20px_rgba(245,158,11,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_40px_rgba(245,158,11,0.45)]",
    dotGlow: "bg-amber-400 shadow-[0_0_8px_#f59e0b]",
    specular: "from-transparent via-amber-400/90 to-transparent",
  },
  {
    id: "pillar-scale",
    number: "03",
    tag: "DATABASE.03",
    title: "Petabase Scale",
    description: "Distributed infrastructure indexing petabytes of spatial multi-omics sequence data.",
    icon: <Layers className="w-4 h-4 text-purple-400" />,
    badge: "250M+ Genomes",
    ringColor: "border-purple-400/50",
    satelliteColor: "bg-purple-400 shadow-[0_0_10px_#C084FC]",
    floatClass: "animate-float-3",
    borderRest: "from-purple-500/50 via-fuchsia-600/40 to-indigo-500/50",
    borderHover: "group-hover:from-purple-400 group-hover:via-fuchsia-400 group-hover:to-indigo-400",
    cornerColor: "border-purple-400 text-purple-400 group-hover:border-purple-300",
    glowShadow: "shadow-[0_16px_36px_-8px_rgba(0,0,0,0.95),0_0_20px_rgba(168,85,247,0.18)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.98),0_0_40px_rgba(168,85,247,0.45)]",
    dotGlow: "bg-purple-400 shadow-[0_0_8px_#a855f7]",
    specular: "from-transparent via-purple-400/90 to-transparent",
  },
];

const BIO_METRICS = [
  { label: "Training Corpus", value: "250M+ Sequences", icon: <Cpu className="w-4 h-4 text-blue-400" /> },
  { label: "De Novo Lead Cycle", value: "72-Hour Turnaround", icon: <Zap className="w-4 h-4 text-cyan-400" /> },
  { label: "Structural Alignment", value: "0.38Å Sub-Angstrom", icon: <Target className="w-4 h-4 text-indigo-400" /> },
  { label: "Robotic Throughput", value: "100K Cells / Hour", icon: <Activity className="w-4 h-4 text-teal-400" /> },
];

interface AboutProps {
  onOpenDetail: (detailId: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenDetail }) => {
  const box3dRef = useRef<HTMLDivElement | null>(null);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!box3dRef.current) return;
    const rect = box3dRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const calculatedRotX = ((y - centerY) / centerY) * -12;
    const calculatedRotY = ((x - centerX) / centerX) * 14;

    setRotX(calculatedRotX);
    setRotY(calculatedRotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <section id="about" className="pt-6 pb-14 md:pt-10 md:pb-20 bg-transparent relative overflow-x-clip">
      {/* Ambient background glow seamlessly fading in */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 01 — MISSION & CONVERGENCE"
          headline="Bridging Generative In Silico Models and High-Throughput Wet Labs."
          subheading="Codex Bio creates autonomous closed-loop discovery engines that iterate from synthetic gene candidate to validated protein crystal in hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          {/* Three Floating Pillar Cards (Left ~60%) */}
          <div className="lg:col-span-7 space-y-6">
            <RevealOnScroll direction="up" delay={80}>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                By fusing deep transformer generative models trained on over 250M curated genomic sequences with closed-loop robotic wet labs, we predict molecular dynamics and toxicological profiles before a single pipette touches a test tube.
              </p>
            </RevealOnScroll>

            {/* Three Compact Square Cyber-Orbit Modules with Creative HUD Borders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1" style={{ perspective: "1000px" }}>
              {PILLARS.map((pillar, idx) => (
                <RevealOnScroll key={pillar.id} delay={120 + idx * 80}>
                  <div
                    onClick={() => {
                      soundManager.playClickSound();
                      onOpenDetail(pillar.id);
                    }}
                    className={`${pillar.floatClass} group relative p-[1.5px] rounded-2xl bg-gradient-to-br ${pillar.borderRest} ${pillar.borderHover} animate-border-flow transition-all duration-500 ${pillar.glowShadow} hover:-translate-y-2.5 hover:scale-[1.02] cursor-pointer h-full`}
                  >
                    {/* Top Specular Rim */}
                    <div className={`absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r ${pillar.specular} rounded-full z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />

                    {/* Top-Edge Tech Code Notch */}
                    <div className="absolute -top-[1px] right-4 px-2 py-0.5 rounded-b-md bg-slate-950 border-x border-b border-slate-700/60 group-hover:border-cyan-400/50 font-mono text-[7px] tracking-wider text-slate-400 group-hover:text-cyan-300 transition-colors z-20 pointer-events-none shadow-sm flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                      <span>{pillar.tag}</span>
                    </div>

                    {/* Sci-Fi HUD Corner Brackets */}
                    <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm ${pillar.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-3.5 group-hover:h-3.5`} />
                    <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm ${pillar.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-3.5 group-hover:h-3.5 flex items-start justify-end p-0.5`}>
                      <div className={`w-1 h-1 rounded-full ${pillar.dotGlow} animate-pulse`} />
                    </div>
                    <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm ${pillar.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-3.5 group-hover:h-3.5`} />
                    <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 rounded-br-sm ${pillar.cornerColor} transition-all duration-300 pointer-events-none z-20 group-hover:w-3.5 group-hover:h-3.5`} />

                    {/* Subtle Holographic Laser Scanline on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-12 w-full animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* 3D Interior Slab */}
                    <div className="p-4 sm:p-4.5 h-full flex flex-col justify-between rounded-[14.5px] bg-slate-950/96 border border-slate-800/80 group-hover:border-slate-700/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-0 transition-colors">
                      <div>
                        {/* Top Revolving Gyroscope Icon & Badge */}
                        <div className="flex items-center justify-between mb-3">
                          {/* Revolving Orbital Chamber */}
                          <div className="relative w-10 h-10 flex items-center justify-center">
                            {/* Revolving 3D Outer Ring with Satellite */}
                            <div
                              className={`absolute inset-0 rounded-full border border-dashed ${pillar.ringColor} animate-rotate-ring-1 flex items-center justify-center`}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              <div className={`w-2 h-2 rounded-full ${pillar.satelliteColor} absolute -top-0.5`} />
                            </div>

                            {/* Inner Glass Icon Vault */}
                            <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                              {pillar.icon}
                            </div>
                          </div>

                          {/* Node Step Tag */}
                          <span className="font-mono text-[9px] font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 shadow-sm">
                            {pillar.badge}
                          </span>
                        </div>

                        {/* Title with Futuristic Highlight */}
                        <h3 className="font-display text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                          <span>{pillar.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </h3>

                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Bottom Key Metric Indicator */}
                      <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          Target Spec
                        </span>
                        <span className="font-mono text-[11px] font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                          {pillar.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Interactive 3D Holographic Molecular Gyroscope Showcase (Right ~40%) */}
          <div className="lg:col-span-5 flex justify-center">
            <RevealOnScroll direction="left" delay={200}>
              <div
                ref={box3dRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  soundManager.playClickSound();
                  onOpenDetail("live-diffusion");
                }}
                className="relative w-[320px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-3xl p-1 bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer group"
                style={{
                  perspective: "1000px",
                }}
              >
                {/* 3D Tilting Core Container */}
                <div
                  className="w-full h-full rounded-[22px] bg-slate-950/90 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between transition-transform duration-200 ease-out"
                  style={{
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Top HUD Row */}
                  <div className="flex items-center justify-between z-10">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] tracking-wider uppercase font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      LIVE 3D DIFFUSION
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      // 7K9L_BINDING
                    </span>
                  </div>

                  {/* Central Gyroscopic Rings with Orbiting Quantum Particles */}
                  <div className="relative w-44 h-44 mx-auto my-auto flex items-center justify-center">
                    {/* Ring 1 - Fast Horizontal Axis */}
                    <div
                      className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-rotate-ring-1"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] absolute top-1 left-8" />
                    </div>

                    {/* Ring 2 - Counter-Spinning Vertical Axis */}
                    <div
                      className="absolute inset-3 rounded-full border-2 border-indigo-400/40 border-t-purple-400 animate-rotate-ring-2"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#C084FC] absolute bottom-1 right-8" />
                    </div>

                    {/* Ring 3 - Deep Oblique Axis */}
                    <div
                      className="absolute inset-6 rounded-full border border-blue-400/30 animate-rotate-ring-3"
                      style={{ transformStyle: "preserve-3d" }}
                    />

                    {/* Central Glowing Fusion Core */}
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-[0_0_35px_rgba(56,189,248,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Interactive Prompt */}
                  <div className="flex items-center justify-between text-xs z-10 pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400 font-mono text-[10px]">
                      {isHovered ? "ROTATING 3D MODEL" : "DRAG / HOVER TO ROTATE"}
                    </span>
                    <span className="text-cyan-400 font-mono text-[10px] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      EXPAND VIEW <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Four Bottom Quick Bio-Telemetry Metrics */}
        <RevealOnScroll direction="up" delay={260}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 border-t border-slate-800/60">
            {BIO_METRICS.map((metric) => (
              <div
                key={metric.label}
                onClick={() => {
                  soundManager.playClickSound();
                  onOpenDetail("protein-engine");
                }}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
                  {metric.icon}
                </div>
                <div>
                  <div className="font-sans text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {metric.value}
                  </div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
};
