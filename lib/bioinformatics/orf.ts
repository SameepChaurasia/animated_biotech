/**
 * Open Reading Frame (ORF) Finder & Protein Translation Engine
 * Scans all 6 reading frames (+1, +2, +3, -1, -2, -3) for ATG start to Stop codons.
 */

import { getReverseComplement } from "./thermodynamics";

export interface CodonTranslation {
  codon: string;
  aminoAcid: string;
  threeLetter: string;
  oneLetter: string;
  category: "Nonpolar" | "Polar" | "Acidic" | "Basic" | "Stop" | "Start";
  color: string;
}

export interface ORFResult {
  id: string;
  frame: "+1" | "+2" | "+3" | "-1" | "-2" | "-3";
  strand: "sense" | "antisense";
  startPos: number; // 1-based index in sense coordinate
  endPos: number;   // 1-based index in sense coordinate
  lengthNt: number;
  lengthAa: number;
  nucleotideSeq: string;
  aminoAcidSeq: string;
  molecularWeightKDa: number;
  isComplete: boolean; // Starts with ATG and ends with Stop
}

export const CODON_TABLE: Record<string, CodonTranslation> = {
  TTT: { codon: "TTT", aminoAcid: "Phenylalanine", threeLetter: "Phe", oneLetter: "F", category: "Nonpolar", color: "#F59E0B" },
  TTC: { codon: "TTC", aminoAcid: "Phenylalanine", threeLetter: "Phe", oneLetter: "F", category: "Nonpolar", color: "#F59E0B" },
  TTA: { codon: "TTA", aminoAcid: "Leucine", threeLetter: "Leu", oneLetter: "L", category: "Nonpolar", color: "#6366F1" },
  TTG: { codon: "TTG", aminoAcid: "Leucine", threeLetter: "Leu", oneLetter: "L", category: "Nonpolar", color: "#6366F1" },
  CTT: { codon: "CTT", aminoAcid: "Leucine", threeLetter: "Leu", oneLetter: "L", category: "Nonpolar", color: "#6366F1" },
  CTC: { codon: "CTC", aminoAcid: "Leucine", threeLetter: "Leu", oneLetter: "L", category: "Nonpolar", color: "#6366F1" },
  CTA: { codon: "CTA", aminoAcid: "Leucine", threeLetter: "Leu", oneLetter: "L", category: "Nonpolar", color: "#6366F1" },
  CTG: { codon: "CTG", aminoAcid: "Leucine", threeLetter: "Leu", oneLetter: "L", category: "Nonpolar", color: "#6366F1" },
  ATT: { codon: "ATT", aminoAcid: "Isoleucine", threeLetter: "Ile", oneLetter: "I", category: "Nonpolar", color: "#6366F1" },
  ATC: { codon: "ATC", aminoAcid: "Isoleucine", threeLetter: "Ile", oneLetter: "I", category: "Nonpolar", color: "#6366F1" },
  ATA: { codon: "ATA", aminoAcid: "Isoleucine", threeLetter: "Ile", oneLetter: "I", category: "Nonpolar", color: "#6366F1" },
  ATG: { codon: "ATG", aminoAcid: "Methionine (Start)", threeLetter: "Met", oneLetter: "M", category: "Start", color: "#22D3EE" },
  GTT: { codon: "GTT", aminoAcid: "Valine", threeLetter: "Val", oneLetter: "V", category: "Nonpolar", color: "#6366F1" },
  GTC: { codon: "GTC", aminoAcid: "Valine", threeLetter: "Val", oneLetter: "V", category: "Nonpolar", color: "#6366F1" },
  GTA: { codon: "GTA", aminoAcid: "Valine", threeLetter: "Val", oneLetter: "V", category: "Nonpolar", color: "#6366F1" },
  GTG: { codon: "GTG", aminoAcid: "Valine", threeLetter: "Val", oneLetter: "V", category: "Nonpolar", color: "#6366F1" },
  TCT: { codon: "TCT", aminoAcid: "Serine", threeLetter: "Ser", oneLetter: "S", category: "Polar", color: "#14B8A6" },
  TCC: { codon: "TCC", aminoAcid: "Serine", threeLetter: "Ser", oneLetter: "S", category: "Polar", color: "#14B8A6" },
  TCA: { codon: "TCA", aminoAcid: "Serine", threeLetter: "Ser", oneLetter: "S", category: "Polar", color: "#14B8A6" },
  TCG: { codon: "TCG", aminoAcid: "Serine", threeLetter: "Ser", oneLetter: "S", category: "Polar", color: "#14B8A6" },
  CCT: { codon: "CCT", aminoAcid: "Proline", threeLetter: "Pro", oneLetter: "P", category: "Nonpolar", color: "#38BDF8" },
  CCC: { codon: "CCC", aminoAcid: "Proline", threeLetter: "Pro", oneLetter: "P", category: "Nonpolar", color: "#38BDF8" },
  CCA: { codon: "CCA", aminoAcid: "Proline", threeLetter: "Pro", oneLetter: "P", category: "Nonpolar", color: "#38BDF8" },
  CCG: { codon: "CCG", aminoAcid: "Proline", threeLetter: "Pro", oneLetter: "P", category: "Nonpolar", color: "#38BDF8" },
  ACT: { codon: "ACT", aminoAcid: "Threonine", threeLetter: "Thr", oneLetter: "T", category: "Polar", color: "#14B8A6" },
  ACC: { codon: "ACC", aminoAcid: "Threonine", threeLetter: "Thr", oneLetter: "T", category: "Polar", color: "#14B8A6" },
  ACA: { codon: "ACA", aminoAcid: "Threonine", threeLetter: "Thr", oneLetter: "T", category: "Polar", color: "#14B8A6" },
  ACG: { codon: "ACG", aminoAcid: "Threonine", threeLetter: "Thr", oneLetter: "T", category: "Polar", color: "#14B8A6" },
  GCT: { codon: "GCT", aminoAcid: "Alanine", threeLetter: "Ala", oneLetter: "A", category: "Nonpolar", color: "#38BDF8" },
  GCC: { codon: "GCC", aminoAcid: "Alanine", threeLetter: "Ala", oneLetter: "A", category: "Nonpolar", color: "#38BDF8" },
  GCA: { codon: "GCA", aminoAcid: "Alanine", threeLetter: "Ala", oneLetter: "A", category: "Nonpolar", color: "#38BDF8" },
  GCG: { codon: "GCG", aminoAcid: "Alanine", threeLetter: "Ala", oneLetter: "A", category: "Nonpolar", color: "#38BDF8" },
  TAT: { codon: "TAT", aminoAcid: "Tyrosine", threeLetter: "Tyr", oneLetter: "Y", category: "Polar", color: "#F59E0B" },
  TAC: { codon: "TAC", aminoAcid: "Tyrosine", threeLetter: "Tyr", oneLetter: "Y", category: "Polar", color: "#F59E0B" },
  TAA: { codon: "TAA", aminoAcid: "Stop (Ochre)", threeLetter: "STP", oneLetter: "*", category: "Stop", color: "#F43F5E" },
  TAG: { codon: "TAG", aminoAcid: "Stop (Amber)", threeLetter: "STP", oneLetter: "*", category: "Stop", color: "#F43F5E" },
  CAT: { codon: "CAT", aminoAcid: "Histidine", threeLetter: "His", oneLetter: "H", category: "Basic", color: "#8B5CF6" },
  CAC: { codon: "CAC", aminoAcid: "Histidine", threeLetter: "His", oneLetter: "H", category: "Basic", color: "#8B5CF6" },
  CAA: { codon: "CAA", aminoAcid: "Glutamine", threeLetter: "Gln", oneLetter: "Q", category: "Polar", color: "#14B8A6" },
  CAG: { codon: "CAG", aminoAcid: "Glutamine", threeLetter: "Gln", oneLetter: "Q", category: "Polar", color: "#14B8A6" },
  AAT: { codon: "AAT", aminoAcid: "Asparagine", threeLetter: "Asn", oneLetter: "N", category: "Polar", color: "#14B8A6" },
  AAC: { codon: "AAC", aminoAcid: "Asparagine", threeLetter: "Asn", oneLetter: "N", category: "Polar", color: "#14B8A6" },
  AAA: { codon: "AAA", aminoAcid: "Lysine", threeLetter: "Lys", oneLetter: "K", category: "Basic", color: "#8B5CF6" },
  AAG: { codon: "AAG", aminoAcid: "Lysine", threeLetter: "Lys", oneLetter: "K", category: "Basic", color: "#8B5CF6" },
  GAT: { codon: "GAT", aminoAcid: "Aspartic Acid", threeLetter: "Asp", oneLetter: "D", category: "Acidic", color: "#EC4899" },
  GAC: { codon: "GAC", aminoAcid: "Aspartic Acid", threeLetter: "Asp", oneLetter: "D", category: "Acidic", color: "#EC4899" },
  GAA: { codon: "GAA", aminoAcid: "Glutamic Acid", threeLetter: "Glu", oneLetter: "E", category: "Acidic", color: "#EC4899" },
  GAG: { codon: "GAG", aminoAcid: "Glutamic Acid", threeLetter: "Glu", oneLetter: "E", category: "Acidic", color: "#EC4899" },
  TGT: { codon: "TGT", aminoAcid: "Cysteine", threeLetter: "Cys", oneLetter: "C", category: "Polar", color: "#10B981" },
  TGC: { codon: "TGC", aminoAcid: "Cysteine", threeLetter: "Cys", oneLetter: "C", category: "Polar", color: "#10B981" },
  TGA: { codon: "TGA", aminoAcid: "Stop (Opal)", threeLetter: "STP", oneLetter: "*", category: "Stop", color: "#F43F5E" },
  TGG: { codon: "TGG", aminoAcid: "Tryptophan", threeLetter: "Trp", oneLetter: "W", category: "Nonpolar", color: "#F59E0B" },
  CGT: { codon: "CGT", aminoAcid: "Arginine", threeLetter: "Arg", oneLetter: "R", category: "Basic", color: "#8B5CF6" },
  CGC: { codon: "CGC", aminoAcid: "Arginine", threeLetter: "Arg", oneLetter: "R", category: "Basic", color: "#8B5CF6" },
  CGA: { codon: "CGA", aminoAcid: "Arginine", threeLetter: "Arg", oneLetter: "R", category: "Basic", color: "#8B5CF6" },
  CGG: { codon: "CGG", aminoAcid: "Arginine", threeLetter: "Arg", oneLetter: "R", category: "Basic", color: "#8B5CF6" },
  AGT: { codon: "AGT", aminoAcid: "Serine", threeLetter: "Ser", oneLetter: "S", category: "Polar", color: "#14B8A6" },
  AGC: { codon: "AGC", aminoAcid: "Serine", threeLetter: "Ser", oneLetter: "S", category: "Polar", color: "#14B8A6" },
  AGA: { codon: "AGA", aminoAcid: "Arginine", threeLetter: "Arg", oneLetter: "R", category: "Basic", color: "#8B5CF6" },
  AGG: { codon: "AGG", aminoAcid: "Arginine", threeLetter: "Arg", oneLetter: "R", category: "Basic", color: "#8B5CF6" },
  GGT: { codon: "GGT", aminoAcid: "Glycine", threeLetter: "Gly", oneLetter: "G", category: "Nonpolar", color: "#94A3B8" },
  GGC: { codon: "GGC", aminoAcid: "Glycine", threeLetter: "Gly", oneLetter: "G", category: "Nonpolar", color: "#94A3B8" },
  GGA: { codon: "GGA", aminoAcid: "Glycine", threeLetter: "Gly", oneLetter: "G", category: "Nonpolar", color: "#94A3B8" },
  GGG: { codon: "GGG", aminoAcid: "Glycine", threeLetter: "Gly", oneLetter: "G", category: "Nonpolar", color: "#94A3B8" },
};

export function translateDnaToProtein(sequence: string): string {
  const clean = sequence.toUpperCase().replace(/[^ATCG]/g, "");
  let protein = "";

  for (let i = 0; i <= clean.length - 3; i += 3) {
    const codon = clean.slice(i, i + 3);
    const info = CODON_TABLE[codon];
    protein += info ? info.oneLetter : "X";
  }

  return protein;
}

export function findORFs(sequence: string, minAaLength = 10): ORFResult[] {
  const cleanSeq = sequence.toUpperCase().replace(/[^ATCG]/g, "");
  const revComp = getReverseComplement(cleanSeq);
  const results: ORFResult[] = [];

  const scanStrand = (
    seq: string,
    strand: "sense" | "antisense",
    frameLabels: ["+1" | "-1", "+2" | "-2", "+3" | "-3"]
  ) => {
    for (let frameOffset = 0; frameOffset < 3; frameOffset++) {
      const frameName = frameLabels[frameOffset];
      let inOrf = false;
      let startIdx = 0;
      let aminoAcidSeq = "";
      let ntSeq = "";

      for (let i = frameOffset; i <= seq.length - 3; i += 3) {
        const codon = seq.slice(i, i + 3);
        const info = CODON_TABLE[codon];

        if (!inOrf && codon === "ATG") {
          inOrf = true;
          startIdx = i;
          aminoAcidSeq = "M";
          ntSeq = "ATG";
        } else if (inOrf) {
          if (!info || info.category === "Stop") {
            // End of ORF
            if (aminoAcidSeq.length >= minAaLength) {
              const senseStart = strand === "sense" ? startIdx + 1 : cleanSeq.length - (i + 2);
              const senseEnd = strand === "sense" ? i + 3 : cleanSeq.length - startIdx;

              results.push({
                id: `ORF-${results.length + 1}`,
                frame: frameName,
                strand,
                startPos: Math.min(senseStart, senseEnd),
                endPos: Math.max(senseStart, senseEnd),
                lengthNt: ntSeq.length,
                lengthAa: aminoAcidSeq.length,
                nucleotideSeq: ntSeq,
                aminoAcidSeq,
                molecularWeightKDa: Number(((aminoAcidSeq.length * 110) / 1000).toFixed(2)),
                isComplete: true,
              });
            }
            inOrf = false;
            aminoAcidSeq = "";
            ntSeq = "";
          } else {
            aminoAcidSeq += info.oneLetter;
            ntSeq += codon;
          }
        }
      }
    }
  };

  scanStrand(cleanSeq, "sense", ["+1", "+2", "+3"]);
  scanStrand(revComp, "antisense", ["-1", "-2", "-3"]);

  // Sort by amino acid length descending
  results.sort((a, b) => b.lengthAa - a.lengthAa);

  return results;
}
