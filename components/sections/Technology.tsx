"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { soundManager } from "@/lib/audio";
import {
  Dna,
  Zap,
  Activity,
  Layers,
  Search,
  Lock,
  CheckCircle2,
  Sliders,
  Cpu,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TECH_PANELS = [
  {
    id: "spatial-diffusion",
    counter: "01",
    subtitle: "3D GENERATIVE DIFFUSION",
    title: "Spatial Diffusion Transformer",
    description: "1.4B parameter structural diffusion network predicting 0.38Å crystal-resolution backbone alignments de novo.",
    tags: ["0.38Å RMSD", "1.4B Weights", "72h Lead Cycle"],
    iconName: "Dna",
    metrics: "72h Synthesis",
  },
  {
    id: "petabase-scale",
    counter: "02",
    subtitle: "DISTRIBUTED PETABASE INDEX",
    title: "Petabase Multi-Omics Pipeline",
    description: "Cloud infrastructure indexing 250M+ non-coding and coding sequence embeddings across 50,000 organism lineages.",
    tags: ["250M+ Genomes", "Sub-ms Query", "Vector Embeddings"],
    iconName: "Layers",
    metrics: "250M+ Sequences",
  },
  {
    id: "crispr-flux",
    counter: "03",
    subtitle: "METABOLIC PATHWAY COMPILER",
    title: "Closed-Loop CRISPR Flux Engine",
    description: "Automated guide RNA design paired with high-throughput acoustic droplet robotics delivering zero off-target edits.",
    tags: ["Zero Off-Target", "Acoustic Dispense", "100K Cells/hr"],
    iconName: "Zap",
    metrics: "99.8% On-Target",
  },
  {
    id: "bayesian-toxicology",
    counter: "04",
    subtitle: "IN SILICO PHARMACOKINETICS",
    title: "Bayesian Clinical Risk Engine",
    description: "Predictive neural ordinary differential equations (ODEs) modeling human organoid metabolic degradation.",
    tags: ["Organoid Validated", "94% Safety Hit", "Neural ODEs"],
    iconName: "Activity",
    metrics: "94% In Silico Safety",
  },
  {
    id: "epigenetic-compiler",
    counter: "05",
    subtitle: "CHROMATIN LANDSCAPE PREDICTOR",
    title: "Epigenetic State Simulator",
    description: "Simulating nucleosome positioning and histone modifications to forecast tissue-specific expression dynamics.",
    tags: ["Histone Profiling", "ATAC-seq Trained", "Single-Cell Res"],
    iconName: "Search",
    metrics: "96.4% Cell-Type Spec",
  },
  {
    id: "autonomous-wetlab",
    counter: "06",
    subtitle: "ROBOTIC VALIDATION FOUNDRY",
    title: "Closed-Loop Wet Lab Synthesis",
    description: "Physical acoustic dispensing robotics verifying digital constructs in 96-well and 384-well arrays 24/7.",
    tags: ["Acoustic Robotics", "384-Well Arrays", "Closed-Loop Loop"],
    iconName: "Cpu",
    metrics: "100K Wells / Day",
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  Dna: <Dna className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
};

interface TechnologyProps {
  onOpenDetail: (detailId: string) => void;
}

export const Technology: React.FC<TechnologyProps> = ({ onOpenDetail }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isReducedMotion || !sectionRef.current || !triggerRef.current) {
        return;
      }

      // Use ScrollTrigger MatchMedia to cleanly isolate >=1024px horizontal pin without React DOM unmount crashes
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".tech-panel-item");
        if (panels.length < 2) return;

        const getShift = () => {
          const first = panels[0];
          const last = panels[panels.length - 1];
          return last.offsetLeft - first.offsetLeft;
        };

        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            id: "tech-scroll",
            trigger: triggerRef.current,
            pin: true,
            start: "top 120px",
            scrub: 0.8,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0.3,
              ease: "power1.inOut",
            },
            end: () => `+=${getShift() + 100}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const floatIndex = progress * (panels.length - 1);
              const nearestIdx = Math.round(floatIndex);
              setActiveIndex(nearestIdx);

              panels.forEach((panel, i) => {
                const distance = Math.abs(floatIndex - i);
                const isCenter = distance < 0.45;

                const scale = isCenter ? 1.04 : 0.93;
                const opacity = isCenter ? 1.0 : 0.85;
                const yOffset = isCenter ? -8 : 6;

                gsap.to(panel, {
                  scale: scale,
                  opacity: opacity,
                  y: yOffset,
                  boxShadow: isCenter
                    ? "0 0 50px rgba(59, 130, 246, 0.5), 0 20px 45px rgba(0, 0, 0, 0.9)"
                    : "0 10px 25px rgba(0, 0, 0, 0.65)",
                  borderColor: isCenter ? "rgba(59, 130, 246, 0.9)" : "rgba(51, 65, 85, 0.8)",
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            },
          },
        });

        pinTimeline.to(sectionRef.current, {
          x: () => -getShift(),
          ease: "none",
        });

        return () => {
          pinTimeline.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: triggerRef, dependencies: [isReducedMotion] }
  );

  const handleNavClick = (idx: number, panelId: string) => {
    soundManager.playClickSound();
    setActiveIndex(idx);

    if (typeof window !== "undefined" && window.innerWidth >= 1024 && !isReducedMotion) {
      const st = ScrollTrigger.getById("tech-scroll");
      if (st) {
        const targetScroll = st.start + (idx / (TECH_PANELS.length - 1)) * (st.end - st.start) + 2;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
        return;
      }
    }

    const isMobileView = typeof window !== "undefined" && window.innerWidth < 1024;
    const el = document.getElementById(isMobileView ? `tech-panel-mobile-${panelId}` : `tech-panel-${panelId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="technology" className="pt-20 pb-16 md:pt-24 md:pb-20 bg-[#020617] relative overflow-hidden">
      {/* Deep Midnight Slate-950/Navy Base */}
      <div className="absolute inset-0 bg-[#020617] pointer-events-none z-0" />

      {/* Seamless Feathered Blueprint Schematic with Dark Blue Tone */}
      <div className="absolute inset-0 bg-blueprint-schematic opacity-80 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] pointer-events-none z-0" />

      {/* Top & Bottom Shadow Merging Transitions */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-10" />

      {/* Background Dark Blue Cybernetic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-700/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10 mb-6 md:mb-8">
        <SectionHeading
          eyebrow="// 02 — THE PLATFORM"
          headline="Six Bio-Compute Engines. One Unified Operating System."
          subheading="Our platform unifies 3D generative diffusion, petabase multi-omics, CRISPR metabolic flux, and Bayesian clinical simulation."
        />

        {/* Interactive 3D Cybernetic Engine Navigation Bar */}
        <div className="flex items-center justify-center mt-6">
          <div className="p-[1.5px] rounded-full bg-gradient-to-r from-blue-500/50 via-cyan-400/60 to-indigo-500/50 shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_25px_rgba(34,211,238,0.3)]">
            <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-slate-950/95 backdrop-blur-2xl">
              {TECH_PANELS.map((panel, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={panel.id}
                    onClick={() => handleNavClick(idx, panel.id)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-105"
                        : "text-slate-400 hover:text-white hover:bg-slate-900/80 font-medium"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-300 animate-pulse" : "bg-slate-600"}`} />
                    <span className="hidden sm:inline">{panel.counter}.</span>
                    <span>{panel.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* Desktop Horizontal Pinned Deck (>=1024px) */}
      <div ref={triggerRef} className="hidden lg:block overflow-hidden w-full pt-2 pb-6">
        <div
          ref={sectionRef}
          className="flex gap-6 items-center w-max"
          style={{
            paddingLeft: "calc(50vw - 195px)",
            paddingRight: "calc(50vw - 195px)",
          }}
        >
          {TECH_PANELS.map((panel, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={panel.id}
                id={`tech-panel-${panel.id}`}
                className={`tech-panel-item flex-shrink-0 w-[32vw] max-w-[390px] transition-all duration-300 rounded-[22px] overflow-hidden relative group p-[2px] ${
                  isActive
                    ? "bg-gradient-to-b from-blue-400 via-indigo-500 to-cyan-400 shadow-2xl shadow-blue-900/40"
                    : "bg-slate-800/80 hover:bg-slate-700/80"
                }`}
              >
                {/* Cybernetic Corner Crosshairs */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-blue-400/50 pointer-events-none z-20">+</div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-blue-400/50 pointer-events-none z-20">+</div>

                <GlassCard
                  onClick={() => onOpenDetail(panel.id)}
                  className="p-5 sm:p-6 h-full flex flex-col justify-between border-none transition-all rounded-[22px] cursor-pointer bg-slate-950/96 relative overflow-hidden"
                >
                  {/* Subtle Holographic Laser Scanline */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-12 w-full animate-scanline pointer-events-none" />
                  )}

                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-slate-800/90 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xl md:text-2xl font-black text-blue-400 bg-slate-900 px-2.5 py-0.5 rounded-lg border border-blue-500/30">
                        {panel.counter}
                      </span>
                      <span className="font-mono text-[10px] text-indigo-300 uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-900 border border-indigo-500/30 font-semibold truncate max-w-[170px]">
                        {panel.subtitle}
                      </span>
                    </div>
                    <div className={`p-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-600/20 border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)] text-blue-300 scale-110"
                        : "bg-slate-900 border border-slate-800 text-slate-400 group-hover:border-blue-500/40"
                    }`}>
                      {ICON_MAP[panel.iconName]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 mb-4 relative z-10">
                    <h3 className="font-sans text-lg md:text-xl font-extrabold text-white leading-snug group-hover:text-blue-400 transition-colors">
                      {panel.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {panel.description}
                    </p>
                  </div>

                  {/* Metrics & Tags */}
                  <div className="pt-3 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 font-mono text-xs relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {panel.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[10px] bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-400/40 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                      <span>{panel.metrics}</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / Tablet Vertical Stack Fallback (<1024px) */}
      <div className="block lg:hidden">
        <Container className="space-y-5">
          {TECH_PANELS.map((panel) => (
            <div key={panel.id} id={`tech-panel-mobile-${panel.id}`}>
              <GlassCard
                onClick={() => onOpenDetail(panel.id)}
                className="p-5 space-y-3.5 border-slate-800 rounded-2xl cursor-pointer group hover:border-blue-500/50 bg-slate-900/95"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="font-mono text-xl font-bold text-blue-400">
                    {panel.counter}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900 border border-blue-500/30">
                    {ICON_MAP[panel.iconName]}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-indigo-300 uppercase tracking-widest block mb-1">
                    // {panel.subtitle}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                    {panel.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    {panel.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-800 font-mono text-[10px]">
                  {panel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-blue-400 font-mono text-xs font-bold pt-1">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{panel.metrics}</span>
                  </div>
                  <span className="text-[11px]">EXPLORE SPECS →</span>
                </div>
              </GlassCard>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
};
