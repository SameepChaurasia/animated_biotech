"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Bell,
  RefreshCw,
  Terminal,
  Layers,
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("cb_live_948f294029482049182390");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Banner */}
      <div className="pb-6 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan mb-1">
          <Settings className="w-4 h-4" />
          <span>Workstation Configuration &amp; Infrastructure Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
          Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          Manage API keys, database connection pooling, Kafka cluster brokers, and bio-compute worker nodes.
        </p>
      </div>

      {/* Cluster Infrastructure Status */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border shadow-xl space-y-4">
        <h2 className="text-base font-display font-bold text-ink flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          <span>Distributed Microservices Infrastructure</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">PostgreSQL 16</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            </div>
            <p className="text-[11px] text-ink-muted/80">Prisma Client v7.9 · Connection Pooling Active</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">MongoDB 7.0</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
            <p className="text-[11px] text-ink-muted/80">Chat session logs &amp; unstructured JSON store</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Apache Kafka</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-ink-muted/80">kafkajs / EventBus dual-mode broker</p>
          </div>
        </div>
      </div>

      {/* API Key Management */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border shadow-xl space-y-4">
        <h2 className="text-base font-display font-bold text-ink flex items-center gap-2">
          <Key className="w-4 h-4 text-accent-cyan" />
          <span>Biotech Compute REST API Key</span>
        </h2>
        <p className="text-xs text-ink-muted leading-relaxed font-sans">
          Use this secret key to authenticate programmatic requests from Python bio-scripts, Nextflow pipelines, or Zapier webhooks.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-ink-muted mb-1">Secret Key Token:</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs font-mono text-accent-cyan focus:outline-none focus:border-accent-blue"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Key Updated</span>
                </>
              ) : (
                <span>Regenerate API Key</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Security & Regulatory Standards */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border shadow-xl space-y-3 text-xs">
        <h2 className="text-sm font-display font-bold text-ink flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent-cyan" />
          <span>Bio-Safety &amp; Compliance Standards</span>
        </h2>
        <p className="text-ink-muted leading-relaxed">
          Codex Bio enforces strict dual-use research screening for pathogenic nucleotide sequences. Automated compliance checks run before in silico synthesis approval.
        </p>
      </div>
    </div>
  );
}
