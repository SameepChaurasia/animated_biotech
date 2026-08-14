"use client";

import React, { useState } from "react";
import { Dna, RefreshCw, Zap, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { soundManager } from "@/lib/audio";

const PRESETS = [
  { label: "Oncology Lead (ATCG-8849)", sequence: "ATCGATCGGCTATACGCG" },
  { label: "Gene Edit Construct (CRISPR-V2)", sequence: "GCTAGCTAGCTAGCTA" },
  { label: "Enzyme Pathway (MET-9902)", sequence: "TACGATCGTACGATCG" },
];

const CODON_MAP: Record<string, string> = {
  ATC: "Isoleucine (Ile)",
  GAT: "Aspartate (Asp)",
  CGG: "Arginine (Arg)",
  CTA: "Leucine (Leu)",
  TAC: "Tyrosine (Tyr)",
  GCG: "Alanine (Ala)",
  GCT: "Alanine (Ala)",
  AGC: "Serine (Ser)",
  TTA: "Leucine (Leu)",
};

export const GenePlayground: React.FC = () => {
  const [sequence, setSequence] = useState<string>("ATCGATCGGCTATACGCG");

  const appendBase = (base: string) => {
    soundManager.playClickSound();
    if (sequence.length < 24) {
      setSequence((prev) => prev + base);
    }
  };

  const clearSequence = () => {
    soundManager.playClickSound();
    setSequence("");
  };

  // Group into codons (3 letters)
  const codons: string[] = [];
  for (let i = 0; i < sequence.length; i += 3) {
    if (i + 3 <= sequence.length) {
      codons.push(sequence.substring(i, i + 3));
    }
  }

  // Calculate dynamic bio metrics based on length and GC content
  const gcCount = (sequence.match(/[GC]/g) || []).length;
  const gcContent = sequence.length > 0 ? Math.round((gcCount / sequence.length) * 100) : 0;
  const affinityKd = (0.2 + (100 - gcContent) * 0.005).toFixed(2);
  const safetyScore = (92 + (gcCount % 7)).toFixed(1);

  return (
    <section id="playground" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <Container>
        <SectionHeading
          eyebrow="// 05 — INTERACTIVE SANDBOX"
          headline="Genetic Sequence Translation Engine."
          subheading="Test synthetic biology sequence constructs in real time. Input nucleotide base pairs to observe codon translation and binding kinetics."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left ~50%) */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard className="p-8 space-y-6 bg-surface-elevated/90 border-2 border-accent-cyan/30 shadow-[0_0_35px_rgba(0,229,255,0.12)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent-cyan font-bold uppercase tracking-widest flex items-center gap-2">
                  <Dna className="w-4 h-4" />
                  // SYNTHETIC DNA INPUT BUFFER
                </span>
                <button
                  onClick={clearSequence}
                  className="font-mono text-xs text-ink-muted hover:text-accent-pink flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  CLEAR
                </button>
              </div>

              {/* Display Box */}
              <div className="p-4 rounded-xl bg-void border border-accent-cyan/40 font-mono text-xl sm:text-2xl text-accent-cyan tracking-widest break-all min-h-[64px] flex items-center justify-between shadow-[inset_0_0_15px_rgba(0,229,255,0.1)]">
                <span>{sequence || <span className="text-ink-muted/40 text-base font-sans">CLICK BASES TO BUILD SEQUENCE...</span>}</span>
                <span className="w-2.5 h-6 bg-accent-cyan animate-pulse ml-2" />
              </div>

              {/* Nucleotide Buttons */}
              <div>
                <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-3">
                  ADD BASE PAIR:
                </span>
                <div className="grid grid-cols-4 gap-3 font-mono font-bold text-lg">
                  {["A", "T", "C", "G"].map((base) => (
                    <button
                      key={base}
                      onClick={() => appendBase(base)}
                      className="py-3 rounded-xl bg-surface border border-accent-cyan/30 text-ink hover:border-accent-cyan hover:text-accent-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                    >
                      {base}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div className="pt-4 border-t border-accent-cyan/20">
                <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-3">
                  PRE-CONFIGURED BENCHMARK SEQUENCES:
                </span>
                <div className="flex flex-col gap-2 font-mono text-xs">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        soundManager.playClickSound();
                        setSequence(p.sequence);
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                        sequence === p.sequence
                          ? "bg-accent-cyan/15 border-accent-cyan text-accent-cyan font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                          : "bg-surface/60 border-accent-cyan/20 text-ink-muted hover:text-ink hover:border-accent-cyan/40"
                      }`}
                    >
                      <span>{p.label}</span>
                      {sequence === p.sequence && <Check className="w-4 h-4 text-accent-cyan" />}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Results Output Column (Right ~50%) */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard className="p-8 space-y-6 bg-surface-elevated/90 border-accent-cyan/30 shadow-[0_0_35px_rgba(0,229,255,0.12)]">
              <span className="font-mono text-xs text-accent-cyan font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" />
                // TRANSLATED AMINO ACID CODONS
              </span>

              {/* Codon translation grid */}
              <div className="space-y-3">
                {codons.length > 0 ? (
                  codons.map((codon, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface border border-accent-cyan/25 font-mono text-xs hover:border-accent-cyan transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-accent-cyan font-bold px-2 py-0.5 rounded bg-void border border-accent-cyan/30">
                          CODON {idx + 1}: {codon}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-accent-cyan" />
                      </div>
                      <span className="text-ink font-semibold">
                        {CODON_MAP[codon] || "Peptide Chain Link"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 font-mono text-xs text-ink-muted">
                    NO COMPLETE CODONS. ADD AT LEAST 3 BASES.
                  </div>
                )}
              </div>

              {/* Real-time Bio Kinetics Data */}
              <div className="pt-6 border-t border-accent-cyan/20 grid grid-cols-3 gap-4 font-mono text-center">
                <div className="p-3 rounded-xl bg-surface border border-accent-cyan/25 shadow-[0_0_12px_rgba(0,229,255,0.08)]">
                  <span className="text-[10px] text-ink-muted uppercase block mb-1">GC CONTENT</span>
                  <span className="text-xl font-bold text-accent-cyan">{gcContent}%</span>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-accent-cyan/25 shadow-[0_0_12px_rgba(0,229,255,0.08)]">
                  <span className="text-[10px] text-ink-muted uppercase block mb-1">AFFINITY (Kd)</span>
                  <span className="text-xl font-bold text-accent-lime">{affinityKd} nM</span>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-accent-cyan/25 shadow-[0_0_12px_rgba(0,229,255,0.08)]">
                  <span className="text-[10px] text-ink-muted uppercase block mb-1">SAFETY SCORE</span>
                  <span className="text-xl font-bold text-accent-emerald">{safetyScore}%</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
};

