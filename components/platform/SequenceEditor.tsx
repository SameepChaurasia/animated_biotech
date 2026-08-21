"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  RotateCw,
  Scissors,
  Sparkles,
  Download,
  Flame,
  Zap,
  Dna,
} from "lucide-react";
import { calculateThermodynamics, getReverseComplement } from "@/lib/bioinformatics/thermodynamics";
import { translateDnaToProtein } from "@/lib/bioinformatics/orf";

interface SequenceEditorProps {
  initialSequence?: string;
  onSequenceChange?: (seq: string) => void;
  title?: string;
}

export const SequenceEditor: React.FC<SequenceEditorProps> = ({
  initialSequence = "ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCC",
  onSequenceChange,
  title = "Nucleotide Sequence Workbench",
}) => {
  const [sequence, setSequence] = useState(initialSequence);
  const [copied, setCopied] = useState(false);
  const [showRevComp, setShowRevComp] = useState(false);

  const cleanSeq = sequence.toUpperCase().replace(/[^ATCGU]/g, "");
  const metrics = calculateThermodynamics(cleanSeq);
  const protein = translateDnaToProtein(cleanSeq);
  const revComp = getReverseComplement(cleanSeq);

  const handleChange = (val: string) => {
    const sanitized = val.toUpperCase().replace(/[^ATCGU\n\r\s]/g, "");
    setSequence(sanitized);
    if (onSequenceChange) onSequenceChange(sanitized);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanSeq);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFASTA = () => {
    const fastaContent = `>CodexBio_Sequence_${Date.now()} | length=${cleanSeq.length}bp | GC=${metrics.gcContent}%\n${cleanSeq.match(/.{1,60}/g)?.join("\n") || cleanSeq}`;
    const blob = new Blob([fastaContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sequence_${Date.now()}.fasta`;
    a.click();
  };

  // Colorize bases
  const renderColorizedBases = (seq: string) => {
    return (
      <div className="font-mono text-xs sm:text-sm tracking-widest break-all leading-relaxed p-4 bg-void/90 rounded-xl border border-white/10 select-all overflow-x-auto max-h-48 custom-scrollbar">
        {seq.split("").map((base, idx) => {
          let color = "text-ink";
          if (base === "A") color = "text-emerald-400 font-semibold";
          else if (base === "T" || base === "U") color = "text-rose-400 font-semibold";
          else if (base === "C") color = "text-blue-400 font-semibold";
          else if (base === "G") color = "text-amber-300 font-semibold";

          return (
            <span key={idx} className={`${color} hover:bg-white/20 rounded px-0.5 transition-colors cursor-pointer`} title={`Pos ${idx + 1}: ${base}`}>
              {base}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-5 shadow-2xl">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-accent-cyan">
            <Dna className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-display font-bold text-ink">{title}</h2>
            <p className="text-xs font-mono text-ink-muted">
              Length: <span className="text-accent-cyan font-bold">{metrics.length} bp</span> · GC:{" "}
              <span className="text-accent-lime font-bold">{metrics.gcContent}%</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRevComp(!showRevComp)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-colors flex items-center gap-1.5 ${
              showRevComp
                ? "bg-accent-cyan/20 border-accent-cyan text-accent-cyan"
                : "bg-surface-elevated border-white/10 text-ink-muted hover:text-ink"
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>5&apos;→3&apos; RevComp</span>
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl text-xs font-mono bg-surface-elevated hover:bg-slate-800 border border-white/10 text-ink flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-ink-muted" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleDownloadFASTA}
            className="px-3 py-1.5 rounded-xl text-xs font-mono bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium flex items-center gap-1.5 shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export FASTA</span>
          </button>
        </div>
      </div>

      {/* Interactive Textarea Input */}
      <div>
        <label className="block text-xs font-mono text-ink-muted mb-2">
          Interactive Nucleotide Sequence (A, T, C, G, U):
        </label>
        <textarea
          value={sequence}
          onChange={(e) => handleChange(e.target.value)}
          rows={3}
          className="w-full p-4 rounded-xl bg-void border border-border text-xs font-mono text-ink placeholder:text-ink-muted/40 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all uppercase tracking-wider"
          placeholder="Paste or type raw nucleotide sequence..."
        />
      </div>

      {/* Colorized Nucleotide Display */}
      <div>
        <span className="block text-xs font-mono text-ink-muted mb-2">
          {showRevComp ? "Antisense Reverse Complement (5' -> 3'):" : "Color-Coded Sense Sequence (5' -> 3'):"}
        </span>
        {renderColorizedBases(showRevComp ? revComp : cleanSeq)}
      </div>

      {/* Live Thermodynamics Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-surface-elevated/70 border border-white/5">
          <span className="text-[11px] font-mono text-ink-muted block">Melting Temp ($T_m$)</span>
          <span className="text-lg font-display font-bold text-amber-400">{metrics.meltingTemp}°C</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-elevated/70 border border-white/5">
          <span className="text-[11px] font-mono text-ink-muted block">Free Energy ($\Delta G^\circ$)</span>
          <span className="text-lg font-display font-bold text-cyan-400">{metrics.freeEnergy} kcal/mol</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-elevated/70 border border-white/5">
          <span className="text-[11px] font-mono text-ink-muted block">Dissociation ($K_d$)</span>
          <span className="text-lg font-display font-bold text-indigo-400">{metrics.kd} nM</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-elevated/70 border border-white/5">
          <span className="text-[11px] font-mono text-ink-muted block">Duplex Stability</span>
          <span className="text-lg font-display font-bold text-emerald-400">{metrics.duplexStabilityIndex}/100</span>
        </div>
      </div>

      {/* Protein Translation Display */}
      {protein && (
        <div className="p-4 rounded-xl bg-surface-elevated/40 border border-border">
          <span className="text-xs font-mono text-ink-muted block mb-1">
            Frame +1 Translation ({protein.length} aa):
          </span>
          <span className="font-mono text-xs text-purple-300 break-all">{protein}</span>
        </div>
      )}
    </div>
  );
};
