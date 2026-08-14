"use client";

import React from "react";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParticleBurstContainer } from "@/components/ui/ParticleBurst";
import { ThreeProteinViewer } from "@/components/canvas/ThreeProteinViewer";
import { HERO_CONTENT } from "@/data/content";

interface HeroProps {
  onOpenPartner: () => void;
  onOpenMissionVideo: () => void;
  onOpenDetail: (detailId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPartner, onOpenMissionVideo, onOpenDetail }) => {
  return (
    <section
      id="main"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-perspective-grid"
    >
      {/* Deep Piction Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Column (Left ~55%) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <Eyebrow label={HERO_CONTENT.eyebrow} className="mb-0 text-blue-400 font-semibold" />
              <span className="font-mono text-[11px] text-indigo-300 bg-slate-900/90 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold shadow-md">
                BY SAMEEP CHAURASIA
              </span>
            </div>

            {/* DeepPiction Headline Style: Systemic Insights | Programmable Therapy */}
            <h1 className="font-sans text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Systemic Insights <span className="text-slate-500 font-light mx-1">|</span> <span className="text-blue-400">Programmable Therapy</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {HERO_CONTENT.subheadline}
            </p>

            {/* CTA Action Row with Particle Burst */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <ParticleBurstContainer>
                <Button
                  onClick={onOpenPartner}
                  variant="primary"
                  size="lg"
                  className="rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all border-none px-8 shadow-xl cursor-pointer"
                  icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                >
                  Partner with us
                </Button>
              </ParticleBurstContainer>

              <MagneticButton>
                <Button
                  onClick={onOpenMissionVideo}
                  variant="ghost"
                  size="lg"
                  className="rounded-full border border-white/20 text-white hover:bg-white/10 px-6 font-semibold cursor-pointer"
                  icon={<Play className="w-4 h-4 fill-current text-blue-400" />}
                >
                  {HERO_CONTENT.secondaryCta}
                </Button>
              </MagneticButton>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-lg">
              {HERO_CONTENT.statsQuick.map((stat) => (
                <div
                  key={stat.label}
                  onClick={() => onOpenDetail("protein-engine")}
                  className="flex flex-col p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group"
                >
                  <span className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">
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

        {/* Scroll Indicator Chevron Link */}
        <div className="mt-12 md:mt-16 flex justify-center w-full">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex flex-col items-center gap-2 pointer-events-auto cursor-pointer transition-colors"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-400 font-bold group-hover:text-white transition-colors">
              SEE HOW IT WORKS
            </span>
            <ChevronDown className="w-5 h-5 text-blue-400 group-hover:text-white animate-bounce transition-colors" />
          </a>
        </div>
      </Container>
    </section>
  );
};



