"use client";

import React, { useState } from "react";
import {
  Workflow,
  Plus,
  Play,
  Save,
  CheckCircle2,
  Sparkles,
  Layers,
  Zap,
  Box,
  Cpu,
  Clock,
  ArrowRight,
} from "lucide-react";
import { PipelineCanvas } from "@/components/platform/PipelineCanvas";

export default function PipelineBuilderPage() {
  const [pipelineName, setPipelineName] = useState("De Novo Lead Target Discovery Pipeline");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePipeline = async () => {
    try {
      const res = await fetch("/api/pipelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pipelineName,
          description: "Automated sequence ingestion to CRISPR validation pipeline",
          nodes: [],
          edges: [],
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
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
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Workflow className="w-4 h-4" />
            <span>Visual Bioinformatics Workflow Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            In Silico Pipeline Builder
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Assemble multi-step computational biology nodes connected with Apache Kafka event streams.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSavePipeline}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Pipeline Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Node Graph Canvas */}
      <PipelineCanvas />

      {/* Execution Architecture Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-display font-bold text-ink">Asynchronous Worker Node</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Express.js background worker processes CPU-intensive sequence alignments and thermodynamic simulations via Kafka topics.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-display font-bold text-ink">Zero-Blocking Execution</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Pipelines run decoupled from the HTTP cycle with real-time SSE progress streaming directly to the browser.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-display font-bold text-ink">Audit-Ready Telemetry</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Every step outputs machine-readable JSON logs stored in MongoDB and PostgreSQL for reproducible science.
          </p>
        </div>
      </div>
    </div>
  );
}
