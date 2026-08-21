/**
 * SantaLucia (1998) Unified Nearest-Neighbor Thermodynamic Parameters for DNA
 * All enthalpies in kcal/mol, entropies in cal/(K·mol)
 */

export interface ThermodynamicMetrics {
  length: number;
  gcContent: number;
  atContent: number;
  meltingTemp: number; // in °C
  freeEnergy: number;  // ΔG°37 in kcal/mol
  enthalpy: number;    // ΔH° in kcal/mol
  entropy: number;     // ΔS° in cal/(K·mol)
  kd: number;          // Dissociation constant Kd in nM
  duplexStabilityIndex: number; // 0-100 score
  molecularWeight: number; // g/mol (ssDNA)
  extinctionCoefficient: number; // L/(mol·cm) at 260nm
}

// SantaLucia (1998) NN parameters: [ΔH° (kcal/mol), ΔS° (cal/(K·mol))]
const NN_PARAMS: Record<string, [number, number]> = {
  AA: [-7.9, -22.2],
  TT: [-7.9, -22.2],
  AT: [-7.2, -20.4],
  TA: [-7.2, -21.3],
  CA: [-8.5, -22.7],
  TG: [-8.5, -22.7],
  GT: [-8.4, -22.4],
  AC: [-8.4, -22.4],
  CT: [-7.8, -21.0],
  AG: [-7.8, -21.0],
  GA: [-8.2, -22.2],
  TC: [-8.2, -22.2],
  CG: [-10.6, -27.2],
  GC: [-9.8, -24.4],
  GG: [-8.0, -19.9],
  CC: [-8.0, -19.9],
};

// Initiation with terminal A-T / G-C pairs
const INIT_GC: [number, number] = [0.1, -2.8];
const INIT_AT: [number, number] = [2.3, 4.1];

export function calculateThermodynamics(
  rawSequence: string,
  monovalentIonMolar = 0.05, // 50 mM Na+
  magnesiumMolar = 0.0015,   // 1.5 mM Mg2+
  oligoConcentrationMolar = 0.0000005 // 0.5 µM
): ThermodynamicMetrics {
  const cleanSeq = rawSequence.toUpperCase().replace(/[^ATCG]/g, "");

  if (cleanSeq.length < 2) {
    return {
      length: cleanSeq.length,
      gcContent: 0,
      atContent: 0,
      meltingTemp: 0,
      freeEnergy: 0,
      enthalpy: 0,
      entropy: 0,
      kd: 0,
      duplexStabilityIndex: 0,
      molecularWeight: cleanSeq.length * 330,
      extinctionCoefficient: 0,
    };
  }

  const length = cleanSeq.length;
  let gCount = 0;
  let cCount = 0;
  let aCount = 0;
  let tCount = 0;

  for (let i = 0; i < length; i++) {
    const base = cleanSeq[i];
    if (base === "G") gCount++;
    else if (base === "C") cCount++;
    else if (base === "A") aCount++;
    else if (base === "T") tCount++;
  }

  const gcContent = Number((((gCount + cCount) / length) * 100).toFixed(2));
  const atContent = Number((100 - gcContent).toFixed(2));

  // NN Enthalpy and Entropy summation
  let deltaH = 0; // kcal/mol
  let deltaS = 0; // cal/(K·mol)

  for (let i = 0; i < length - 1; i++) {
    const doublet = cleanSeq.slice(i, i + 2);
    const params = NN_PARAMS[doublet] || [-8.0, -22.0];
    deltaH += params[0];
    deltaS += params[1];
  }

  // Terminal base initiation
  const firstBase = cleanSeq[0];
  const lastBase = cleanSeq[length - 1];

  if (firstBase === "G" || firstBase === "C") {
    deltaH += INIT_GC[0];
    deltaS += INIT_GC[1];
  } else {
    deltaH += INIT_AT[0];
    deltaS += INIT_AT[1];
  }

  if (lastBase === "G" || lastBase === "C") {
    deltaH += INIT_GC[0];
    deltaS += INIT_GC[1];
  } else {
    deltaH += INIT_AT[0];
    deltaS += INIT_AT[1];
  }

  // Salt correction for entropy (Owczarzy et al. 2004)
  const effectiveSalt = monovalentIonMolar + 120 * Math.sqrt(magnesiumMolar);
  const saltCorrection = 0.368 * (length - 1) * Math.log(effectiveSalt);
  deltaS += saltCorrection;

  // Temperature in Kelvin for 37°C (310.15 K)
  const T = 310.15;
  const deltaG37 = deltaH - (T * deltaS) / 1000; // kcal/mol

  // Melting temperature calculation
  const R = 1.9872; // cal/(K·mol)
  const lnCt = Math.log(oligoConcentrationMolar / 4);
  let tm = (deltaH * 1000) / (deltaS + R * lnCt) - 273.15;

  if (isNaN(tm) || tm < 0) tm = 0;
  if (tm > 105) tm = 105;

  // Dissociation constant Kd at 37°C
  const kdMolar = Math.exp((deltaG37 * 1000) / (R * T));
  const kdNm = Math.min(Math.max(kdMolar * 1e9, 0.001), 999999);

  // Duplex stability index (0-100)
  const stabilityIndex = Math.min(
    Math.max(Math.round((Math.abs(deltaG37) / (length * 1.6)) * 100), 5),
    99
  );

  // Molecular weight of ssDNA
  const mw = aCount * 313.21 + tCount * 304.2 + cCount * 289.18 + gCount * 329.21 - 61.96;

  // Extinction coefficient at 260nm
  const extinctionCoeff = aCount * 15400 + cCount * 7400 + gCount * 11500 + tCount * 8700;

  return {
    length,
    gcContent,
    atContent,
    meltingTemp: Number(tm.toFixed(1)),
    freeEnergy: Number(deltaG37.toFixed(2)),
    enthalpy: Number(deltaH.toFixed(2)),
    entropy: Number(deltaS.toFixed(2)),
    kd: Number(kdNm.toFixed(2)),
    duplexStabilityIndex: stabilityIndex,
    molecularWeight: Number(mw.toFixed(1)),
    extinctionCoefficient: extinctionCoeff,
  };
}

export function getReverseComplement(sequence: string): string {
  const compMap: Record<string, string> = {
    A: "T",
    T: "A",
    C: "G",
    G: "C",
    U: "A",
    N: "N",
  };
  return sequence
    .toUpperCase()
    .split("")
    .reverse()
    .map((char) => compMap[char] || char)
    .join("");
}
