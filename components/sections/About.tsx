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
    tag: "ARCHITECTURE",
    title: "Precision Engineering",
    description: "Model-guided target selection and atomic-resolution ligand binding optimization.",
    icon: <Target className="w-5 h-5 text-blue-400" />,
    badge: "0.38Å RMSD",
    gradient: "from-blue-500/20 to-cyan-500/20",
    floatClass: "animate-float-1",
  },
  {
    id: "pillar-velocity",
    number: "02",
    tag: "SIMULATION",
    title: "Algorithmic Velocity",
    description: "Parallelized cloud bio-simulation reducing multi-year discovery pipelines into weeks.",
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
    badge: "72h Lead Cycle",
    gradient: "from-indigo-500/20 to-blue-500/20",
    floatClass: "animate-float-2",
  },
  {
    id: "pillar-scale",
    number: "03",
    tag: "COMPUTATION",
    title: "Petabase Scale",
    description: "Cloud-native compute pipelines processing petabytes of spatial multi-omics data.",
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    badge: "250M+ Sequences",
    gradient: "from-purple-500/20 to-indigo-500/20",
    floatClass: "animate-float-3",
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
    <section id="about" className="py-14 md:py-20 bg-transparent relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[170px] pointer-events-none" />

      <Container>
        <SectionHeading
          eyebrow="// 01 — THE MISSION"
          headline="Synthetic Biology Is No Longer An Art. It Is A Computation."
          subheading="Traditional drug discovery relies on serendipitous screening across billions of molecules. We treat biology as a deterministic compiler — turning genetic blueprints into executable code."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          {/* Three Floating Pillar Cards (Left ~60%) */}
          <div className="lg:col-span-7 space-y-6">
            <RevealOnScroll direction="up" delay={80}>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                By fusing deep transformer generative models trained on over 250M curated genomic sequences with closed-loop robotic wet labs, we predict molecular dynamics and toxicological profiles before a single pipette touches a test tube.
              </p>
            </RevealOnScroll>

            {/* Three Floating Cyber Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {PILLARS.map((pillar, idx) => (
                <RevealOnScroll key={pillar.id} delay={120 + idx * 80}>
                  <div
                    onClick={() => {
                      soundManager.playClickSound();
                      onOpenDetail(pillar.id);
                    }}
                    className={`${pillar.floatClass} group relative p-[1px] rounded-2xl bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 hover:from-blue-400 hover:via-indigo-500 hover:to-cyan-400 transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(59,130,246,0.3)] hover:-translate-y-2 cursor-pointer h-full`}
                  >
                    {/* Corner Crosshairs */}
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-blue-400/40 pointer-events-none">+</div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-400/40 pointer-events-none">+</div>

                    <div className="p-4 sm:p-4.5 h-full flex flex-col justify-between rounded-[15px] bg-slate-950/95 backdrop-blur-xl">
                      <div>
                        {/* Top Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-blue-500/30 flex items-center justify-center shadow-md group-hover:border-blue-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
                            {pillar.icon}
                          </div>
                          <span className="font-mono text-[10px] font-bold text-blue-400/80 px-2 py-0.5 rounded-full bg-slate-900 border border-blue-500/20">
                            {pillar.badge}
                          </span>
                        </div>

                        <h3 className="font-sans font-bold text-base text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                          {pillar.title}
                        </h3>

                        <p className="font-sans text-xs text-slate-400 leading-relaxed mb-3">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-850 flex items-center justify-between font-mono text-[10px] text-blue-400 font-semibold">
                        <span>EXPLORE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Interactive 3D Holographic Chamber Box (Right ~40%) */}
          <div className="lg:col-span-5">
            <RevealOnScroll direction="left" delay={200}>
              <div
                style={{ perspective: "1000px" }}
                className="w-full"
              >
                <div
                  ref={box3dRef}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                    transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                    transformStyle: "preserve-3d",
                  }}
                  className="relative min-h-[380px] sm:min-h-[400px] w-full rounded-3xl p-[2px] bg-gradient-to-br from-blue-500/50 via-indigo-600/30 to-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.25)] group cursor-crosshair overflow-hidden"
                >
                  {/* Holographic Laser Scanline */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-16 w-full animate-scanline pointer-events-none z-20" />

                  {/* Chamber Body */}
                  <div className="w-full h-full min-h-[380px] sm:min-h-[400px] rounded-[22px] bg-slate-950/95 p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl">
                    {/* Top Cybernetic Status Bar */}
                    <div className="flex items-center justify-between font-mono text-[10px] relative z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-bold">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        LIVE 3D DIFFUSION
                      </div>
                      <span className="text-slate-400 font-medium tracking-wider">
                        // 7K9L_BINDING
                      </span>
                    </div>

                    {/* Central 3D Gyroscope & Molecular Orbital Canvas */}
                    <div className="relative w-full h-52 flex items-center justify-center my-auto">
                      {/* Ambient Central Volumetric Glow */}
                      <div className="absolute w-36 h-36 rounded-full bg-blue-500/20 blur-3xl animate-pulse-glow pointer-events-none" />

                      {/* 3D Rotating Outer Ring (X-Axis) */}
                      <div
                        className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-400/50 animate-rotate-ring-1 flex items-center justify-center"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] absolute -top-1" />
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3B82F6] absolute -bottom-1" />
                      </div>

                      {/* 3D Rotating Inner Ring (Y-Axis) */}
                      <div
                        className="absolute w-36 h-36 rounded-full border border-indigo-400/60 animate-rotate-ring-2 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818CF8] absolute -left-1" />
                        <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#C084FC] absolute -right-1" />
                      </div>

                      {/* Central Glowing Core Sphere */}
                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.7)] flex items-center justify-center border-2 border-white/40 animate-pulse">
                          <Sparkles className="w-6 h-6 text-white animate-spin" style={{ animationDuration: "12s" }} />
                        </div>
                      </div>

                      {/* Cybernetic Coordinate Overlay Lines */}
                      <div className="absolute inset-x-8 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-y-8 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Live Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 font-mono text-[10px] relative z-10">
                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                        <span className="text-slate-400 block text-[9px]">RESOLUTION</span>
                        <span className="text-cyan-400 font-extrabold text-xs">0.38Å RMSD</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                        <span className="text-slate-400 block text-[9px]">BINDING ENERGY</span>
                        <span className="text-indigo-400 font-extrabold text-xs">-14.2 kcal/mol</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Authentic Bio-Compute Architecture Capabilities Ribbon */}
        <RevealOnScroll delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
            {BIO_METRICS.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  {metric.icon}
                </div>
                <div>
                  <div className="font-sans font-extrabold text-white text-xs sm:text-sm">{metric.value}</div>
                  <div className="font-mono text-[10px] text-slate-400">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
};


