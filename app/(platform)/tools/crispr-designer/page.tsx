"use client";

import React, { useState } from "react";
import {
  Scissors,
  Dna,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Zap,
  Layers,
  ArrowRight,
} from "lucide-react";
import { designGuideRNAs, GuideRNA } from "@/lib/bioinformatics/crispr";

const SAMPLE_TARGET =
  "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC";

export default function CrisprDesignerPage() {
  const [targetSeq, setTargetSeq] = useState(SAMPLE_TARGET);
  const [minScore, setMinScore] = useState(40);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const cleanSeq = targetSeq.toUpperCase().replace(/[^ATCGU]/g, "");
  const guides: GuideRNA[] = designGuideRNAs(cleanSeq, minScore);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = "ID,Spacer(20nt),PAM(3nt),Strand,Start,End,CutSite,GC%,Score,Risk,PolyTWarning\n";
    const rows = guides
      .map(
        (g) =>
          `${g.id},${g.spacerSeq},${g.pamSeq},${g.strand},${g.startPos},${g.endPos},${g.cutSitePos},${g.gcContent}%,${g.onTargetScore},${g.offTargetTier},${g.hasPolyTWarning ? "YES" : "NO"}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `crispr_guides_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Scissors className="w-4 h-4" />
            <span>CRISPR Engineering Suite · SpCas9 NGG Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            CRISPR Guide RNA (sgRNA) Designer
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Automated SpCas9 PAM detection, Doench 2016 Rule Set 2 efficiency prediction, and off-target risk stratification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={guides.length === 0}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Target DNA Sequence Input */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-ink-muted">
            Target Genomic Exon DNA Sequence (Sense strand, 5&apos;→3&apos;):
          </label>
          <span className="text-xs font-mono text-accent-cyan font-bold">{cleanSeq.length} bp</span>
        </div>

        <textarea
          value={targetSeq}
          onChange={(e) => setTargetSeq(e.target.value)}
          rows={3}
          className="w-full p-4 rounded-xl bg-void border border-border text-xs font-mono text-ink placeholder:text-ink-muted/40 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all uppercase tracking-wider"
          placeholder="Paste target genomic sequence..."
        />

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-ink-muted">Minimum On-Target Score Filter:</span>
            <input
              type="range"
              min={20}
              max={80}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-32 accent-blue-500 cursor-pointer"
            />
            <span className="text-accent-cyan font-bold">{minScore} / 100</span>
          </div>

          <div className="text-ink-muted">
            Found <span className="text-emerald-400 font-bold">{guides.length}</span> sgRNA candidates
          </div>
        </div>
      </div>

      {/* Candidate Guides Results Table */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border shadow-xl space-y-4">
        <h2 className="text-base font-display font-bold text-ink flex items-center justify-between pb-3 border-b border-border">
          <span>Ranked Guide RNA Candidates (Doench 2016 Rule Set 2)</span>
          <span className="text-xs font-mono text-ink-muted">SpCas9 (NGG PAM)</span>
        </h2>

        {guides.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-ink-muted space-y-2">
            <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto" />
            <p>No candidate guides met the minimum score threshold ({minScore}/100).</p>
            <p className="text-[11px]">Lower the threshold slider or verify target sequence contains NGG PAM motifs.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-ink-muted font-mono uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Guide ID</th>
                  <th className="pb-3">20-nt Spacer Sequence</th>
                  <th className="pb-3">PAM</th>
                  <th className="pb-3">Strand</th>
                  <th className="pb-3">Cut Pos</th>
                  <th className="pb-3">GC %</th>
                  <th className="pb-3">On-Target Score</th>
                  <th className="pb-3">Off-Target Tier</th>
                  <th className="pb-3 text-right">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {guides.map((g, idx) => (
                  <tr key={g.id} className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="py-3 font-mono text-accent-cyan font-semibold">{g.id}</td>
                    <td className="py-3 font-mono text-ink font-bold tracking-wider">
                      {g.spacerSeq}
                    </td>
                    <td className="py-3 font-mono text-amber-300 font-bold">{g.pamSeq}</td>
                    <td className="py-3 font-mono text-ink-muted capitalize">{g.strand}</td>
                    <td className="py-3 font-mono text-ink-muted">Pos {g.cutSitePos}</td>
                    <td className="py-3 font-mono text-ink-muted">{g.gcContent}%</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400">{g.onTargetScore}</span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-emerald-400"
                            style={{ width: `${g.onTargetScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          g.offTargetTier === "Low Risk"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : g.offTargetTier === "Moderate Risk"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {g.offTargetTier}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleCopy(g.spacerSeq, idx)}
                        className="p-1.5 rounded-lg bg-surface-elevated hover:bg-slate-800 text-ink-muted hover:text-ink transition-colors"
                        title="Copy guide sequence"
                      >
                        {copiedIdx === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
