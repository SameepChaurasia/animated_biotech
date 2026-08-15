"use client";

import React from "react";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParticleBurstContainer } from "@/components/ui/ParticleBurst";
import { HeroPrecisionSlider } from "@/components/sections/HeroPrecisionSlider";
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
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-24 pb-2 md:pt-28 md:pb-3 overflow-hidden"
    >
      {/* Deep Piction Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <Container className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto">
          {/* Content Column (Left ~55%) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <Eyebrow label={HERO_CONTENT.eyebrow} className="mb-0 text-blue-400 font-semibold" />
              <span className="font-mono text-[10px] sm:text-[11px] text-indigo-300 bg-slate-900/90 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold shadow-md">
                BY SAMEEP CHAURASIA
              </span>
            </div>

            {/* DeepPiction Headline Style: Systemic Insights | Programmable Therapy */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-4 sm:mb-5">
              Systemic Insights <span className="text-slate-500 font-light mx-0.5">|</span> <span className="text-blue-400">Programmable Therapy</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-6 font-normal">
              {HERO_CONTENT.subheadline}
            </p>

            {/* CTA Action Row with Particle Burst */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <ParticleBurstContainer>
                <Button
                  onClick={onOpenPartner}
                  variant="primary"
                  size="md"
                  className="rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all border-none px-7 py-2.5 text-sm shadow-xl cursor-pointer"
                  icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                >
                  Partner with us
                </Button>
              </ParticleBurstContainer>

              <MagneticButton>
                <Button
                  onClick={onOpenMissionVideo}
                  variant="ghost"
                  size="md"
                  className="rounded-full border border-white/20 text-white hover:bg-white/10 px-5 py-2.5 text-sm font-semibold cursor-pointer"
                  icon={<Play className="w-3.5 h-3.5 fill-current text-blue-400" />}
                >
                  {HERO_CONTENT.secondaryCta}
                </Button>
              </MagneticButton>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-800/80 w-full max-w-md">
              {HERO_CONTENT.statsQuick.map((stat) => (
                <div
                  key={stat.label}
                  onClick={() => onOpenDetail("protein-engine")}
                  className="flex flex-col p-3 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group"
                >
                  <span className="font-sans text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Split-Comparison Precision Showcase (Right ~45%) */}
          <div className="lg:col-span-6">
            <HeroPrecisionSlider onOpenDetail={onOpenDetail} />
          </div>
        </div>

        {/* Scroll Indicator Chevron Link */}
        <div className="mt-2 mb-1 flex justify-center w-full">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex flex-col items-center gap-1 pointer-events-auto cursor-pointer transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400 font-bold group-hover:text-white transition-colors">
              Scroll To Explore
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-blue-400 group-hover:text-white animate-bounce transition-colors" />
          </a>
        </div>
      </Container>
    </section>
  );
};



