"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FINAL_CTA } from "@/data/content";

interface FinalCtaProps {
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenPartner }) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenPartner();
  };

  return (
    <section id="cta" className="py-18 md:py-24 bg-transparent relative overflow-hidden">
      {/* Deep Obsidian Black Backdrop with Subtle White Matrix Texture */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-macro opacity-60 pointer-events-none z-0" />

      {/* Background White & Silver Radial Glow Flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.06] rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-300/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <GlassCard className="p-10 md:p-16 max-w-6xl mx-auto text-center border-2 border-blue-500/40 bg-slate-950/90 shadow-[0_25px_80px_rgba(0,0,0,0.8)] rounded-[36px]">
          <Eyebrow label={FINAL_CTA.eyebrow} className="mx-auto mb-4 text-blue-400 font-semibold" />

          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            {FINAL_CTA.headline}
          </h2>

          <p className="font-sans text-base md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
            {FINAL_CTA.subheadline}
          </p>

          {/* Interactive Email Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={FINAL_CTA.inputPlaceholder}
              className="w-full px-6 py-4 rounded-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 font-sans text-sm transition-all shadow-[inset_0_0_12px_rgba(0,0,0,0.5)]"
            />

            <MagneticButton>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto whitespace-nowrap rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 border-none px-6 cursor-pointer"
                icon={<Send className="w-4 h-4 text-slate-950" />}
              >
                {FINAL_CTA.ctaButton}
              </Button>
            </MagneticButton>
          </form>

          <div className="mt-8 font-mono text-xs text-blue-400/80 font-semibold">
            SOC 2 TYPE II CERTIFIED · HIPAA COMPLIANT DATA PIPELINES
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};


