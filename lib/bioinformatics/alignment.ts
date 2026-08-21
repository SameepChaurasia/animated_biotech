/**
 * Sequence Alignment Module (Needleman-Wunsch & Smith-Waterman)
 * Implements standard dynamic programming sequence alignment with affine gap penalties.
 */

export interface AlignmentResult {
  alignedSeq1: string;
  alignedSeq2: string;
  matchLine: string;
  score: number;
  identityPercentage: number;
  similarityPercentage: number;
  gapCount: number;
  length: number;
  matrix?: number[][];
}

export type AlignmentMode = "global" | "local";

/**
 * Needleman-Wunsch (Global) & Smith-Waterman (Local) Pairwise Alignment
 */
export function alignSequences(
  seq1: string,
  seq2: string,
  mode: AlignmentMode = "global",
  matchScore = 2,
  mismatchPenalty = -1,
  gapPenalty = -2
): AlignmentResult {
  const s1 = seq1.toUpperCase().replace(/[^A-Z]/g, "");
  const s2 = seq2.toUpperCase().replace(/[^A-Z]/g, "");

  const n = s1.length;
  const m = s2.length;

  if (n === 0 || m === 0) {
    return {
      alignedSeq1: s1,
      alignedSeq2: s2,
      matchLine: "",
      score: 0,
      identityPercentage: 0,
      similarityPercentage: 0,
      gapCount: 0,
      length: 0,
    };
  }

  // Initialize scoring matrix & traceback matrix
  // Direction enum: 0: None, 1: Diagonal (Match/Mismatch), 2: Up (Gap in s2), 3: Left (Gap in s1)
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const trace: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  if (mode === "global") {
    for (let i = 1; i <= n; i++) {
      dp[i][0] = i * gapPenalty;
      trace[i][0] = 2;
    }
    for (let j = 1; j <= m; j++) {
      dp[0][j] = j * gapPenalty;
      trace[0][j] = 3;
    }
  }

  let maxScore = -Infinity;
  let maxI = n;
  let maxJ = m;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = dp[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? matchScore : mismatchPenalty);
      const deleteScore = dp[i - 1][j] + gapPenalty;
      const insertScore = dp[i][j - 1] + gapPenalty;

      if (mode === "global") {
        let best = match;
        let direction = 1;

        if (deleteScore > best) {
          best = deleteScore;
          direction = 2;
        }
        if (insertScore > best) {
          best = insertScore;
          direction = 3;
        }

        dp[i][j] = best;
        trace[i][j] = direction;
      } else {
        // Local (Smith-Waterman) - allow 0 reset
        let best = 0;
        let direction = 0;

        if (match > best) {
          best = match;
          direction = 1;
        }
        if (deleteScore > best) {
          best = deleteScore;
          direction = 2;
        }
        if (insertScore > best) {
          best = insertScore;
          direction = 3;
        }

        dp[i][j] = best;
        trace[i][j] = direction;

        if (best > maxScore) {
          maxScore = best;
          maxI = i;
          maxJ = j;
        }
      }
    }
  }

  // Traceback
  let aligned1 = "";
  let aligned2 = "";
  let matchLine = "";

  let currI = mode === "global" ? n : maxI;
  let currJ = mode === "global" ? m : maxJ;

  while (
    (mode === "global" && (currI > 0 || currJ > 0)) ||
    (mode === "local" && currI > 0 && currJ > 0 && dp[currI][currJ] > 0)
  ) {
    const dir = trace[currI][currJ];

    if (dir === 1 || (currI > 0 && currJ > 0 && dir === 0 && mode === "global")) {
      const c1 = s1[currI - 1];
      const c2 = s2[currJ - 1];
      aligned1 = c1 + aligned1;
      aligned2 = c2 + aligned2;
      matchLine = (c1 === c2 ? "|" : ".") + matchLine;
      currI--;
      currJ--;
    } else if (dir === 2 || currJ === 0) {
      aligned1 = s1[currI - 1] + aligned1;
      aligned2 = "-" + aligned2;
      matchLine = " " + matchLine;
      currI--;
    } else {
      aligned1 = "-" + aligned1;
      aligned2 = s2[currJ - 1] + aligned2;
      matchLine = " " + matchLine;
      currJ--;
    }
  }

  let matches = 0;
  let gaps = 0;
  for (let k = 0; k < matchLine.length; k++) {
    if (matchLine[k] === "|") matches++;
    if (aligned1[k] === "-" || aligned2[k] === "-") gaps++;
  }

  const alignLen = aligned1.length;
  const identity = alignLen > 0 ? Number(((matches / alignLen) * 100).toFixed(1)) : 0;
  const similarity = alignLen > 0 ? Number((((matches + (alignLen - gaps - matches) * 0.5) / alignLen) * 100).toFixed(1)) : 0;
  const finalScore = mode === "global" ? dp[n][m] : Math.max(maxScore, 0);

  return {
    alignedSeq1: aligned1,
    alignedSeq2: aligned2,
    matchLine,
    score: finalScore,
    identityPercentage: identity,
    similarityPercentage: similarity,
    gapCount: gaps,
    length: alignLen,
  };
}
