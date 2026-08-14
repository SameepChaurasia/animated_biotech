"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FINAL_CTA } from "@/data/content";

export const FinalCta: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-28 md:py-36 bg-vortex-glow relative overflow-hidden">
      {/* Background Radial Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <Container className="relative z-10">
        <GlassCard className="p-10 md:p-16 max-w-4xl mx-auto text-center border-2 border-blue-500/40 bg-slate-950/90 shadow-[0_25px_80px_rgba(0,0,0,0.8)] rounded-[36px]">
          <Eyebrow label={FINAL_CTA.eyebrow} className="mx-auto mb-4 text-blue-400 font-semibold" />

          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            {FINAL_CTA.headline}
          </h2>

          <p className="font-sans text-base md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            {FINAL_CTA.subheadline}
          </p>

          {/* Interactive Email Form */}
          {submitted ? (
            <div className="flex items-center justify-center gap-3 p-4 rounded-full bg-blue-600/20 border border-blue-500 text-blue-300 font-mono text-sm max-w-md mx-auto shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              <span>PARTNERSHIP REQUEST LOGGED. WE WILL BE IN TOUCH.</span>
            </div>
          ) : (
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
                  className="w-full sm:w-auto whitespace-nowrap rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 border-none px-6"
                  icon={<Send className="w-4 h-4 text-slate-950" />}
                >
                  {FINAL_CTA.ctaButton}
                </Button>
              </MagneticButton>
            </form>
          )}

          <div className="mt-8 font-mono text-xs text-blue-400/80 font-semibold">
            SOC 2 TYPE II CERTIFIED · HIPAA COMPLIANT DATA PIPELINES
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};


