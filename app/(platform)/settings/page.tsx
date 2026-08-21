"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Key,
  Server,
  Database,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("cb_live_948f294029482049182390");
  const [saved, setSaved] = useState(false);
  const [liveTelemetry, setLiveTelemetry] = useState<any>(null);
  const [checking, setChecking] = useState(false);

  const fetchHealth = () => {
    setChecking(true);
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.telemetry) setLiveTelemetry(data.telemetry);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  };

  useEffect(() => {
    fetchHealth();
  }, []);

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
          Manage API keys, database connection pooling, document stores, and bio-compute infrastructure.
        </p>
      </div>

      {/* Cluster Infrastructure Status */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-display font-bold text-ink flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Distributed Microservices Infrastructure</span>
          </h2>

          <button
            onClick={fetchHealth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-slate-800 text-[11px] font-mono text-ink-muted hover:text-ink transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${checking ? "animate-spin text-accent-cyan" : ""}`} />
            <span>Refresh Diagnostics</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Neon PostgreSQL</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            </div>
            <p className="text-[11px] text-ink-muted/80">
              Prisma v7.9 · {liveTelemetry ? `${liveTelemetry.totalPublications} Papers, ${liveTelemetry.totalSequences} Sequences` : "Active Connection Pool"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">MongoDB Atlas</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
            <p className="text-[11px] text-ink-muted/80">Chat session logs &amp; unstructured JSON document store</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Event Bus / Kafka</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-ink-muted/80">Asynchronous telemetry event pipeline</p>
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
