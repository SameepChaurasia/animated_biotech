"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Dna, Atom, Sprout, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECH_PANELS } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Dna: <Dna className="w-8 h-8 text-blue-400" />,
  Atom: <Atom className="w-8 h-8 text-indigo-400" />,
  Sprout: <Sprout className="w-8 h-8 text-purple-400" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-blue-400" />,
};

interface TechnologyProps {
  onOpenDetail: (detailId: string) => void;
}

export const Technology: React.FC<TechnologyProps> = ({ onOpenDetail }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile(1024);
  const isReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isMobile || isReducedMotion || !sectionRef.current || !triggerRef.current) {
        return;
      }

      const panels = gsap.utils.toArray<HTMLElement>(".tech-panel-item");
      const totalWidth = (panels.length - 1) * 100;

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${sectionRef.current?.offsetWidth || 3000}`,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(panels, {
        xPercent: -totalWidth,
        ease: "none",
      });

      return () => {
        pinTimeline.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: triggerRef, dependencies: [isMobile, isReducedMotion] }
  );

  return (
    <section id="technology" className="py-24 md:py-32 bg-blueprint-schematic relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="// 02 — THE PLATFORM"
          headline="Four Core Engines. One Unified Bio-Operating System."
          subheading="Our platform integrates generative AI protein structure prediction, cloud sequencing analytics, and automated synthesis into a closed-loop platform."
        />
      </Container>

      {/* Desktop Horizontal Scroll-Jack Deck (>=1024px) */}
      {!isMobile && !isReducedMotion ? (
        <div ref={triggerRef} className="overflow-hidden w-full min-h-[70vh] flex items-center">
          <div ref={sectionRef} className="flex gap-8 px-12 w-full max-w-7xl mx-auto">
            {TECH_PANELS.map((panel) => (
              <div
                key={panel.id}
                className="tech-panel-item flex-shrink-0 w-[85vw] max-w-[960px]"
              >
                <GlassCard
                  onClick={() => onOpenDetail(panel.id)}
                  className="p-10 md:p-12 h-full flex flex-col justify-between border-2 border-blue-500/30 hover:border-blue-400 transition-all bg-slate-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-[32px] cursor-pointer group"
                >
                  {/* Panel Top Bar */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                    <span className="font-mono text-4xl md:text-5xl font-bold text-blue-400">
                      {panel.counter}
                    </span>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-blue-500/30 shadow-md group-hover:scale-110 group-hover:border-blue-400 transition-all">
                      {ICON_MAP[panel.iconName]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-8">
                    <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold flex items-center justify-between">
                      <span>// {panel.subtitle}</span>
                      <span className="text-blue-400 font-bold group-hover:underline">EXPLORE SPECS & RESEARCH →</span>
                    </span>
                    <h3 className="font-sans text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                      {panel.title}
                    </h3>
                    <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
                      {panel.description}
                    </p>
                  </div>

                  {/* Metrics & Tags */}
                  <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex flex-wrap gap-2">
                      {panel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-blue-500/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{panel.metrics}</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Mobile / Reduced Motion Vertical Stack Fallback (<1024px) */
        <Container className="space-y-8">
          {TECH_PANELS.map((panel) => (
            <GlassCard
              key={panel.id}
              onClick={() => onOpenDetail(panel.id)}
              className="p-8 space-y-6 border-slate-800 rounded-3xl cursor-pointer group hover:border-blue-500/50"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-mono text-3xl font-bold text-blue-400">
                  {panel.counter}
                </span>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-blue-500/30">
                  {ICON_MAP[panel.iconName]}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest block mb-1">
                  // {panel.subtitle}
                </span>
                <h3 className="font-sans text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {panel.title}
                </h3>
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {panel.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 font-mono text-xs">
                {panel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-blue-400 font-mono text-xs font-bold pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{panel.metrics}</span>
                </div>
                <span>EXPLORE SPECS →</span>
              </div>
            </GlassCard>
          ))}
        </Container>
      )}
    </section>
  );
};

