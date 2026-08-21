"use client";

import React, { useState } from "react";
import { Box, Sparkles, Dna, Atom, Layers, RefreshCw, Download } from "lucide-react";
import { MolecularViewer3D } from "@/components/platform/MolecularViewer3D";

export default function MolecularViewerPage() {
  const [activePreset, setActivePreset] = useState<"helix" | "sheet" | "complex" | "binding_pocket">("binding_pocket");

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan mb-1">
            <Box className="w-4 h-4" />
            <span>WebGL 3D Molecular Graphics Engine · Three.js</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            3D Molecular Spatial Studio
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            High-performance WebGL atomic resolution viewer for tertiary protein structures, alpha helices, beta sheets, and oncogenic ligand binding pockets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const presets: ("helix" | "sheet" | "complex" | "binding_pocket")[] = ["helix", "sheet", "complex", "binding_pocket"];
              const next = presets[(presets.indexOf(activePreset) + 1) % presets.length];
              setActivePreset(next);
            }}
            className="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-slate-800 border border-white/10 text-xs font-mono text-ink flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cycle Preset</span>
          </button>
        </div>
      </div>

      {/* Full-Feature Three.js 3D Viewer */}
      <MolecularViewer3D
        structureType={activePreset}
        title="Interactive WebGL 3D Macromolecular Visualizer"
      />

      {/* Biochemical Structure Specs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface/80 border border-border space-y-1">
          <span className="text-[10px] font-mono text-ink-muted uppercase">Backbone RMSD</span>
          <p className="text-xl font-display font-bold text-emerald-400">0.38 Å</p>
          <span className="text-[11px] text-ink-muted">Crystal-grade alignment</span>
        </div>
        <div className="p-4 rounded-xl bg-surface/80 border border-border space-y-1">
          <span className="text-[10px] font-mono text-ink-muted uppercase">Diffusion Model</span>
          <p className="text-xl font-display font-bold text-cyan-400">1.4B Weights</p>
          <span className="text-[11px] text-ink-muted">Spatial generative transformer</span>
        </div>
        <div className="p-4 rounded-xl bg-surface/80 border border-border space-y-1">
          <span className="text-[10px] font-mono text-ink-muted uppercase">Rendering Pipeline</span>
          <p className="text-xl font-display font-bold text-purple-400">WebGL 2.0</p>
          <span className="text-[11px] text-ink-muted">Custom PBR standard shaders</span>
        </div>
        <div className="p-4 rounded-xl bg-surface/80 border border-border space-y-1">
          <span className="text-[10px] font-mono text-ink-muted uppercase">Target Resolution</span>
          <p className="text-xl font-display font-bold text-amber-400">Sub-Angstrom</p>
          <span className="text-[11px] text-ink-muted">PDB format compatible</span>
        </div>
      </div>
    </div>
  );
}
