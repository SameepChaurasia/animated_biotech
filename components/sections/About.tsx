"use client";

import React, { useEffect, useRef } from "react";
import { Target, Zap, Layers, Award, MapPin, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { GlassCard } from "@/components/ui/GlassCard";
import { ABOUT_CONTENT } from "@/data/content";

const ICON_MAP: Record<string, React.ReactNode> = {
  Target: <Target className="w-5 h-5 text-accent-cyan" />,
  Zap: <Zap className="w-5 h-5 text-accent-cyan" />,
  Layers: <Layers className="w-5 h-5 text-accent-cyan" />,
};

export const About: React.FC = () => {
  const svgPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = svgPathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const handleScroll = () => {
      const rect = path.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
        path.style.strokeDashoffset = `${length * (1 - progress)}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <SectionHeading
          eyebrow={ABOUT_CONTENT.eyebrow}
          headline={ABOUT_CONTENT.headline}
          useDecode={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mission Text & Pillars (Left ~60%) */}
          <div className="lg:col-span-7 space-y-8">
            <RevealOnScroll direction="up" delay={100}>
              <div className="space-y-4 text-base md:text-lg text-ink-muted leading-relaxed font-sans">
                {ABOUT_CONTENT.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </RevealOnScroll>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {ABOUT_CONTENT.pillars.map((pillar, idx) => (
                <RevealOnScroll key={pillar.title} delay={200 + idx * 100}>
                  <GlassCard className="p-6 h-full flex flex-col justify-between hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-surface border border-accent-cyan/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                        {ICON_MAP[pillar.icon]}
                      </div>
                      <h3 className="font-display font-bold text-lg text-ink mb-2">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs text-ink-muted leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </GlassCard>
                </RevealOnScroll>
              ))}
            </div>

            {/* Quick Metadata Bar */}
            <RevealOnScroll delay={500}>
              <div className="flex flex-wrap items-center justify-between p-6 rounded-2xl bg-surface-elevated/90 border border-accent-cyan/30 gap-4 font-mono text-xs text-ink-muted shadow-[0_0_25px_rgba(0,229,255,0.1)]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-cyan" />
                  <span>{ABOUT_CONTENT.founded}</span>
                </div>
                <div className="h-4 w-[1px] bg-accent-cyan/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent-lime" />
                  <span>{ABOUT_CONTENT.location}</span>
                </div>
                <div className="h-4 w-[1px] bg-accent-cyan/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-emerald" />
                  <span>{ABOUT_CONTENT.scientists}</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Molecular Line-Art SVG Illustration (Right ~40%) */}
          <div className="lg:col-span-5">
            <RevealOnScroll direction="left" delay={300}>
              <GlassCard className="p-8 flex items-center justify-center relative min-h-[380px] bg-surface-elevated/80 border-accent-cyan/40">
                <div className="absolute top-4 left-4 font-mono text-[10px] text-accent-cyan uppercase tracking-widest">
                  // STRUCTURAL MODEL: 7K9L_BINDING
                </div>

                <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px]">
                  {/* Outer circle grid */}
                  <circle cx="200" cy="200" r="160" stroke="rgba(0,229,255,0.15)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="110" stroke="rgba(0,229,255,0.25)" strokeWidth="1" fill="none" />

                  {/* DrawSVG Self-drawing Molecular backbone path */}
                  <path
                    ref={svgPathRef}
                    d="M 80 200 C 120 120, 160 280, 200 200 C 240 120, 280 280, 320 200 M 120 160 L 160 240 M 240 160 L 280 240 M 200 120 L 200 280"
                    stroke="#00E5FF"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-100 ease-out"
                  />

                  {/* Nucleotide Nodes */}
                  <circle cx="80" cy="200" r="6" fill="#00E5FF" />
                  <circle cx="200" cy="200" r="8" fill="#C8FF4D" />
                  <circle cx="320" cy="200" r="6" fill="#00F5A0" />
                  <circle cx="160" cy="240" r="5" fill="#38BDF8" />
                  <circle cx="240" cy="160" r="5" fill="#00E5FF" />
                </svg>

                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-accent-cyan/80">
                  CONFIRMATION: 0.38Å RMSD
                </div>
              </GlassCard>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
};

