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
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-24 pb-2 md:pt-28 md:pb-4 overflow-x-clip bg-transparent"
    >
      {/* Top Radiant Pure White & Ice-Blue Horizon spanning left & right around header with smooth downward fade */}
      <div
        className="absolute top-0 inset-x-0 h-[480px] pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"
        style={{
          background:
            "radial-gradient(ellipse 130% 85% at 50% -20%, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.40) 25%, rgba(186, 230, 253, 0.22) 50%, rgba(37, 99, 235, 0.12) 75%, transparent 100%)",
        }}
      />

      {/* Local Ambient Glow Orbs with soft dissolution */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-blue-600/[0.18] rounded-full blur-[180px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" />

      {/* Atmospheric Soft Seamless Blend Layer Bridging Hero & Mission Sections */}
      <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent blur-3xl pointer-events-none z-0" />

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

            {/* Headline: Systemic Insights | Programmable Therapy */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-4 sm:mb-5">
              Systemic Insights <span className="text-slate-500 font-light mx-0.5">|</span>
              <br className="hidden sm:inline" />
              <span className="text-[#38BDF8] font-extrabold">Programmable Therapy</span>
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

        {/* Institutional Partner Brand Wall & Scroll Indicator */}
        <div className="mt-4 mb-2 flex flex-col items-center gap-4 w-full">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-65 hover:opacity-100 transition-opacity font-mono text-xs sm:text-sm tracking-widest font-black text-slate-300">
            <span>DENALI</span>
            <span>REGENERON</span>
            <span>BAVARIAN NORDIC</span>
            <span>GENENTECH</span>
          </div>

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
