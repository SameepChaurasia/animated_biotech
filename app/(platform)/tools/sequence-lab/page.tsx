"use client";

import React, { useState, useEffect } from "react";
import {
  Binary,
  RotateCw,
  Sparkles,
  Scissors,
  Save,
  Download,
  Dna,
  RefreshCw,
  Flame,
  CheckCircle2,
  Atom,
  Layers,
  ArrowRight,
} from "lucide-react";
import { SequenceEditor } from "@/components/platform/SequenceEditor";
import { calculateThermodynamics, getReverseComplement } from "@/lib/bioinformatics/thermodynamics";
import { alignSequences } from "@/lib/bioinformatics/alignment";
import { findCutSites, simulateDigestion } from "@/lib/bioinformatics/restriction";
import { findORFs } from "@/lib/bioinformatics/orf";

export default function SequenceLabPage() {
  const [sequence, setSequence] = useState<string>(
    "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC"
  );
  const [activeTab, setActiveTab] = useState<"thermo" | "alignment" | "restriction" | "orf">("thermo");
  const [alignTarget, setAlignTarget] = useState<string>(
    "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGATGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC"
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const cleanSeq = sequence.toUpperCase().replace(/[^ATCGU]/g, "");
  const metrics = calculateThermodynamics(cleanSeq);
  const alignmentResult = alignSequences(cleanSeq, alignTarget, "global");
  const { cutSites } = findCutSites(cleanSeq);
  const digestionFragments = simulateDigestion(cleanSeq, ["EcoRI", "BamHI", "HindIII", "NotI"]);
  const orfs = findORFs(cleanSeq, 6);

  const [vaultSequences, setVaultSequences] = useState<any[]>([]);
  const [selectedVaultId, setSelectedVaultId] = useState<string>("");

  const loadVaultSequences = () => {
    fetch("/api/sequences")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setVaultSequences(data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadVaultSequences();
  }, []);

  const handleSelectVaultSeq = (seqId: string) => {
    setSelectedVaultId(seqId);
    const found = vaultSequences.find((s) => s.id === seqId);
    if (found && found.nucleotides) {
      setSequence(found.nucleotides);
    }
  };

  const handleSaveToDatabase = async () => {
    try {
      const res = await fetch("/api/sequences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Sequence Analysis ${cleanSeq.substring(0, 8)}...`,
          nucleotides: cleanSeq,
          type: "DNA",
          notes: `Computed in Sequence Lab (Tm: ${metrics.meltingTemp}°C, ΔG: ${metrics.freeEnergy} kcal/mol)`,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        loadVaultSequences();
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan mb-1">
            <Binary className="w-4 h-4" />
            <span>Bioinformatics Workbench · Version 2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            DNA &amp; RNA Sequence Laboratory
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Real-time biophysical kinetics, dynamic programming sequence alignment, restriction mapping, and ORF translation backed by PostgreSQL.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {vaultSequences.length > 0 && (
            <select
              value={selectedVaultId}
              onChange={(e) => handleSelectVaultSeq(e.target.value)}
              aria-label="Load sequence from Vault"
              className="px-3 py-2 rounded-xl bg-surface-elevated border border-border text-xs font-mono text-ink focus:outline-none focus:border-accent-blue"
            >
              <option value="">📂 Load from Vault ({vaultSequences.length} saved)...</option>
              {vaultSequences.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.accession || `${s.length} bp`})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleSaveToDatabase}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved to Vault</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save to Vault</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Sequence Editor */}
      <SequenceEditor
        initialSequence={sequence}
        onSequenceChange={(newSeq) => setSequence(newSeq)}
      />

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto custom-scrollbar">
        {[
          { id: "thermo", label: "SantaLucia NN Kinetics", icon: Flame },
          { id: "alignment", label: "Pairwise Homology Align", icon: Sparkles },
          { id: "restriction", label: "Restriction Digest & Gel", icon: Scissors },
          { id: "orf", label: "6-Frame ORF Translation", icon: Atom },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/20 text-accent-cyan border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)] font-semibold"
                  : "text-ink-muted hover:text-ink hover:bg-surface-elevated border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: SantaLucia Thermodynamics */}
      {activeTab === "thermo" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4 md:col-span-2">
            <h3 className="text-sm font-display font-bold text-ink flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              SantaLucia (1998) Nearest-Neighbor Thermodynamic Profile
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Unified Nearest-Neighbor model predicting melting temperatures and Gibbs free energy for hybridizing oligonucleotide duplexes with 50mM monovalent salt and 1.5mM Mg2+.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Melting Temperature</span>
                <p className="text-2xl font-display font-bold text-amber-400">{metrics.meltingTemp}°C</p>
                <span className="text-[10px] font-mono text-ink-muted/70">50% duplex denatured</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Free Energy ($\Delta G^\circ_{37}$)</span>
                <p className="text-2xl font-display font-bold text-cyan-400">{metrics.freeEnergy}</p>
                <span className="text-[10px] font-mono text-ink-muted/70">kcal / mol at 37°C</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Enthalpy ($\Delta H^\circ$)</span>
                <p className="text-2xl font-display font-bold text-purple-400">{metrics.enthalpy}</p>
                <span className="text-[10px] font-mono text-ink-muted/70">kcal / mol</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Entropy ($\Delta S^\circ$)</span>
                <p className="text-2xl font-display font-bold text-emerald-400">{metrics.entropy}</p>
                <span className="text-[10px] font-mono text-ink-muted/70">cal / (K·mol)</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Dissociation Constant ($K_d$)</span>
                <p className="text-2xl font-display font-bold text-indigo-400">{metrics.kd}</p>
                <span className="text-[10px] font-mono text-ink-muted/70">nM affinity</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Molecular Weight</span>
                <p className="text-2xl font-display font-bold text-ink">{metrics.molecularWeight}</p>
                <span className="text-[10px] font-mono text-ink-muted/70">g / mol (ssDNA)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4">
            <h3 className="text-sm font-display font-bold text-ink">Base Composition</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-accent-cyan">GC Content</span>
                  <span className="font-bold text-ink">{metrics.gcContent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                  <div className="h-full bg-accent-cyan" style={{ width: `${metrics.gcContent}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-rose-400">AT Content</span>
                  <span className="font-bold text-ink">{metrics.atContent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                  <div className="h-full bg-rose-400" style={{ width: `${metrics.atContent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pairwise Alignment */}
      {activeTab === "alignment" && (
        <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-display font-bold text-ink">
                Needleman-Wunsch Global Pairwise Alignment
              </h3>
              <p className="text-xs text-ink-muted">
                Dynamic programming matrix alignment comparing Query vs Reference Target.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-emerald-400 font-bold">Identity: {alignmentResult.identityPercentage}%</span>
              <span className="text-accent-cyan font-bold">Score: {alignmentResult.score}</span>
              <span className="text-ink-muted">Gaps: {alignmentResult.gapCount}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-ink-muted mb-2">
              Reference Target Sequence:
            </label>
            <input
              type="text"
              value={alignTarget}
              onChange={(e) => setAlignTarget(e.target.value.toUpperCase().replace(/[^ATCGU]/g, ""))}
              className="w-full px-4 py-2 rounded-xl bg-void border border-border text-xs font-mono text-ink uppercase"
            />
          </div>

          <div className="p-4 rounded-xl bg-void font-mono text-xs overflow-x-auto custom-scrollbar border border-white/10 space-y-1">
            <div className="text-blue-400">Query: {alignmentResult.alignedSeq1}</div>
            <div className="text-emerald-400 font-black tracking-widest pl-14">{alignmentResult.matchLine}</div>
            <div className="text-purple-400">Targt: {alignmentResult.alignedSeq2}</div>
          </div>
        </div>
      )}

      {/* Tab 3: Restriction Digest */}
      {activeTab === "restriction" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4">
            <h3 className="text-sm font-display font-bold text-ink flex items-center gap-2">
              <Scissors className="w-4 h-4 text-accent-cyan" />
              Restriction Endonuclease Cut Sites ({cutSites.length} Identified)
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
              {cutSites.length === 0 ? (
                <p className="text-xs text-ink-muted">No standard commercial restriction sites found in sequence.</p>
              ) : (
                cutSites.map((site, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-elevated/70 border border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-accent-cyan">{site.enzyme}</span>
                    <span className="text-ink-muted">Cut @ Pos {site.position}</span>
                    <span className="text-purple-300">...{site.sequenceContext}...</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4">
            <h3 className="text-sm font-display font-bold text-ink">
              Simulated Agarose Gel Electrophoresis
            </h3>
            <div className="p-4 rounded-xl bg-void border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-ink-muted block pb-2 border-b border-white/5">
                DNA Fragment Bands (Sorted by Length Descending):
              </span>
              {digestionFragments.map((frag, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-mono">
                  <span className="w-16 text-accent-lime font-bold">{frag.length} bp</span>
                  <div className="flex-1 h-3 rounded-full bg-slate-900 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      style={{ width: `${Math.min((frag.length / cleanSeq.length) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-ink-muted">{frag.leftEnzyme} → {frag.rightEnzyme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: ORF Translation */}
      {activeTab === "orf" && (
        <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4">
          <h3 className="text-sm font-display font-bold text-ink flex items-center gap-2">
            <Atom className="w-4 h-4 text-purple-400" />
            6-Frame Open Reading Frames ({orfs.length} Found)
          </h3>
          <div className="space-y-3">
            {orfs.length === 0 ? (
              <p className="text-xs text-ink-muted">No Open Reading Frames exceeding minimum amino acid threshold found.</p>
            ) : (
              orfs.map((orf, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-purple-400">{orf.id} (Frame {orf.frame}, {orf.strand})</span>
                    <span className="text-ink-muted">Pos {orf.startPos}..{orf.endPos} ({orf.lengthAa} aa · {orf.molecularWeightKDa} kDa)</span>
                  </div>
                  <div className="font-mono text-xs text-accent-cyan break-all bg-void p-3 rounded-lg border border-white/5">
                    {orf.aminoAcidSeq}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
