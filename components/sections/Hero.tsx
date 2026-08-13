"use client";

import React, { useEffect, useState } from "react";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextDecode } from "@/components/ui/TextDecode";
import { ParticleBurstContainer } from "@/components/ui/ParticleBurst";
import { MolecularCanvas } from "@/components/canvas/MolecularCanvas";
import { ThreeProteinViewer } from "@/components/canvas/ThreeProteinViewer";
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
      <MolecularCanvas scrollProgress={scrollProgress} className="z-0 opacity-75" />

      {/* Radial Gradient Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-lime/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Column (Left ~55%) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <Eyebrow label={HERO_CONTENT.eyebrow} className="mb-0" />
              <span className="font-mono text-xs text-accent-cyan bg-surface-elevated border border-border px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                BY SAMEEP CHAURASIA
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08] mb-6">
              <TextDecode text={HERO_CONTENT.headline} delay={200} />
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8">
              {HERO_CONTENT.subheadline}
            </p>

            {/* CTA Action Row with Particle Burst */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <ParticleBurstContainer>
                <Button href="#playground" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Try Interactive Sandbox
                </Button>
              </ParticleBurstContainer>

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

          {/* 3D WebGL Three.js Interactive Molecule Viewer (Right ~45%) */}
          <div className="lg:col-span-6">
            <ThreeProteinViewer />
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
