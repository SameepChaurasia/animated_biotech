"use client";

import React, { useEffect, useState } from "react";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextDecode } from "@/components/ui/TextDecode";
import { MolecularCanvas } from "@/components/canvas/MolecularCanvas";
import { HERO_CONTENT } from "@/data/content";

export const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("main");
      if (!heroElement) return;

      const heroHeight = heroElement.clientHeight;
      const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="main"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-void"
    >
      {/* Dynamic Molecular Canvas Background */}
      <MolecularCanvas scrollProgress={scrollProgress} className="z-0 opacity-80" />

      {/* Radial Gradient Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-lime/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Column (Left ~60%) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Eyebrow label={HERO_CONTENT.eyebrow} className="mb-4" />

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08] mb-6">
              <TextDecode text={HERO_CONTENT.headline} delay={200} />
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8">
              {HERO_CONTENT.subheadline}
            </p>

            {/* CTA Action Row */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button href="#technology" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                {HERO_CONTENT.primaryCta}
              </Button>

              <MagneticButton>
                <Button href="#about" variant="ghost" size="lg" icon={<Play className="w-4 h-4 fill-current" />}>
                  {HERO_CONTENT.secondaryCta}
                </Button>
              </MagneticButton>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/80 w-full max-w-lg">
              {HERO_CONTENT.statsQuick.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-accent-lime">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-ink-muted uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side Accent Card (Right ~40%) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="glass-panel rounded-3xl p-8 border border-border relative overflow-hidden group hover:border-accent-lime/50 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-accent-lime uppercase tracking-widest">
                  // LIVE SEQUENCING SIMULATION
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-lime animate-ping" />
                  <span className="font-mono text-xs text-ink-muted">60 FPS</span>
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-ink-muted bg-surface-elevated/80 p-4 rounded-xl border border-border">
                <div className="text-accent-cyan">
                  &gt; INITIALIZING GENERATIVE TARGETING...
                </div>
                <div className="text-ink">
                  SEQUENCE: ATCG-8849-PX91-PROTEIN-V2
                </div>
                <div className="text-accent-lime">
                  AFFINITY: Kd = 0.38 nM [OPTIMAL]
                </div>
                <div className="text-ink-muted/80">
                  DOCKING ENERGY: -14.2 kcal/mol
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>MODEL: BIO-TRANSFORMER-XL</span>
                <span className="text-accent-lime font-bold">STATUS: ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Chevron */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-75">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-5 h-5 text-accent-lime animate-bounce" />
        </div>
      </Container>
    </section>
  );
};
