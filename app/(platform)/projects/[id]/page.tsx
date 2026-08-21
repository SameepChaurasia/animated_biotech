"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FolderGit2,
  Binary,
  Activity,
  ArrowLeft,
  Plus,
  Dna,
  CheckCircle2,
  Trash2,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setProject(data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-ink-muted">
        <Dna className="w-6 h-6 animate-spin mx-auto mb-2 text-accent-cyan" />
        <span>Loading project workspace...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-12 text-center text-xs font-mono text-ink-muted space-y-4">
        <p>Project not found.</p>
        <Link href="/projects" className="text-accent-cyan hover:underline">
          Return to Projects Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Vault</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/tools/sequence-lab?projectId=${project.id}`}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Sequence</span>
          </Link>
        </div>
      </div>

      {/* Project Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface/80 backdrop-blur-2xl border border-border space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-blue-500/10 text-accent-cyan border border-blue-500/20 font-bold">
            {project.code}
          </span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {project.status}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">{project.name}</h1>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans max-w-3xl">
          {project.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-xs font-mono">
          <div>
            <span className="text-ink-muted block text-[10px] uppercase">Target Organism</span>
            <span className="text-ink font-semibold">{project.targetOrganism}</span>
          </div>
          <div>
            <span className="text-ink-muted block text-[10px] uppercase">Disease Area</span>
            <span className="text-ink font-semibold">{project.diseaseArea}</span>
          </div>
          <div>
            <span className="text-ink-muted block text-[10px] uppercase">Linked Sequences</span>
            <span className="text-accent-cyan font-semibold">{project.sequences?.length || 0} Strands</span>
          </div>
          <div>
            <span className="text-ink-muted block text-[10px] uppercase">Simulations Run</span>
            <span className="text-purple-400 font-semibold">{project.experiments?.length || 0} Runs</span>
          </div>
        </div>
      </div>

      {/* Linked Sequences Section */}
      <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-base font-display font-bold text-ink flex items-center gap-2">
            <Binary className="w-4 h-4 text-accent-cyan" />
            <span>Target Sequences in Vault</span>
          </h2>
          <Link
            href={`/tools/sequence-lab?projectId=${project.id}`}
            className="text-xs font-mono text-accent-cyan hover:underline"
          >
            Launch Sequence Lab →
          </Link>
        </div>

        {(!project.sequences || project.sequences.length === 0) ? (
          <p className="text-xs font-mono text-ink-muted py-4 text-center">
            No sequences linked to this project yet. Use Sequence Lab to ingest FASTA.
          </p>
        ) : (
          <div className="space-y-3">
            {project.sequences.map((seq: any) => (
              <div
                key={seq.id}
                className="p-4 rounded-xl bg-surface-elevated/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">{seq.name}</span>
                    <span className="text-[10px] font-mono text-accent-cyan px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                      {seq.accession || "CB-SEQ"}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-purple-300 break-all line-clamp-1 max-w-xl">
                    {seq.nucleotides}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-ink-muted">
                  <span>{seq.length} bp</span>
                  <span>GC: <strong className="text-accent-lime">{seq.gcContent || 45}%</strong></span>
                  <span>Tm: <strong className="text-amber-400">{seq.meltingTemp || 72}°C</strong></span>
                  <Link
                    href={`/tools/sequence-lab?seq=${seq.nucleotides}`}
                    className="px-3 py-1 rounded-lg bg-surface hover:bg-slate-800 text-accent-cyan border border-white/10"
                  >
                    Analyze
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
