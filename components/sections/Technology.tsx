"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Dna, Atom, Sprout, ShieldCheck, Bot, Activity, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECH_PANELS } from "@/data/content";
import { soundManager } from "@/lib/audio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Dna: <Dna className="w-7 h-7 text-blue-400" />,
  Atom: <Atom className="w-7 h-7 text-indigo-400" />,
  Sprout: <Sprout className="w-7 h-7 text-purple-400" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-blue-400" />,
  Bot: <Bot className="w-7 h-7 text-cyan-400" />,
  Activity: <Activity className="w-7 h-7 text-teal-400" />,
};

interface TechnologyProps {
  onOpenDetail: (detailId: string) => void;
}

export const Technology: React.FC<TechnologyProps> = ({ onOpenDetail }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isMobile = useIsMobile(1024);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isMobile || isReducedMotion || !sectionRef.current || !triggerRef.current) {
        return;
      }

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
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: triggerRef, dependencies: [isMobile, isReducedMotion] }
  );

  const handleNavClick = (idx: number, panelId: string) => {
    soundManager.playClickSound();
    setActiveIndex(idx);

    if (!isMobile && !isReducedMotion) {
      const st = ScrollTrigger.getById("tech-scroll") || ScrollTrigger.getAll().find((s) => s.trigger === triggerRef.current);
      if (st) {
        const targetScroll = st.start + (idx / (TECH_PANELS.length - 1)) * (st.end - st.start) + 2;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
        return;
      }
    }

    const el = document.getElementById(isMobile ? `tech-panel-mobile-${panelId}` : `tech-panel-${panelId}`);
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
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-mono text-xs transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-extrabold shadow-[0_0_20px_rgba(34,211,238,0.55)] scale-105 border border-cyan-300/80"
                        : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_#38BDF8]" />
                    )}
                    <span className={`text-[10px] sm:text-[11px] ${isActive ? "text-cyan-200 font-bold" : "text-slate-400"}`}>
                      {panel.counter}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold">
                      {panel.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* Desktop Compact Centered Floating Deck (>=1024px) */}
      {!isMobile && !isReducedMotion ? (
        <div ref={triggerRef} className="overflow-hidden w-full flex items-center justify-start pt-2 pb-6">
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
      ) : (
        /* Mobile / Reduced Motion Vertical Stack Fallback (<1024px) */
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
      )}
    </section>
  );
};

