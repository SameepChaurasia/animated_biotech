"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  FileText,
  ExternalLink,
  Sparkles,
  Download,
  Bookmark,
  CheckCircle2,
  Dna,
} from "lucide-react";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/researchData";

export default function ResearchKnowledgeHubPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const categories = ["All", "Protein Design", "Genomic Omics", "Wet-Lab Robotics", "Toxicology & Safety", "Clinical Simulation"];

  const filtered: ResearchPaper[] = RESEARCH_PAPERS.filter((pub: ResearchPaper) => {
    const matchesCat = selectedCategory === "All" || pub.category === selectedCategory;
    const matchesSearch =
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(search.toLowerCase()) ||
      pub.authors.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Open Science &amp; Peer-Reviewed Monograph Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
            Research Knowledge Hub
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Empirical scientific literature, generative AI architecture benchmarks, and clinical trial simulations authored by Codex Bio researchers.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Tabs */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search publications, crystal structures, authors, or DOI numbers..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface/80 border border-border text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent-blue"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "bg-surface-elevated text-ink-muted hover:text-ink border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((pub: ResearchPaper) => {
          const isSaved = Boolean(bookmarked[pub.id]);
          return (
            <div
              key={pub.id}
              className="p-6 rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border hover:border-blue-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-blue-500/10 text-accent-cyan border border-blue-500/20 font-bold">
                    {pub.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                    <span>{pub.year}</span>
                    <button
                      onClick={() => toggleBookmark(pub.id)}
                      className={`p-1 rounded hover:text-accent-cyan transition-colors ${
                        isSaved ? "text-accent-cyan" : "text-ink-muted"
                      }`}
                      title="Bookmark paper"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-display font-bold text-ink hover:text-accent-cyan transition-colors">
                  {pub.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-sans line-clamp-3">
                  {pub.abstract}
                </p>

                <div className="text-[11px] font-mono text-ink-muted/80 pt-1">
                  <strong>Authors:</strong> {pub.authors}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-ink-muted/60">{pub.journal}</span>
                <span className="text-accent-cyan hover:underline flex items-center gap-1">
                  Read Monograph <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
