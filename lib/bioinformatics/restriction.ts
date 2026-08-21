/**
 * Restriction Enzyme Digestion & Mapping Engine
 * Database of common commercial restriction endonucleases (NEB standard)
 */

export interface RestrictionEnzyme {
  name: string;
  recognitionSeq: string; // IUPAC representation, e.g. GAATTC
  cutOffset: number;       // Offset from 5' end on sense strand
  overhang: "5prime" | "3prime" | "blunt";
  overhangLength: number;
  sourceOrganism: string;
  isPalindromic: boolean;
}

export interface CutSite {
  enzyme: string;
  position: number; // 1-based index
  cutIndex5: number;
  cutIndex3: number;
  sequenceContext: string;
}

export interface DigestionFragment {
  fragmentIndex: number;
  startPos: number;
  endPos: number;
  length: number;
  sequence: string;
  leftEnzyme: string;
  rightEnzyme: string;
}

export const COMMON_ENZYMES: RestrictionEnzyme[] = [
  { name: "EcoRI", recognitionSeq: "GAATTC", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Escherichia coli RY13", isPalindromic: true },
  { name: "BamHI", recognitionSeq: "GGATCC", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Bacillus amyloliquefaciens H", isPalindromic: true },
  { name: "HindIII", recognitionSeq: "AAGCTT", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Haemophilus influenzae Rd", isPalindromic: true },
  { name: "NotI", recognitionSeq: "GCGGCCGC", cutOffset: 2, overhang: "5prime", overhangLength: 4, sourceOrganism: "Nocardia otitidis-caviarum", isPalindromic: true },
  { name: "XhoI", recognitionSeq: "CTCGAG", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Xanthomonas holcicola", isPalindromic: true },
  { name: "PstI", recognitionSeq: "CTGCAG", cutOffset: 5, overhang: "3prime", overhangLength: 4, sourceOrganism: "Providencia stuartii 164", isPalindromic: true },
  { name: "SalI", recognitionSeq: "GTCGAC", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Streptomyces albus G", isPalindromic: true },
  { name: "SmaI", recognitionSeq: "CCCGGG", cutOffset: 3, overhang: "blunt", overhangLength: 0, sourceOrganism: "Serratia marcescens Sb", isPalindromic: true },
  { name: "EcoRV", recognitionSeq: "GATATC", cutOffset: 3, overhang: "blunt", overhangLength: 0, sourceOrganism: "Escherichia coli J62 pLG13", isPalindromic: true },
  { name: "KpnI", recognitionSeq: "GGTACC", cutOffset: 5, overhang: "3prime", overhangLength: 4, sourceOrganism: "Klebsiella pneumoniae OK8", isPalindromic: true },
  { name: "NcoI", recognitionSeq: "CCATGG", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Nocardia corallina", isPalindromic: true },
  { name: "BglII", recognitionSeq: "AGATCT", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Bacillus globigii", isPalindromic: true },
  { name: "SpeI", recognitionSeq: "ACTAGT", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Sphaerotilus natans", isPalindromic: true },
  { name: "XbaI", recognitionSeq: "TCTAGA", cutOffset: 1, overhang: "5prime", overhangLength: 4, sourceOrganism: "Xanthomonas badrii", isPalindromic: true },
  { name: "DpnI", recognitionSeq: "GATC", cutOffset: 2, overhang: "blunt", overhangLength: 0, sourceOrganism: "Diplococcus pneumoniae", isPalindromic: true },
  { name: "NdeI", recognitionSeq: "CATATG", cutOffset: 2, overhang: "5prime", overhangLength: 2, sourceOrganism: "Neisseria denitrificans", isPalindromic: true },
  { name: "BsaI", recognitionSeq: "GGTCTC", cutOffset: 7, overhang: "5prime", overhangLength: 4, sourceOrganism: "Bacillus stearothermophilus", isPalindromic: false },
  { name: "BsmBI", recognitionSeq: "CGTCTC", cutOffset: 7, overhang: "5prime", overhangLength: 4, sourceOrganism: "Bacillus stearothermophilus B61", isPalindromic: false },
  { name: "SacI", recognitionSeq: "GAGCTC", cutOffset: 5, overhang: "3prime", overhangLength: 4, sourceOrganism: "Streptomyces achromogenes", isPalindromic: true },
  { name: "ClaI", recognitionSeq: "ATCGAT", cutOffset: 2, overhang: "5prime", overhangLength: 2, sourceOrganism: "Caryophanon latum L", isPalindromic: true },
];

export function findCutSites(
  sequence: string,
  selectedEnzymes: string[] = []
): { cutSites: CutSite[]; enzymeSummary: Record<string, number> } {
  const cleanSeq = sequence.toUpperCase().replace(/[^ATCG]/g, "");
  const enzymesToScan = selectedEnzymes.length > 0
    ? COMMON_ENZYMES.filter((e) => selectedEnzymes.includes(e.name))
    : COMMON_ENZYMES;

  const cutSites: CutSite[] = [];
  const enzymeSummary: Record<string, number> = {};

  for (const enzyme of enzymesToScan) {
    enzymeSummary[enzyme.name] = 0;
    const motif = enzyme.recognitionSeq;
    let pos = cleanSeq.indexOf(motif, 0);

    while (pos !== -1) {
      const cutPos = pos + enzyme.cutOffset;
      const contextStart = Math.max(0, pos - 4);
      const contextEnd = Math.min(cleanSeq.length, pos + motif.length + 4);
      const context = cleanSeq.substring(contextStart, contextEnd);

      cutSites.push({
        enzyme: enzyme.name,
        position: cutPos + 1, // 1-based display
        cutIndex5: cutPos,
        cutIndex3: cutPos + enzyme.overhangLength,
        sequenceContext: context,
      });

      enzymeSummary[enzyme.name]++;
      pos = cleanSeq.indexOf(motif, pos + 1);
    }
  }

  // Sort cut sites by position
  cutSites.sort((a, b) => a.position - b.position);

  return { cutSites, enzymeSummary };
}

export function simulateDigestion(
  sequence: string,
  selectedEnzymes: string[],
  isCircular = false
): DigestionFragment[] {
  const cleanSeq = sequence.toUpperCase().replace(/[^ATCG]/g, "");
  const { cutSites } = findCutSites(cleanSeq, selectedEnzymes);

  if (cutSites.length === 0) {
    return [
      {
        fragmentIndex: 1,
        startPos: 1,
        endPos: cleanSeq.length,
        length: cleanSeq.length,
        sequence: cleanSeq,
        leftEnzyme: "None (Intact)",
        rightEnzyme: "None (Intact)",
      },
    ];
  }

  const fragments: DigestionFragment[] = [];

  if (!isCircular) {
    // Linear DNA digestion
    let currentStart = 0;
    let prevEnzyme = "5' Terminal";

    for (let i = 0; i < cutSites.length; i++) {
      const site = cutSites[i];
      const fragSeq = cleanSeq.substring(currentStart, site.cutIndex5);

      if (fragSeq.length > 0) {
        fragments.push({
          fragmentIndex: fragments.length + 1,
          startPos: currentStart + 1,
          endPos: site.cutIndex5,
          length: fragSeq.length,
          sequence: fragSeq,
          leftEnzyme: prevEnzyme,
          rightEnzyme: site.enzyme,
        });
      }

      currentStart = site.cutIndex5;
      prevEnzyme = site.enzyme;
    }

    // Trailing fragment
    if (currentStart < cleanSeq.length) {
      const trailingSeq = cleanSeq.substring(currentStart);
      fragments.push({
        fragmentIndex: fragments.length + 1,
        startPos: currentStart + 1,
        endPos: cleanSeq.length,
        length: trailingSeq.length,
        sequence: trailingSeq,
        leftEnzyme: prevEnzyme,
        rightEnzyme: "3' Terminal",
      });
    }
  }

  // Sort fragments by length descending (standard gel electrophoresis order)
  fragments.sort((a, b) => b.length - a.length);

  return fragments;
}
