"use client";

import React, { useState } from "react";
import { Dna, RefreshCw, Zap, Check, ArrowRight, Scissors, RotateCw, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { soundManager } from "@/lib/audio";

const PRESETS = [
  { label: "Oncology Lead (ATCG-8849)", sequence: "ATCGATCGGCTATACGCG" },
  { label: "Gene Edit Construct (CRISPR-V2)", sequence: "GCTAGCTAGCTAGCTA" },
  { label: "Enzyme Pathway (MET-9902)", sequence: "TACGATCGTACGATCG" },
  { label: "Synthetic Promoter (SYN-770)", sequence: "ATGACCATGACGATCG" },
];

const CODON_MAP: Record<string, { amino: string; code: string; type: string }> = {
  // Start Codon / Methionine
  ATG: { amino: "Methionine", code: "Met", type: "Start Codon" },
  // Hydrophobic / Nonpolar
  ATC: { amino: "Isoleucine", code: "Ile", type: "Hydrophobic" },
  ATT: { amino: "Isoleucine", code: "Ile", type: "Hydrophobic" },
  ATA: { amino: "Isoleucine", code: "Ile", type: "Hydrophobic" },
  CTA: { amino: "Leucine", code: "Leu", type: "Hydrophobic" },
  CTC: { amino: "Leucine", code: "Leu", type: "Hydrophobic" },
  CTG: { amino: "Leucine", code: "Leu", type: "Hydrophobic" },
  CTT: { amino: "Leucine", code: "Leu", type: "Hydrophobic" },
  TTA: { amino: "Leucine", code: "Leu", type: "Hydrophobic" },
  TTG: { amino: "Leucine", code: "Leu", type: "Hydrophobic" },
  GTT: { amino: "Valine", code: "Val", type: "Hydrophobic" },
  GTC: { amino: "Valine", code: "Val", type: "Hydrophobic" },
  GTA: { amino: "Valine", code: "Val", type: "Hydrophobic" },
  GTG: { amino: "Valine", code: "Val", type: "Hydrophobic" },
  // Charged Amino Acids
  GAT: { amino: "Aspartate", code: "Asp", type: "Acidic (-)" },
  GAC: { amino: "Aspartate", code: "Asp", type: "Acidic (-)" },
  GAA: { amino: "Glutamate", code: "Glu", type: "Acidic (-)" },
  GAG: { amino: "Glutamate", code: "Glu", type: "Acidic (-)" },
  CGG: { amino: "Arginine", code: "Arg", type: "Basic (+)" },
  CGA: { amino: "Arginine", code: "Arg", type: "Basic (+)" },
  CGC: { amino: "Arginine", code: "Arg", type: "Basic (+)" },
  CGT: { amino: "Arginine", code: "Arg", type: "Basic (+)" },
  AAA: { amino: "Lysine", code: "Lys", type: "Basic (+)" },
  AAG: { amino: "Lysine", code: "Lys", type: "Basic (+)" },
  // Polar / Uncharged
  TAC: { amino: "Tyrosine", code: "Tyr", type: "Aromatic Polar" },
  TAT: { amino: "Tyrosine", code: "Tyr", type: "Aromatic Polar" },
  GCG: { amino: "Alanine", code: "Ala", type: "Nonpolar" },
  GCT: { amino: "Alanine", code: "Ala", type: "Nonpolar" },
  GCA: { amino: "Alanine", code: "Ala", type: "Nonpolar" },
  GCC: { amino: "Alanine", code: "Ala", type: "Nonpolar" },
  AGC: { amino: "Serine", code: "Ser", type: "Polar" },
  AGT: { amino: "Serine", code: "Ser", type: "Polar" },
  TCA: { amino: "Serine", code: "Ser", type: "Polar" },
  TCC: { amino: "Serine", code: "Ser", type: "Polar" },
  ACC: { amino: "Threonine", code: "Thr", type: "Polar" },
  ACA: { amino: "Threonine", code: "Thr", type: "Polar" },
  TGG: { amino: "Tryptophan", code: "Trp", type: "Aromatic" },
  TGC: { amino: "Cysteine", code: "Cys", type: "Disulfide Bond" },
  TGT: { amino: "Cysteine", code: "Cys", type: "Disulfide Bond" },
  // Termination / Stop Codons
  TAA: { amino: "Ochre", code: "STOP", type: "Termination" },
  TAG: { amino: "Amber", code: "STOP", type: "Termination" },
  TGA: { amino: "Opal", code: "STOP", type: "Termination" },
};

const COMPLEMENT_MAP: Record<string, string> = {
  A: "T",
  T: "A",
  C: "G",
  G: "C",
};

const BASE_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  A: { bg: "bg-blue-500/20", border: "border-blue-400/60", text: "text-blue-300", label: "Adenine" },
  T: { bg: "bg-indigo-500/20", border: "border-indigo-400/60", text: "text-indigo-300", label: "Thymine" },
  C: { bg: "bg-purple-500/20", border: "border-purple-400/60", text: "text-purple-300", label: "Cytosine" },
  G: { bg: "bg-cyan-500/20", border: "border-cyan-400/60", text: "text-cyan-300", label: "Guanine" },
};

export const GenePlayground: React.FC = () => {
  const [sequence, setSequence] = useState<string>("ATCGATCGGCTATACGCG");

  const appendBase = (base: string) => {
    soundManager.playClickSound();
    if (sequence.length < 21) {
      setSequence((prev) => prev + base);
    }
  };

  const clearSequence = () => {
    soundManager.playClickSound();
    setSequence("");
  };

  const reverseComplement = () => {
    soundManager.playClickSound();
    const revComp = sequence
      .split("")
      .reverse()
      .map((b) => COMPLEMENT_MAP[b] || b)
      .join("");
    setSequence(revComp);
  };

  const simulateCrisprCut = () => {
    soundManager.playClickSound();
    if (sequence.length > 6) {
      const mid = Math.floor(sequence.length / 2);
      const newSeq = (sequence.slice(0, mid) + "GCTA" + sequence.slice(mid)).slice(0, 21);
      setSequence(newSeq);
    }
  };

  // Group into codons (3 letters)
  const codons: string[] = [];
  for (let i = 0; i < sequence.length; i += 3) {
    if (i + 3 <= sequence.length) {
      codons.push(sequence.substring(i, i + 3));
    }
  }

  // Calculate dynamic bio metrics
  const gcCount = (sequence.match(/[GC]/g) || []).length;
  const atCount = (sequence.match(/[AT]/g) || []).length;
  const gcContent = sequence.length > 0 ? Math.round((gcCount / sequence.length) * 100) : 0;
  const meltingTemp = sequence.length > 0 ? (2 * atCount + 4 * gcCount).toFixed(1) : "0.0";
  const bindingEnergy = (-(gcCount * 2.4 + atCount * 1.2)).toFixed(1);
  const affinityKd = (0.15 + (100 - gcContent) * 0.004).toFixed(2);

  return (
    <section id="playground" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 05 — INTERACTIVE GENE PLAYGROUND"
          headline="Synthetic Biology Sequence Workbench."
          subheading="Construct custom DNA sequence strands. Observe real-time 2D double-helix base pairing, amino acid codon translation, and binding kinetic dynamics."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left ~50%) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Dna className="w-4 h-4 text-blue-400 animate-pulse" />
                  // SYNTHETIC DNA INPUT BUFFER
                </span>
                <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  {sequence.length}/21 BASES
                </span>
              </div>

              {/* Display Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-blue-500/40 font-mono text-xl sm:text-2xl tracking-widest break-all min-h-[76px] flex items-center justify-between shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]">
                {sequence ? (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {sequence.split("").map((b, idx) => {
                      const color = BASE_COLORS[b] || { bg: "bg-slate-800", border: "border-slate-600", text: "text-white" };
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded border ${color.bg} ${color.border} ${color.text} font-bold text-sm sm:text-base shadow-sm`}
                        >
                          {b}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-slate-400 text-sm font-sans font-medium">
                    CLICK BASES BELOW TO ASSEMBLE DNA STRAND...
                  </span>
                )}
                <span className="w-2.5 h-6 bg-cyan-400 animate-pulse shrink-0 ml-2" />
              </div>

              {/* Base Pair Input Buttons */}
              <div>
                <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider block mb-3">
                  SELECT NUCLEOTIDE BASE TO ADD:
                </span>
                <div className="grid grid-cols-4 gap-3 font-mono font-bold">
                  {(["A", "T", "C", "G"] as const).map((base) => {
                    const color = BASE_COLORS[base];
                    return (
                      <button
                        key={base}
                        onClick={() => appendBase(base)}
                        className={`p-3 sm:p-4 rounded-xl border ${color.bg} ${color.border} ${color.text} hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg`}
                      >
                        <span className="text-xl sm:text-2xl font-black">{base}</span>
                        <span className="text-[10px] text-slate-300 font-sans tracking-tight">{color.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Tools */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={clearSequence}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-rose-300 font-mono text-xs flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  CLEAR
                </button>
                <button
                  onClick={reverseComplement}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  REV-COMPLEMENT
                </button>
                <button
                  onClick={simulateCrisprCut}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-lime-950/60 border border-slate-700 hover:border-lime-500 text-slate-200 hover:text-lime-300 font-mono text-xs flex items-center gap-1.5 transition-all"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  SIMULATE CRISPR CUT
                </button>
              </div>

              {/* Presets */}
              <div className="pt-4 border-t border-cyan-500/20">
                <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider block mb-3">
                  PRE-CONFIGURED BENCHMARK SEQUENCES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        soundManager.playClickSound();
                        setSequence(p.sequence);
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                        sequence === p.sequence
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                          : "bg-slate-900/60 border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-500/40"
                      }`}
                    >
                      <span className="truncate">{p.label}</span>
                      {sequence === p.sequence && <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results & Visualizer Column (Right ~50%) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 2D DNA Double-Helix Strand Visualizer */}
            <div className="p-6 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  // 2D DOUBLE-HELIX BASE-PAIR BONDING
                </span>
                <span className="font-mono text-[10px] text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  SYNCHRONIZED
                </span>
              </div>

              {/* DNA Strand Display */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 overflow-x-auto space-y-2 font-mono text-xs">
                {/* 5' Strand (Input sequence) */}
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-[10px]">5&apos;</span>
                  <div className="flex items-center gap-1.5">
                    {sequence.split("").map((b, i) => (
                      <span key={i} className="w-6 h-6 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300 flex items-center justify-center font-bold">
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className="text-cyan-400 font-bold text-[10px]">3&apos;</span>
                </div>

                {/* Hydrogen Bond Indicators */}
                <div className="flex items-center gap-2 pl-4">
                  <div className="flex items-center gap-1.5">
                    {sequence.split("").map((b, i) => (
                      <span key={i} className="w-6 text-center text-slate-500 font-bold">
                        {b === "G" || b === "C" ? "≡" : "="}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3' Complementary Strand */}
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 font-bold text-[10px]">3&apos;</span>
                  <div className="flex items-center gap-1.5">
                    {sequence.split("").map((b, i) => {
                      const comp = COMPLEMENT_MAP[b] || b;
                      return (
                        <span key={i} className="w-6 h-6 rounded bg-lime-950 border border-lime-500/50 text-lime-300 flex items-center justify-center font-bold">
                          {comp}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-lime-400 font-bold text-[10px]">5&apos;</span>
                </div>
              </div>
            </div>

            {/* Codon Translation Output */}
            <div className="p-6 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                // TRANSLATED AMINO ACID CODONS
              </span>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {codons.length > 0 ? (
                  codons.map((codon, idx) => {
                    const info = CODON_MAP[codon] || { amino: "Synthetic Peptide", code: "Pep", type: "Engineered Link" };
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-blue-300 font-bold px-2 py-1 rounded bg-slate-950 border border-blue-500/30">
                            CODON {idx + 1}: {codon}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <span className="text-white font-bold">{info.amino} ({info.code})</span>
                          <span className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                            {info.type}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 font-mono text-xs text-slate-400">
                    NO COMPLETE CODONS. ADD AT LEAST 3 NUCLEOTIDES.
                  </div>
                )}
              </div>

              {/* Bio Kinetics Data Grid */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">GC CONTENT</span>
                  <span className="text-lg font-bold text-blue-400">{gcContent}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">MELTING TEMP (Tm)</span>
                  <span className="text-lg font-bold text-indigo-400">{meltingTemp}°C</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">FREE ENERGY (ΔG)</span>
                  <span className="text-lg font-bold text-purple-400">{bindingEnergy}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">AFFINITY (Kd)</span>
                  <span className="text-lg font-bold text-blue-300">{affinityKd} nM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};


