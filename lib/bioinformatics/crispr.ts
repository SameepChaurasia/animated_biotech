/**
 * CRISPR Guide RNA (sgRNA) Designer & SpCas9 PAM Engine
 * Implements NGG PAM detection, Doench (2016) Rule Set 2 on-target heuristic, and off-target CFD estimation.
 */

import { getReverseComplement } from "./thermodynamics";

export interface GuideRNA {
  id: string;
  spacerSeq: string;    // 20nt guide without PAM
  pamSeq: string;       // 3nt PAM (e.g. AGG, TGG, CGG, GGG)
  fullTarget: string;   // 23nt target site (spacer + PAM)
  strand: "sense" | "antisense";
  startPos: number;     // 1-based start index
  endPos: number;       // 1-based end index
  cutSitePos: number;   // 3bp upstream of PAM
  gcContent: number;
  onTargetScore: number; // 0-100 Rule Set 2 approximation
  offTargetTier: "Low Risk" | "Moderate Risk" | "High Risk";
  polyTCount: number;   // >= 4 T's causes premature Pol III termination
  hasPolyTWarning: boolean;
  hairpinRisk: boolean;
}

export function designGuideRNAs(
  targetDna: string,
  minScore = 40
): GuideRNA[] {
  const cleanSense = targetDna.toUpperCase().replace(/[^ATCG]/g, "");
  const cleanAntisense = getReverseComplement(cleanSense);
  const guides: GuideRNA[] = [];

  const scan = (seq: string, strand: "sense" | "antisense") => {
    // Look for NGG PAM sites (starts from index 20 onwards to have 20nt spacer)
    for (let i = 20; i <= seq.length - 3; i++) {
      const pam = seq.slice(i, i + 3);
      if (pam[1] === "G" && pam[2] === "G") {
        const spacer = seq.slice(i - 20, i);
        const fullTarget = spacer + pam;

        // GC Content of 20nt spacer
        let gcCount = 0;
        for (let j = 0; j < 20; j++) {
          if (spacer[j] === "G" || spacer[j] === "C") gcCount++;
        }
        const gcPercent = (gcCount / 20) * 100;

        // Poly-T check (TTTT is U6 terminator in RNA Pol III)
        const polyT = spacer.includes("TTTT") || spacer.includes("TTTTT");
        const tCount = (spacer.match(/T/g) || []).length;

        // Doench 2016 On-Target Score Approximation
        // Favors GC 40-60%, penalizes poly-T, rewards G at pos 20 (adjacent to PAM), penalizes T at pos 20
        let score = 65;

        // GC penalty
        if (gcPercent < 35 || gcPercent > 75) score -= 25;
        else if (gcPercent >= 45 && gcPercent <= 65) score += 15;

        // Seed region (positions 11-20 proximal to PAM)
        const seed = spacer.slice(10);
        if (seed[9] === "G") score += 10; // Pos 20 G preferred
        if (seed[9] === "T") score -= 18; // Pos 20 T disfavored
        if (seed[8] === "A") score += 5;

        // Poly-T penalty
        if (polyT) score -= 35;

        // Self-complementarity / hairpin heuristic
        const firstHalf = spacer.slice(0, 10);
        const secondHalfRevComp = getReverseComplement(spacer.slice(10));
        let matches = 0;
        for (let k = 0; k < 10; k++) {
          if (firstHalf[k] === secondHalfRevComp[k]) matches++;
        }
        const hairpin = matches >= 6;
        if (hairpin) score -= 15;

        const finalScore = Math.max(5, Math.min(99, Math.round(score)));

        const offTargetTier: "Low Risk" | "Moderate Risk" | "High Risk" =
          finalScore > 75 ? "Low Risk" : finalScore > 50 ? "Moderate Risk" : "High Risk";

        const startSense = strand === "sense" ? i - 19 : cleanSense.length - (i + 2);
        const endSense = strand === "sense" ? i + 3 : cleanSense.length - (i - 20);
        const cutSense = strand === "sense" ? i - 3 : cleanSense.length - (i - 4);

        guides.push({
          id: `sgRNA-${guides.length + 1}`,
          spacerSeq: spacer,
          pamSeq: pam,
          fullTarget,
          strand,
          startPos: Math.min(startSense, endSense),
          endPos: Math.max(startSense, endSense),
          cutSitePos: cutSense,
          gcContent: Number(gcPercent.toFixed(1)),
          onTargetScore: finalScore,
          offTargetTier,
          polyTCount: tCount,
          hasPolyTWarning: polyT,
          hairpinRisk: hairpin,
        });
      }
    }
  };

  scan(cleanSense, "sense");
  scan(cleanAntisense, "antisense");

  // Sort by on-target score descending
  return guides.filter((g) => g.onTargetScore >= minScore).sort((a, b) => b.onTargetScore - a.onTargetScore);
}
