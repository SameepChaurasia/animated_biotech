"use client";

import React, { useState } from "react";
import { BookOpen, Search, Download, ExternalLink, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/researchData";
import { soundManager } from "@/lib/audio";

interface ResearchKnowledgeHubProps {
  onOpenDetail: (detailId: string) => void;
}

export const ResearchKnowledgeHub: React.FC<ResearchKnowledgeHubProps> = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = ["All", "Protein Design", "Genomic Omics", "Wet-Lab Robotics", "Toxicology & Safety"];

  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesCategory = selectedCategory === "All" || paper.category === selectedCategory;
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.journal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (paper: ResearchPaper, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClickSound();
    setDownloadingId(paper.id);

    setTimeout(() => {
      setDownloadingId(null);
      const element = document.createElement("a");
      const file = new Blob(
        [
          `CODEX BIO RESEARCH WHITEPAPER\nTitle: ${paper.title}\nJournal: ${paper.journal}\nDOI: ${paper.doi}\nAuthors: ${paper.authors}\nImpact Factor: ${paper.impactFactor}\n\nABSTRACT:\n${paper.abstract}\n\nKEY TAKEAWAY:\n${paper.keyTakeaway}\n\nPublished by Codex Bio Scientific Communications (Sameep Chaurasia Lead Investigator).`,
        ],
        { type: "text/plain" }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${paper.id}-whitepaper.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <section id="research" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 03 — RESEARCH KNOWLEDGE HUB"
          headline="Peer-Reviewed Publications & Technical Whitepapers."
          subheading="Explore empirical benchmarks, generative model architectures, and closed-loop wet-lab validation papers published by Codex Bio scientists."
        />

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClickSound();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-full border transition-all font-semibold ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, DOI, author..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans text-xs transition-all"
            />
          </div>
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPapers.map((paper, idx) => (
            <RevealOnScroll key={paper.id} delay={idx * 100}>
              <GlassCard
                onClick={() => {
                  soundManager.playClickSound();
                  // Map category/id to corresponding detail modal
                  const mapId =
                    paper.id === "paper-01"
                      ? "protein-engine"
                      : paper.id === "paper-02"
                      ? "genomic-pipeline"
                      : paper.id === "paper-03"
                      ? "synthetic-pathway"
                      : "predictive-tox";
                  onOpenDetail(mapId);
                }}
                className="p-8 h-full flex flex-col justify-between group border-slate-800 hover:border-blue-500/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all rounded-3xl cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-semibold">
                      {paper.category}
                    </span>
                    <span className="text-slate-400">{paper.readTime}</span>
                  </div>

                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {paper.title}
                  </h3>

                  <div className="font-mono text-xs text-indigo-400 flex flex-wrap items-center gap-3">
                    <span>{paper.journal}</span>
                    <span>·</span>
                    <span>IF: {paper.impactFactor}</span>
                    <span>·</span>
                    <span>DOI: {paper.doi}</span>
                  </div>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {paper.abstract}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-sans text-xs text-blue-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Key Finding:</strong> {paper.keyTakeaway}
                    </span>
                  </div>
                </div>

                {/* Footer Action Row */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="truncate max-w-[200px]">AUTHORS: {paper.authors}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDownload(paper, e)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-400 text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>{downloadingId === paper.id ? "SAVING..." : paper.downloadSize}</span>
                    </button>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
};
