"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Plus,
  Search,
  Dna,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [diseaseArea, setDiseaseArea] = useState("Oncology");
  const [targetOrganism, setTargetOrganism] = useState("Homo sapiens");
  const [description, setDescription] = useState("");

  const loadProjects = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setProjects(data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          diseaseArea,
          targetOrganism,
          description,
          tags: [diseaseArea, "De Novo"],
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setName("");
        setDescription("");
        loadProjects();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.diseaseArea?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Vault &amp; Program Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            Therapeutic Research Projects
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Curated pipelines, lead candidate sequences, and in silico simulation logs indexed by program code.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Initialize Project</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs by name, code (e.g. PRJ-ONC-884), or disease area..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface/80 border border-border text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent-blue"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <Link
            key={proj.id}
            href={`/projects/${proj.id}`}
            className="p-6 rounded-2xl bg-surface/80 hover:bg-surface/95 backdrop-blur-2xl border border-border hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-blue-500/10 text-accent-cyan border border-blue-500/20 font-bold">
                  {proj.code}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {proj.status}
                </span>
              </div>

              <h3 className="text-base font-display font-bold text-ink group-hover:text-accent-cyan transition-colors">
                {proj.name}
              </h3>
              <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed font-sans">
                {proj.description || "De novo computational biology research program."}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(proj.tags || ["Oncology", "De Novo"]).map((t: string, i: number) => (
                  <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-ink-muted border border-white/5">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-ink-muted">
              <span>{proj.targetOrganism || "Homo sapiens"}</span>
              <span className="text-accent-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                Open Workspace <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-elevated border border-blue-500/40 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-display font-bold text-ink">Initialize Research Vault</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink-muted hover:text-ink text-xs font-mono"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Project Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. KRAS-G12D Allosteric Inhibitor"
                  className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-ink-muted mb-1">Disease Area:</label>
                  <input
                    type="text"
                    value={diseaseArea}
                    onChange={(e) => setDiseaseArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-ink-muted mb-1">Target Organism:</label>
                  <input
                    type="text"
                    value={targetOrganism}
                    onChange={(e) => setTargetOrganism(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-void border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe the therapeutic mechanism of action and in silico objectives..."
                  className="w-full p-3 rounded-xl bg-void border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
