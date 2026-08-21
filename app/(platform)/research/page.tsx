"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  X,
  Send,
  Atom,
} from "lucide-react";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/researchData";

export default function ResearchKnowledgeHubPage() {
  const [papers, setPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New Paper Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Protein Design");
  const [journal, setJournal] = useState("Nature Biotechnology (2026)");
  const [authors, setAuthors] = useState("Chaurasia S., Vance E., Chen L.");
  const [abstract, setAbstract] = useState("");
  const [keyTakeaway, setKeyTakeaway] = useState("");

  const categories = [
    "All",
    "Protein Design",
    "Genomic Omics",
    "Wet-Lab Robotics",
    "Toxicology & Safety",
    "Clinical Simulation",
  ];

  const loadPapers = () => {
    fetch("/api/research")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setPapers(data.data);
        }
      })
      .catch((err) => console.warn("Failed to load papers:", err));
  };

  useEffect(() => {
    loadPapers();
  }, []);

  const handleCreatePaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !abstract.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          journal,
          authors,
          abstract,
          keyTakeaway: keyTakeaway || abstract.substring(0, 100) + "...",
          year: "2026",
          readTime: "8 min read",
          impactFactor: "22.4",
          downloadSize: "4.6 MB PDF",
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsSubmitOpen(false);
          setTitle("");
          setAbstract("");
          setKeyTakeaway("");
          loadPapers();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = papers.filter((pub: ResearchPaper) => {
    const matchesCat = selectedCategory === "All" || pub.category === selectedCategory;
    const matchesSearch =
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(search.toLowerCase()) ||
      pub.authors.toLowerCase().includes(search.toLowerCase()) ||
      pub.doi.toLowerCase().includes(search.toLowerCase());
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
            Empirical scientific literature, generative AI architecture benchmarks, and clinical trial simulations stored in PostgreSQL.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Monograph</span>
        </button>
      </div>

      {/* Search & Category Filter Tabs */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search publications, crystal structures, authors, or DOI numbers in database..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface/80 border border-border text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent-blue"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? papers.length
                : papers.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "bg-surface-elevated text-ink-muted hover:text-ink border border-white/5"
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                  {count}
                </span>
              </button>
            );
          })}
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

                <div className="text-[11px] font-mono text-ink-muted/80 pt-1 flex flex-col gap-1">
                  <div>
                    <strong>Authors:</strong> {pub.authors}
                  </div>
                  <div className="text-[10px] text-accent-cyan/80">
                    <strong>DOI:</strong> {pub.doi}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-ink-muted/60 text-[11px]">{pub.journal}</span>
                <span className="text-accent-lime font-bold text-[11px]">
                  IF: {pub.impactFactor}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Paper Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-surface border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Atom className="w-5 h-5 text-accent-cyan" />
                <h2 className="text-lg font-display font-bold text-ink">
                  Submit Peer-Reviewed Monograph to Database
                </h2>
              </div>
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="p-1 rounded-lg text-ink-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePaper} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-ink-muted">Monograph Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. De Novo Structural Diffusion of Allosteric Inhibitors"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-ink-muted">Scientific Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-ink-muted">Journal / Proceedings</label>
                  <input
                    type="text"
                    required
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    placeholder="e.g. Nature Biotechnology (2026)"
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-ink-muted">Authors & Affiliations</label>
                <input
                  type="text"
                  required
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  placeholder="e.g. Chaurasia S., Vance E., Chen L."
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-ink-muted">Scientific Abstract</label>
                <textarea
                  required
                  rows={4}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Describe empirical methodologies, RMSD alignment metrics, experimental in vitro validations..."
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-ink focus:outline-none focus:border-accent-blue resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-ink-muted">Key Empirical Takeaway</label>
                <input
                  type="text"
                  value={keyTakeaway}
                  onChange={(e) => setKeyTakeaway(e.target.value)}
                  placeholder="e.g. Achieves sub-nanomolar affinity for previously undruggable GPCR targets."
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-ink focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsSubmitOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-elevated text-xs font-mono text-ink-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
                >
                  {submitSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Published to PostgreSQL!</span>
                    </>
                  ) : submitting ? (
                    <span>Publishing...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Monograph</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
