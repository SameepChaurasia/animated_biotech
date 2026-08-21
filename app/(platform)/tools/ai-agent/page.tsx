"use client";

import React from "react";
import { Bot, Sparkles, Dna, Terminal, ShieldCheck, Zap, Layers } from "lucide-react";
import { ChatInterface } from "@/components/platform/ChatInterface";

export default function AiAgentPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Bot className="w-4 h-4" />
            <span>Autonomous Genomics Copilot · Vercel AI SDK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            AI Computational Biology Agent
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Domain-specialized AI agent equipped with live biophysics calculators, SantaLucia thermodynamic solvers, and CRISPR guide designers.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LLM Tool Execution: Enabled</span>
        </div>
      </div>

      {/* Main Interactive Chat Workstation */}
      <ChatInterface />

      {/* Agent Capability Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-2">
          <span className="text-xs font-mono text-accent-cyan font-bold uppercase block">
            01 · Deterministic Tools
          </span>
          <h3 className="text-sm font-display font-bold text-ink">No Scientific Hallucinations</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            All numerical values ($\Delta G$, $T_m$, guide scores) are computed directly by deterministic TypeScript algorithms, not estimated by language models.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-2">
          <span className="text-xs font-mono text-purple-400 font-bold uppercase block">
            02 · Multi-Omics Context
          </span>
          <h3 className="text-sm font-display font-bold text-ink">Domain-Trained Architecture</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Pre-loaded with deep knowledge of 64 standard codons, SpCas9/Cas12a PAM specifications, and nearest-neighbor duplex kinetics.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
            03 · Session Persistence
          </span>
          <h3 className="text-sm font-display font-bold text-ink">MongoDB Conversation Store</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Conversational transcripts and tool output payloads are logged for compliance, auditability, and team collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}
