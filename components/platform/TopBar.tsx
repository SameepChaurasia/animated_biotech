"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Sparkles,
  Play,
  Dna,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export const TopBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).replace("-", " "));

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchQuery.toLowerCase().includes("crispr")) {
      router.push("/tools/crispr-designer");
    } else if (searchQuery.toLowerCase().includes("3d") || searchQuery.toLowerCase().includes("protein")) {
      router.push("/tools/molecular-viewer");
    } else if (searchQuery.toLowerCase().includes("pipe")) {
      router.push("/tools/pipeline-builder");
    } else if (searchQuery.toLowerCase().includes("ai") || searchQuery.toLowerCase().includes("agent")) {
      router.push("/tools/ai-agent");
    } else {
      router.push(`/tools/sequence-lab?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 border-b border-border bg-surface/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Left: Breadcrumbs & Telemetry status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono text-ink-muted">
          <Link href="/" className="hover:text-accent-cyan transition-colors" title="Return to Landing Page">
            Codex
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-border" />
              <span className={idx === breadcrumbs.length - 1 ? "text-accent-cyan font-semibold" : "text-ink-muted"}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 pl-4 ml-2 border-l border-border text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>GPU Tensor Engine: Active (0.38Å Resolution)</span>
        </div>
      </div>

      {/* Center: Quick Command Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <form onSubmit={handleQuickSearch} className="w-full relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gene targets, PDB structures, or bio-algorithms..."
            className="w-full pl-9 pr-14 py-1.5 rounded-xl bg-surface-elevated/70 border border-white/10 text-xs text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-ink-muted border border-white/5">
            ⌘K
          </span>
        </form>
      </div>

      {/* Right: Actions & User Button */}
      <div className="flex items-center gap-3">
        {/* Quick AI Agent Dispatch */}
        <button
          onClick={() => router.push("/tools/ai-agent")}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Copilot</span>
        </button>

        {/* Notifications Toggle */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-surface-elevated hover:bg-slate-800 text-ink-muted hover:text-ink border border-white/5 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-elevated/95 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-accent-cyan" />
                  Bio-Compute Telemetry
                </span>
                <span className="text-[10px] font-mono text-ink-muted">3 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-surface/80 border border-white/5">
                  <p className="font-semibold text-ink flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Thermodynamic Kinetics Converged
                  </p>
                  <p className="text-[11px] text-ink-muted mt-0.5">KRAS G12D simulation reached ΔG° = -34.8 kcal/mol.</p>
                </div>
                <div className="p-2 rounded-xl bg-surface/80 border border-white/5">
                  <p className="font-semibold text-ink flex items-center gap-1.5">
                    <Dna className="w-3 h-3 text-accent-cyan" />
                    SpCas9 Guides Scored
                  </p>
                  <p className="text-[11px] text-ink-muted mt-0.5">6 guides computed with on-target score &gt;85%.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clerk Auth Integration */}
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 rounded-lg border border-blue-500/40",
            },
          }}
        />
      </div>
    </header>
  );
};
