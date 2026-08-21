import { calculateThermodynamics, getReverseComplement } from "../bioinformatics/thermodynamics";
import { alignSequences } from "../bioinformatics/alignment";
import { findCutSites, simulateDigestion } from "../bioinformatics/restriction";
import { findORFs, translateDnaToProtein } from "../bioinformatics/orf";
import { designGuideRNAs } from "../bioinformatics/crispr";

export const biotechTools = {
  calculateThermodynamics: {
    description: "Computes SantaLucia (1998) Nearest-Neighbor thermodynamic metrics (GC%, Tm, ΔG, ΔH, ΔS, Kd) for a DNA sequence.",
    parameters: {
      type: "object",
      properties: {
        sequence: { type: "string", description: "Nucleotide sequence (A, T, C, G)" },
        saltConcentrationMolar: { type: "number", description: "Monovalent cation concentration in M (default 0.05 for 50mM)" },
      },
      required: ["sequence"],
    },
    execute: async ({ sequence, saltConcentrationMolar }: { sequence: string; saltConcentrationMolar?: number }) => {
      return calculateThermodynamics(sequence, saltConcentrationMolar || 0.05);
    },
  },

  alignSequences: {
    description: "Performs Needleman-Wunsch (Global) or Smith-Waterman (Local) pairwise sequence alignment.",
    parameters: {
      type: "object",
      properties: {
        seq1: { type: "string", description: "First nucleotide sequence" },
        seq2: { type: "string", description: "Second nucleotide sequence" },
        mode: { type: "string", enum: ["global", "local"], description: "Alignment mode" },
      },
      required: ["seq1", "seq2"],
    },
    execute: async ({ seq1, seq2, mode = "global" }: { seq1: string; seq2: string; mode?: "global" | "local" }) => {
      return alignSequences(seq1, seq2, mode);
    },
  },

  designCrisprGuides: {
    description: "Scans a DNA sequence for SpCas9 PAM sites (NGG), designs 20-nt guide RNAs, and calculates Doench 2016 efficiency scores.",
    parameters: {
      type: "object",
      properties: {
        targetSequence: { type: "string", description: "Target genomic DNA sequence" },
        minScore: { type: "number", description: "Minimum on-target score threshold (0-100)" },
      },
      required: ["targetSequence"],
    },
    execute: async ({ targetSequence, minScore = 40 }: { targetSequence: string; minScore?: number }) => {
      return designGuideRNAs(targetSequence, minScore);
    },
  },

  findRestrictionCutSites: {
    description: "Finds restriction endonuclease recognition cut sites across standard enzymes (EcoRI, BamHI, NotI, HindIII, etc.).",
    parameters: {
      type: "object",
      properties: {
        sequence: { type: "string", description: "DNA sequence to scan" },
        enzymes: { type: "array", items: { type: "string" }, description: "Optional specific enzyme names to filter" },
      },
      required: ["sequence"],
    },
    execute: async ({ sequence, enzymes }: { sequence: string; enzymes?: string[] }) => {
      return findCutSites(sequence, enzymes);
    },
  },

  findOpenReadingFrames: {
    description: "Identifies Open Reading Frames (ORFs) and translates nucleotide sequences across all 6 reading frames.",
    parameters: {
      type: "object",
      properties: {
        sequence: { type: "string", description: "DNA sequence" },
        minAminoAcids: { type: "number", description: "Minimum amino acid length filter (default 10)" },
      },
      required: ["sequence"],
    },
    execute: async ({ sequence, minAminoAcids = 10 }: { sequence: string; minAminoAcids?: number }) => {
      return findORFs(sequence, minAminoAcids);
    },
  },

  getReverseComplement: {
    description: "Generates the 5'->3' reverse complement of a DNA sequence.",
    parameters: {
      type: "object",
      properties: {
        sequence: { type: "string", description: "DNA sequence" },
      },
      required: ["sequence"],
    },
    execute: async ({ sequence }: { sequence: string }) => {
      return { reverseComplement: getReverseComplement(sequence) };
    },
  },
};
