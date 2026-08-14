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
    <section id="cta" className="py-28 md:py-36 bg-transparent relative overflow-hidden">
      {/* Background Radial Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <Container className="relative z-10">
        <GlassCard className="p-10 md:p-16 max-w-4xl mx-auto text-center border-2 border-accent-cyan/40 bg-surface-elevated/90 cyan-glow-border shadow-[0_0_80px_rgba(0,229,255,0.18)]">
          <Eyebrow label={FINAL_CTA.eyebrow} className="mx-auto mb-4" />

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight mb-6">
            {FINAL_CTA.headline}
          </h2>

          <p className="font-sans text-base md:text-xl text-ink-muted leading-relaxed max-w-2xl mx-auto mb-10">
            {FINAL_CTA.subheadline}
          </p>

          {/* Interactive Email Form */}
          {submitted ? (
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-accent-cyan/15 border border-accent-cyan text-accent-cyan font-mono text-sm max-w-md mx-auto shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <CheckCircle2 className="w-5 h-5" />
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
                className="w-full px-6 py-4 rounded-full bg-surface border border-accent-cyan/30 text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/50 font-sans text-sm transition-all shadow-[inset_0_0_12px_rgba(0,229,255,0.08)]"
              />

              <MagneticButton>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto whitespace-nowrap"
                  icon={<Send className="w-4 h-4" />}
                >
                  {FINAL_CTA.ctaButton}
                </Button>
              </MagneticButton>
            </form>
          )}

          <div className="mt-8 font-mono text-xs text-accent-cyan/80 font-semibold">
            SOC 2 TYPE II CERTIFIED · HIPAA COMPLIANT DATA PIPELINES
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};

