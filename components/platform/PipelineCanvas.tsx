"use client";

import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  Clock,
  Settings,
  Plus,
  Trash2,
  Dna,
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Share2,
} from "lucide-react";

export interface PipelineNodeItem {
  id: string;
  title: string;
  category: "ingestion" | "filtering" | "kinetics" | "crispr" | "output";
  status: "idle" | "running" | "completed" | "error";
  description: string;
  metrics?: string;
  x: number;
  y: number;
}

const DEFAULT_NODES: PipelineNodeItem[] = [
  {
    id: "n1",
    title: "FASTA Sequence Ingestion",
    category: "ingestion",
    status: "completed",
    description: "Parses multi-sequence FASTA files with quality control trimming.",
    metrics: "120 bp Loaded",
    x: 40,
    y: 80,
  },
  {
    id: "n2",
    title: "GC Composition Filter",
    category: "filtering",
    status: "completed",
    description: "Evaluates nucleotide density; thresholds window to 40-65% GC.",
    metrics: "41.67% GC Passed",
    x: 340,
    y: 80,
  },
  {
    id: "n3",
    title: "SantaLucia NN Thermodynamics",
    category: "kinetics",
    status: "completed",
    description: "Computes duplex ΔG°37 free energy, Tm, and enthalpy parameters.",
    metrics: "Tm: 78.4°C · ΔG: -34.8",
    x: 640,
    y: 40,
  },
  {
    id: "n4",
    title: "SpCas9 Guide RNA Designer",
    category: "crispr",
    status: "completed",
    description: "Scans NGG PAMs and calculates Rule Set 2 on-target efficiency.",
    metrics: "6 Guides · Score 92/100",
    x: 640,
    y: 190,
  },
  {
    id: "n5",
    title: "Robotic Synthesis Dispatch",
    category: "output",
    status: "idle",
    description: "Compiles microfluidic liquid handler instructions for wet lab.",
    metrics: "Ready for Dispatch",
    x: 940,
    y: 115,
  },
];

export const PipelineCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<PipelineNodeItem[]>(DEFAULT_NODES);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleRunPipeline = async () => {
    setIsRunning(true);

    // Reset nodes to idle
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));

    for (let i = 0; i < nodes.length; i++) {
      setActiveStep(i);
      setNodes((prev) =>
        prev.map((n, idx) => (idx === i ? { ...n, status: "running" } : n))
      );
      await new Promise((r) => setTimeout(r, 650));
      setNodes((prev) =>
        prev.map((n, idx) => (idx === i ? { ...n, status: "completed" } : n))
      );
    }

    setIsRunning(false);
    setActiveStep(null);
  };

  const getCategoryColor = (cat: PipelineNodeItem["category"]) => {
    switch (cat) {
      case "ingestion":
        return "border-blue-500/40 text-blue-400 bg-blue-500/10";
      case "filtering":
        return "border-cyan-500/40 text-cyan-400 bg-cyan-500/10";
      case "kinetics":
        return "border-purple-500/40 text-purple-400 bg-purple-500/10";
      case "crispr":
        return "border-amber-500/40 text-amber-400 bg-amber-500/10";
      case "output":
        return "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      default:
        return "border-white/20 text-ink";
    }
  };

  return (
    <div className="rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border overflow-hidden shadow-2xl flex flex-col">
      {/* Canvas Top Bar */}
      <div className="p-4 border-b border-border bg-surface-elevated/50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-ink">
              Bio-Compute Execution Graph
            </h3>
            <p className="text-xs font-mono text-ink-muted">
              5 Connected Compute Nodes · Automated Kafka Event Streaming
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg ${
              isRunning
                ? "bg-purple-600/50 text-purple-200 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white hover:scale-105 shadow-blue-500/25"
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Pipeline ({activeStep! + 1}/5)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run In Silico Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Node Graph Area */}
      <div className="p-6 bg-void/60 min-h-[380px] overflow-x-auto relative custom-scrollbar">
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />

        <div className="flex items-center gap-6 min-w-[1000px] py-6 relative z-10">
          {nodes.map((node, index) => {
            const isCompleted = node.status === "completed";
            const isCurrent = node.status === "running";

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  className={`w-64 p-4 rounded-2xl bg-surface/90 border transition-all duration-300 shadow-xl relative ${
                    isCurrent
                      ? "border-accent-cyan ring-2 ring-accent-cyan/50 shadow-[0_0_30px_rgba(56,189,248,0.35)] scale-105"
                      : isCompleted
                      ? "border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "border-border opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md uppercase ${getCategoryColor(
                        node.category
                      )}`}
                    >
                      {node.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {isCurrent && (
                        <RefreshCw className="w-4 h-4 text-accent-cyan animate-spin" />
                      )}
                      {node.status === "idle" && (
                        <Clock className="w-4 h-4 text-ink-muted/50" />
                      )}
                    </div>
                  </div>

                  <h4 className="text-xs font-display font-bold text-ink mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed mb-3">
                    {node.description}
                  </p>

                  {node.metrics && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-ink-muted">Output:</span>
                      <span className="text-accent-cyan font-semibold">
                        {node.metrics}
                      </span>
                    </div>
                  )}
                </div>

                {/* Connection Arrow */}
                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center flex-shrink-0 text-blue-500/60">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500/60 to-indigo-500/60 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 border-solid border-l-blue-400 border-l-[6px] border-y-transparent border-y-[4px] border-r-0" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
