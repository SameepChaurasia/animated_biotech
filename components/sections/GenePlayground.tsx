"use client";

import React, { useState, useMemo } from "react";
import {
  Dna,
  RefreshCw,
  Zap,
  ArrowRight,
  Scissors,
  RotateCw,
  Sparkles,
  Activity,
  ChevronDown,
  Atom,
  Binary,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { soundManager } from "@/lib/audio";

const PRESETS = [
  { label: "Oncology Lead (ATCG-8849)", sequence: "ATCGATCGGCTATACGCG" },
  { label: "Gene Edit Construct (CRISPR-V2)", sequence: "GCTAGCTAGCTAGCTA" },
  { label: "Enzyme Pathway (MET-9902)", sequence: "TACGATCGTACGATCG" },
  { label: "Synthetic Promoter (SYN-770)", sequence: "ATGACCATGACGATCG" },
  { label: "Therapeutic Peptide (PEP-301)", sequence: "ATGGCCAAAGCGTGGTGA" },
];

// Complete 64-Codon Standard Genetic Code Dictionary with Biochemical Properties & Bead Colors
const CODON_MAP: Record<
  string,
  { amino: string; code: string; type: string; color: string; beadBg: string; beadText: string }
> = {
  // Phenylalanine & Leucine
  TTT: { amino: "Phenylalanine", code: "Phe", type: "Aromatic Nonpolar", color: "text-amber-300", beadBg: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]", beadText: "text-slate-950" },
  TTC: { amino: "Phenylalanine", code: "Phe", type: "Aromatic Nonpolar", color: "text-amber-300", beadBg: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]", beadText: "text-slate-950" },
  TTA: { amino: "Leucine", code: "Leu", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  TTG: { amino: "Leucine", code: "Leu", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  CTT: { amino: "Leucine", code: "Leu", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  CTC: { amino: "Leucine", code: "Leu", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  CTA: { amino: "Leucine", code: "Leu", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  CTG: { amino: "Leucine", code: "Leu", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  // Isoleucine & Methionine (Start)
  ATT: { amino: "Isoleucine", code: "Ile", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  ATC: { amino: "Isoleucine", code: "Ile", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  ATA: { amino: "Isoleucine", code: "Ile", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  ATG: { amino: "Methionine", code: "Met", type: "Start Codon", color: "text-cyan-300", beadBg: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]", beadText: "text-slate-950 font-black" },
  // Valine
  GTT: { amino: "Valine", code: "Val", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  GTC: { amino: "Valine", code: "Val", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  GTA: { amino: "Valine", code: "Val", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  GTG: { amino: "Valine", code: "Val", type: "Hydrophobic", color: "text-indigo-300", beadBg: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]", beadText: "text-white" },
  // Serine
  TCT: { amino: "Serine", code: "Ser", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  TCC: { amino: "Serine", code: "Ser", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  TCA: { amino: "Serine", code: "Ser", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  TCG: { amino: "Serine", code: "Ser", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  AGT: { amino: "Serine", code: "Ser", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  AGC: { amino: "Serine", code: "Ser", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  // Proline
  CCT: { amino: "Proline", code: "Pro", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  CCC: { amino: "Proline", code: "Pro", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  CCA: { amino: "Proline", code: "Pro", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  CCG: { amino: "Proline", code: "Pro", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  // Threonine
  ACT: { amino: "Threonine", code: "Thr", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  ACC: { amino: "Threonine", code: "Thr", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  ACA: { amino: "Threonine", code: "Thr", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  ACG: { amino: "Threonine", code: "Thr", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  // Alanine
  GCT: { amino: "Alanine", code: "Ala", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  GCC: { amino: "Alanine", code: "Ala", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  GCA: { amino: "Alanine", code: "Ala", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  GCG: { amino: "Alanine", code: "Ala", type: "Nonpolar", color: "text-sky-300", beadBg: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]", beadText: "text-slate-950" },
  // Tyrosine & Stop Codons
  TAT: { amino: "Tyrosine", code: "Tyr", type: "Aromatic Polar", color: "text-amber-300", beadBg: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]", beadText: "text-slate-950" },
  TAC: { amino: "Tyrosine", code: "Tyr", type: "Aromatic Polar", color: "text-amber-300", beadBg: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]", beadText: "text-slate-950" },
  TAA: { amino: "Ochre (STOP)", code: "STOP", type: "Termination", color: "text-rose-400", beadBg: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)]", beadText: "text-white font-black" },
  TAG: { amino: "Amber (STOP)", code: "STOP", type: "Termination", color: "text-rose-400", beadBg: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)]", beadText: "text-white font-black" },
  TGA: { amino: "Opal (STOP)", code: "STOP", type: "Termination", color: "text-rose-400", beadBg: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)]", beadText: "text-white font-black" },
  // Histidine & Glutamine
  CAT: { amino: "Histidine", code: "His", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  CAC: { amino: "Histidine", code: "His", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  CAA: { amino: "Glutamine", code: "Gln", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  CAG: { amino: "Glutamine", code: "Gln", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  // Asparagine & Lysine
  AAT: { amino: "Asparagine", code: "Asn", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  AAC: { amino: "Asparagine", code: "Asn", type: "Polar", color: "text-teal-300", beadBg: "bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]", beadText: "text-slate-950" },
  AAA: { amino: "Lysine", code: "Lys", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  AAG: { amino: "Lysine", code: "Lys", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  // Aspartate & Glutamate
  GAT: { amino: "Aspartate", code: "Asp", type: "Acidic (-)", color: "text-rose-300", beadBg: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]", beadText: "text-white" },
  GAC: { amino: "Aspartate", code: "Asp", type: "Acidic (-)", color: "text-rose-300", beadBg: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]", beadText: "text-white" },
  GAA: { amino: "Glutamate", code: "Glu", type: "Acidic (-)", color: "text-rose-300", beadBg: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]", beadText: "text-white" },
  GAG: { amino: "Glutamate", code: "Glu", type: "Acidic (-)", color: "text-rose-300", beadBg: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]", beadText: "text-white" },
  // Cysteine & Tryptophan
  TGT: { amino: "Cysteine", code: "Cys", type: "Disulfide / Polar", color: "text-emerald-300", beadBg: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]", beadText: "text-slate-950" },
  TGC: { amino: "Cysteine", code: "Cys", type: "Disulfide / Polar", color: "text-emerald-300", beadBg: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]", beadText: "text-slate-950" },
  TGG: { amino: "Tryptophan", code: "Trp", type: "Aromatic", color: "text-amber-300", beadBg: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]", beadText: "text-slate-950" },
  // Arginine
  CGT: { amino: "Arginine", code: "Arg", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  CGC: { amino: "Arginine", code: "Arg", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  CGA: { amino: "Arginine", code: "Arg", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  CGG: { amino: "Arginine", code: "Arg", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  AGA: { amino: "Arginine", code: "Arg", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  AGG: { amino: "Arginine", code: "Arg", type: "Basic (+)", color: "text-purple-300", beadBg: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]", beadText: "text-white" },
  // Glycine
  GGT: { amino: "Glycine", code: "Gly", type: "Small Nonpolar", color: "text-slate-300", beadBg: "bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]", beadText: "text-slate-950" },
  GGC: { amino: "Glycine", code: "Gly", type: "Small Nonpolar", color: "text-slate-300", beadBg: "bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]", beadText: "text-slate-950" },
  GGA: { amino: "Glycine", code: "Gly", type: "Small Nonpolar", color: "text-slate-300", beadBg: "bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]", beadText: "text-slate-950" },
  GGG: { amino: "Glycine", code: "Gly", type: "Small Nonpolar", color: "text-slate-300", beadBg: "bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]", beadText: "text-slate-950" },
};

const COMPLEMENT_MAP: Record<string, string> = {
  A: "T",
  T: "A",
  C: "G",
  G: "C",
};

// SantaLucia (1998) Unified Nearest-Neighbor Dinucleotide ΔG°37 Parameters (kcal/mol)
const NN_DELTA_G: Record<string, number> = {
  AA: -1.0,
  TT: -1.0,
  AT: -0.88,
  TA: -0.58,
  CA: -1.45,
  TG: -1.45,
  GT: -1.44,
  AC: -1.44,
  CT: -1.28,
  AG: -1.28,
  GA: -1.3,
  TC: -1.3,
  CG: -2.17,
  GC: -2.24,
  GG: -1.84,
  CC: -1.84,
};

const BASE_META: Record<
  string,
  { bg: string; border: string; text: string; label: string; ringClass: string; structure: string; glow: string }
> = {
  A: {
    bg: "bg-blue-500/15",
    border: "border-blue-400/50",
    text: "text-blue-300",
    label: "Adenine",
    ringClass: "2-Ring Purine",
    structure: "Purine",
    glow: "shadow-[0_0_14px_rgba(59,130,246,0.35)]",
  },
  T: {
    bg: "bg-indigo-500/15",
    border: "border-indigo-400/50",
    text: "text-indigo-300",
    label: "Thymine",
    ringClass: "1-Ring Pyrimidine",
    structure: "Pyrim",
    glow: "shadow-[0_0_14px_rgba(99,102,241,0.35)]",
  },
  C: {
    bg: "bg-purple-500/15",
    border: "border-purple-400/50",
    text: "text-purple-300",
    label: "Cytosine",
    ringClass: "1-Ring Pyrimidine",
    structure: "Pyrim",
    glow: "shadow-[0_0_14px_rgba(168,85,247,0.35)]",
  },
  G: {
    bg: "bg-cyan-500/15",
    border: "border-cyan-400/50",
    text: "text-cyan-300",
    label: "Guanine",
    ringClass: "2-Ring Purine",
    structure: "Purine",
    glow: "shadow-[0_0_14px_rgba(34,211,238,0.35)]",
  },
};

export const GenePlayground: React.FC = () => {
  const [sequence, setSequence] = useState<string>("ATCGATCGGCTATACGCG");
  const [hoveredBaseIdx, setHoveredBaseIdx] = useState<number | null>(null);
  const [isCrisprFlashing, setIsCrisprFlashing] = useState<boolean>(false);
  const [showCodonDetails, setShowCodonDetails] = useState<boolean>(false);

  const appendBase = (base: string) => {
    soundManager.playClickSound();
    if (sequence.length < 21) {
      setSequence((prev) => prev + base);
    }
  };

  const removeBaseAt = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    setSequence((prev) => prev.slice(0, idx) + prev.slice(idx + 1));
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
    setIsCrisprFlashing(true);
    setTimeout(() => setIsCrisprFlashing(false), 600);

    if (sequence.length > 6) {
      const mid = Math.floor(sequence.length / 2);
      const newSeq = (sequence.slice(0, mid) + "GCTA" + sequence.slice(mid)).slice(0, 21);
      setSequence(newSeq);
    }
  };

  // Group into codons (3 letters)
  const codons = useMemo(() => {
    const list: string[] = [];
    for (let i = 0; i < sequence.length; i += 3) {
      if (i + 3 <= sequence.length) {
        list.push(sequence.substring(i, i + 3));
      }
    }
    return list;
  }, [sequence]);

  // Scientific Calculations & Thermodynamic Kinetics
  const stats = useMemo(() => {
    const len = sequence.length;
    if (len === 0) {
      return {
        gcContent: 0,
        meltingTemp: "0.0",
        freeEnergy: "0.0",
        affinityKd: "—",
        stabilityIndex: 0,
        stabilityRating: "AWAITING DNA INPUT",
      };
    }

    const gcCount = (sequence.match(/[GC]/g) || []).length;
    const atCount = (sequence.match(/[AT]/g) || []).length;
    const gcContent = Math.round((gcCount / len) * 100);

    // 1. Melting Temperature (Tm)
    let tm = 0;
    if (len <= 14) {
      tm = 2 * atCount + 4 * gcCount;
    } else {
      tm = 64.9 + (41 * (gcCount - 16.4)) / len;
    }

    // 2. Free Energy (ΔG) via SantaLucia (1998) Unified Parameters
    let deltaG = 0;
    if (len >= 2) {
      let sum = 0.98; // Initiation penalty
      for (let i = 0; i < len - 1; i++) {
        const pair = sequence.substring(i, i + 2);
        sum += NN_DELTA_G[pair] ?? -1.4;
      }
      deltaG = sum;
    }

    // 3. Binding Affinity (Kd) - Gibbs derivation
    let kdDisplay = "—";
    if (len >= 2) {
      const rawKd = Math.exp(deltaG / 0.616) * 1e7;
      if (rawKd < 0.01) {
        kdDisplay = "< 0.01 nM";
      } else if (rawKd > 1000) {
        kdDisplay = (rawKd / 1000).toFixed(1) + " μM";
      } else {
        kdDisplay = rawKd.toFixed(2) + " nM";
      }
    }

    // Duplex Stability Index (0-100%)
    const stabilityScore = Math.min(100, Math.max(10, Math.round((Math.abs(deltaG) / 32) * 100)));
    let rating = "LOW STABILITY";
    if (stabilityScore > 75) rating = "ULTRA-STABLE DUPLEX";
    else if (stabilityScore > 45) rating = "OPTIMAL B-DNA DUPLEX";

    return {
      gcContent,
      meltingTemp: tm.toFixed(1),
      freeEnergy: deltaG.toFixed(1),
      affinityKd: kdDisplay,
      stabilityIndex: stabilityScore,
      stabilityRating: rating,
    };
  }, [sequence]);

  return (
    <section id="playground" className="py-4 md:py-5 lg:py-6 bg-transparent relative overflow-hidden select-none">
      <Container className="relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="mb-2.5 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] text-cyan-400 tracking-[0.2em] uppercase mb-0.5 flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              // 05 — INTERACTIVE GENE PLAYGROUND
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-[1.7rem] font-bold tracking-tight text-white leading-tight">
              Synthetic Biology Sequence Workbench
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-2xl leading-relaxed">
              Design custom oligonucleotide sequences. Inspect Watson-Crick hydrogen bonding, in silico codon translation, and SantaLucia thermodynamic kinetics in real time.
            </p>
          </div>

          {/* Preset Select & Buffer Status */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <div className="relative">
              <select
                value={PRESETS.some((p) => p.sequence === sequence) ? sequence : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    soundManager.playClickSound();
                    setSequence(e.target.value);
                  }
                }}
                className="appearance-none pl-2.5 pr-7 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-cyan-300 font-mono text-[11px] focus:outline-none focus:border-cyan-400 transition-all cursor-pointer shadow-inner hover:border-cyan-500/50"
              >
                <option value="" disabled className="bg-slate-950 text-slate-400">
                  Load benchmark preset...
                </option>
                {PRESETS.map((p) => (
                  <option key={p.label} value={p.sequence} className="bg-slate-950 text-slate-200">
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-cyan-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>

            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 font-mono text-[11px] flex items-center gap-1.5">
              <span className="text-slate-400">LENGTH:</span>
              <span className={`font-bold ${sequence.length >= 21 ? "text-amber-400" : "text-cyan-300"}`}>
                {sequence.length}/21 bp
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            UNIFIED STUDIO INSTRUMENT PANEL (Single Cohesive Canvas)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden relative">
          
          {/* Subtle Ambient Top Accent Glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* CRISPR Cleavage Alert Banner */}
          {isCrisprFlashing && (
            <div className="absolute inset-0 bg-lime-400/15 border-2 border-lime-400 animate-pulse pointer-events-none rounded-2xl z-30 flex items-center justify-center backdrop-blur-xs">
              <span className="font-mono text-sm font-black text-lime-300 bg-slate-950/95 px-5 py-2 rounded-full border border-lime-400 shadow-[0_0_30px_#a3e635] flex items-center gap-2">
                <Scissors className="w-4 h-4 animate-spin" />
                ⚡ CRISPR-CAS9 ENDONUCLEASE CLEAVAGE APPLIED (+GCTA)
              </span>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              PANEL SECTION 1: INTERACTIVE KEYPAD & STRAND BUFFER TOOLBAR
             ───────────────────────────────────────────────────────────── */}
          <div className="py-2.5 px-3 sm:px-4 border-b border-slate-800/70 bg-slate-900/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
            
            {/* Tactile 4-Base Synthesizer Buttons */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:inline mr-0.5">
                SYNTHESIZE:
              </span>
              <div className="grid grid-cols-4 gap-1.5 flex-1 sm:flex-none">
                {(["A", "T", "C", "G"] as const).map((base) => {
                  const meta = BASE_META[base];
                  return (
                    <button
                      key={base}
                      onClick={() => appendBase(base)}
                      disabled={sequence.length >= 21}
                      className={`py-1 px-3 sm:px-3.5 rounded-lg border ${meta.bg} ${meta.border} ${meta.text} font-mono transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group/btn hover:scale-105 ${meta.glow}`}
                      title={`Append ${meta.label} (${meta.ringClass})`}
                    >
                      <span className="text-sm font-black leading-none group-hover/btn:text-white transition-colors">
                        {base}
                      </span>
                      <span className="text-[9px] font-sans text-slate-400 group-hover/btn:text-slate-200 hidden sm:inline">
                        {meta.label.slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editing Action Tools */}
            <div className="flex items-center gap-1.5 justify-end">
              <button
                onClick={reverseComplement}
                disabled={!sequence}
                className="py-1.5 px-2.5 rounded-lg bg-slate-900/90 hover:bg-cyan-950/70 border border-slate-700/80 hover:border-cyan-500/70 text-slate-300 hover:text-cyan-300 font-mono text-[10px] font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                title="Compute 3' to 5' Watson-Crick reverse complement strand"
              >
                <RotateCw className="w-3 h-3 text-cyan-400" />
                <span>REV-COMP</span>
              </button>

              <button
                onClick={simulateCrisprCut}
                disabled={!sequence || sequence.length < 6}
                className="py-1.5 px-2.5 rounded-lg bg-slate-900/90 hover:bg-lime-950/70 border border-slate-700/80 hover:border-lime-500/70 text-slate-300 hover:text-lime-300 font-mono text-[10px] font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                title="Simulate CRISPR-Cas9 targeted endonuclease cut and repair"
              >
                <Scissors className="w-3 h-3 text-lime-400" />
                <span>CRISPR ⚡</span>
              </button>

              <button
                onClick={clearSequence}
                disabled={!sequence}
                className="py-1.5 px-2.5 rounded-lg bg-slate-900/90 hover:bg-rose-950/70 border border-slate-700/80 hover:border-rose-500/70 text-slate-300 hover:text-rose-300 font-mono text-[10px] font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                title="Reset sequence workbench"
              >
                <RefreshCw className="w-3 h-3 text-rose-400" />
                <span>CLEAR</span>
              </button>
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              PANEL SECTION 2: LIVING DOUBLE-HELIX & CODON TRANSLATOR
             ───────────────────────────────────────────────────────────── */}
          <div className="p-3 sm:p-4 space-y-3">
            
            {/* Visual DNA Double-Strand & Hydrogen Bonding Engine */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 shadow-inner relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    2D Watson-Crick Duplex & Base-Pairing
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[9px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="font-bold">G≡C</span> (3 H-Bonds)
                  </span>
                  <span className="flex items-center gap-1 text-indigo-300">
                    <span className="font-bold">A=T</span> (2 H-Bonds)
                  </span>
                </div>
              </div>

              {sequence ? (
                <div className="overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
                  <div className="inline-block min-w-max">
                    {/* 5' Sense Strand */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-cyan-400 font-mono font-bold text-xs w-6 shrink-0 text-right">5&apos;</span>
                      <div className="flex items-center gap-1">
                        {sequence.split("").map((b, i) => {
                          const meta = BASE_META[b] || BASE_META["A"];
                          const isHovered = hoveredBaseIdx === i;
                          return (
                            <button
                              key={i}
                              onMouseEnter={() => {
                                setHoveredBaseIdx(i);
                                soundManager.playHoverSound();
                              }}
                              onMouseLeave={() => setHoveredBaseIdx(null)}
                              onClick={(e) => removeBaseAt(i, e)}
                              title={`Position ${i + 1}: ${meta.label} — Click to remove`}
                              className={`w-7 h-7 rounded-md border font-mono font-black text-xs flex items-center justify-center transition-all duration-200 cursor-pointer ${
                                isHovered
                                  ? `scale-110 ring-2 ring-cyan-300 bg-cyan-600 text-white ${meta.glow}`
                                  : `${meta.bg} ${meta.border} ${meta.text} hover:scale-105`
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-cyan-400 font-mono font-bold text-xs shrink-0 ml-1">3&apos;</span>
                      <span className="text-slate-500 font-mono text-[9px] ml-1.5">(Sense Strand)</span>
                    </div>

                    {/* Dynamic Hydrogen Bond Bridges */}
                    <div className="flex items-center gap-2 pl-8 mb-1.5">
                      <div className="flex items-center gap-1">
                        {sequence.split("").map((b, i) => {
                          const isTriple = b === "G" || b === "C";
                          const isHovered = hoveredBaseIdx === i;
                          return (
                            <div
                              key={i}
                              className={`w-7 flex items-center justify-center transition-all duration-200 ${
                                isHovered ? "scale-125" : ""
                              }`}
                            >
                              <span
                                className={`font-black text-xs leading-none ${
                                  isTriple
                                    ? isHovered
                                      ? "text-cyan-300 drop-shadow-[0_0_8px_#22d3ee]"
                                      : "text-cyan-400/70"
                                    : isHovered
                                    ? "text-indigo-300 drop-shadow-[0_0_8px_#818cf8]"
                                    : "text-indigo-400/70"
                                }`}
                                title={isTriple ? "G≡C: 3 Hydrogen Bonds" : "A=T: 2 Hydrogen Bonds"}
                              >
                                {isTriple ? "≡" : "="}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3' Complementary Strand */}
                    <div className="flex items-center gap-2">
                      <span className="text-lime-400 font-mono font-bold text-xs w-6 shrink-0 text-right">3&apos;</span>
                      <div className="flex items-center gap-1">
                        {sequence.split("").map((b, i) => {
                          const comp = COMPLEMENT_MAP[b] || b;
                          const compMeta = BASE_META[comp] || BASE_META["A"];
                          const isHovered = hoveredBaseIdx === i;
                          return (
                            <div
                              key={i}
                              onMouseEnter={() => setHoveredBaseIdx(i)}
                              onMouseLeave={() => setHoveredBaseIdx(null)}
                              title={`Complementary ${compMeta.label}`}
                              className={`w-7 h-7 rounded-md border font-mono font-black text-xs flex items-center justify-center transition-all duration-200 ${
                                isHovered
                                  ? `scale-110 ring-2 ring-lime-300 bg-lime-600 text-white shadow-[0_0_12px_#a3e635]`
                                  : "bg-slate-900/90 border-slate-700/80 text-lime-300"
                              }`}
                            >
                              {comp}
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-lime-400 font-mono font-bold text-xs shrink-0 ml-1">5&apos;</span>
                      <span className="text-slate-500 font-mono text-[9px] ml-1.5">(Antisense Strand)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-slate-500 font-mono text-xs">
                  Awaiting DNA strand. Click nucleotide buttons (A, T, C, G) above to build your sequence.
                </div>
              )}
            </div>

            {/* ── PEPTIDE PRIMARY STRUCTURE TRANSLATION RIBBON ── */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-mono text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    In Silico Translated Peptide Chain
                  </span>
                </div>
                <span className="font-mono text-[10px] text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                  {codons.length} {codons.length === 1 ? "Codon" : "Codons"} Translated
                </span>
              </div>

              {codons.length > 0 ? (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
                  <span className="text-[10px] font-mono text-purple-400 font-bold shrink-0 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/30">
                    N-TERM
                  </span>
                  <div className="flex items-center gap-1.5">
                    {codons.map((codon, idx) => {
                      const info = CODON_MAP[codon] || {
                        amino: "Synthetic Amino",
                        code: "Pep",
                        type: "Engineered",
                        color: "text-white",
                        beadBg: "bg-slate-700",
                        beadText: "text-white",
                      };
                      return (
                        <div key={idx} className="flex items-center gap-1.5 shrink-0">
                          <div className="flex items-center gap-1.5 p-1.5 px-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all group">
                            <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">
                              {codon}
                            </span>
                            <ArrowRight className="w-2 h-2 text-purple-400" />
                            <div
                              className={`px-1.5 py-0.5 rounded-md ${info.beadBg} ${info.beadText} text-[10px] font-mono font-black shadow-xs`}
                            >
                              {info.code}
                            </div>
                            <span className={`text-[10px] font-sans font-bold ${info.color}`}>
                              {info.amino}
                            </span>
                            <span className="text-[8px] font-mono text-slate-500 bg-slate-950 px-1 py-0.2 rounded hidden sm:inline">
                              {info.type}
                            </span>
                          </div>
                          {idx < codons.length - 1 && (
                            <span className="text-xs font-mono text-purple-500/60 font-bold shrink-0">—</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30 ml-0.5">
                    C-TERM
                  </span>
                </div>
              ) : (
                <div className="py-3 text-center text-slate-500 font-mono text-xs">
                  {sequence.length > 0
                    ? `Sequence has ${sequence.length} nucleotides. Need at least 3 for codon translation.`
                    : "Add nucleotide triplets to observe peptide chain synthesis."}
                </div>
              )}
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              PANEL SECTION 3: BOTTOM THERMODYNAMIC KINETICS TELEMETRY
             ───────────────────────────────────────────────────────────── */}
          <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-900/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            
            {/* Telemetry 1: Duplex Stability Meter */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  DUPLEX STABILITY
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-300 block mb-1.5 truncate">
                  {stats.stabilityRating}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${stats.stabilityIndex}%` }}
                />
              </div>
            </div>

            {/* Telemetry 2: GC Content */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-xs">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block">
                GC CONTENT
              </span>
              <div className="my-0.5">
                <span className="text-lg sm:text-xl font-mono font-black text-cyan-400">
                  {stats.gcContent}%
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-500">
                {(sequence.match(/[GC]/g) || []).length} GC / {(sequence.match(/[AT]/g) || []).length} AT
              </span>
            </div>

            {/* Telemetry 3: Melting Temperature */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-xs">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block">
                MELTING TEMP (Tm)
              </span>
              <div className="my-0.5">
                <span className="text-lg sm:text-xl font-mono font-black text-sky-400">
                  {stats.meltingTemp}°C
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-500">
                {sequence.length <= 14 ? "Wallace Rule" : "SantaLucia NN"}
              </span>
            </div>

            {/* Telemetry 4: Free Energy (ΔG) */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-xs">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block">
                FREE ENERGY (ΔG)
              </span>
              <div className="my-0.5">
                <span className="text-lg sm:text-xl font-mono font-black text-purple-300">
                  {stats.freeEnergy}
                </span>
                <span className="text-[9px] font-mono text-slate-500 ml-1">kcal/mol</span>
              </div>
              <span className="text-[8px] font-mono text-slate-500">Nearest-Neighbor Model</span>
            </div>

            {/* Telemetry 5: Affinity (Kd) */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-xs">
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider block">
                AFFINITY (Kd)*
              </span>
              <div className="my-0.5">
                <span className="text-lg sm:text-xl font-mono font-black text-emerald-400">
                  {stats.affinityKd}
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-500">In Silico Duplex Affinity</span>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};
