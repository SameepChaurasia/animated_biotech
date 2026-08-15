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

  const categories = [
    { label: "All", count: 6 },
    { label: "Protein Design", count: 1 },
    { label: "Genomic Omics", count: 1 },
    { label: "Wet-Lab Robotics", count: 2 },
    { label: "Toxicology & Safety", count: 1 },
    { label: "Clinical Simulation", count: 1 },
  ];

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

  const getMapId = (paperId: string) => {
    switch (paperId) {
      case "paper-01": return "protein-engine";
      case "paper-02": return "genomic-pipeline";
      case "paper-03": return "synthetic-pathway";
      case "paper-04": return "predictive-tox";
      case "paper-05": return "robotic-synthesis";
      case "paper-06": return "clinical-simulator";
      default: return "protein-engine";
    }
  };

  return (
    <section id="research" className="py-14 md:py-20 bg-slate-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 03 — RESEARCH KNOWLEDGE HUB"
          headline="Peer-Reviewed Publications & Technical Whitepapers."
          subheading="Explore empirical benchmarks, generative model architectures, and closed-loop wet-lab validation papers published by Codex Bio scientists."
        />

        {/* Quick Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto">
          {[
            { label: "Peer-Reviewed Papers", value: "6 Major Articles", icon: "📄" },
            { label: "Cumulative Impact", value: "136.7 Impact Factor", icon: "⭐" },
            { label: "Empirical Precision", value: "99.99% Accuracy", icon: "🎯" },
            { label: "Data Accessibility", value: "100% Open Access", icon: "🔓" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center gap-3 shadow-md hover:border-blue-500/30 transition-colors"
            >
              <span className="text-lg">{stat.icon}</span>
              <div>
                <div className="font-sans font-extrabold text-white text-xs sm:text-sm">{stat.value}</div>
                <div className="font-mono text-[10px] text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-8">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  soundManager.playClickSound();
                  setSelectedCategory(cat.label);
                }}
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                  selectedCategory === cat.label
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/80 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105"
                    : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.label ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers, DOI, author..."
              className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans text-xs transition-all"
            />
          </div>
        </div>

        {/* Compact & Creative 3-Column Paper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper, idx) => (
            <RevealOnScroll key={paper.id} delay={idx * 60}>
              <div
                onClick={() => {
                  soundManager.playClickSound();
                  onOpenDetail(getMapId(paper.id));
                }}
                className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 hover:from-blue-500/60 hover:to-indigo-600/60 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] cursor-pointer h-full"
              >
                {/* Cybernetic Alignment Crosshairs */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-blue-400/40 pointer-events-none">+</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-400/40 pointer-events-none">+</div>

                <div className="p-5 h-full flex flex-col justify-between rounded-[15px] bg-slate-950/95 backdrop-blur-xl">
                  <div className="space-y-2.5">
                    {/* Top Metadata Row */}
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-[10px] tracking-wide flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        {paper.category}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-indigo-300 font-extrabold text-[10px]">
                        IF {paper.impactFactor}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-extrabold text-base text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {paper.title}
                    </h3>

                    {/* Journal & DOI */}
                    <div className="font-mono text-[10px] text-indigo-300/80 flex flex-wrap items-center gap-1.5">
                      <span className="truncate max-w-[180px]">{paper.journal}</span>
                      <span>·</span>
                      <span>{paper.year}</span>
                    </div>

                    {/* Abstract preview */}
                    <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {paper.abstract}
                    </p>

                    {/* Key Finding Box */}
                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 font-sans text-[11px] text-blue-200 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        <strong className="text-white font-semibold">Key Finding:</strong> {paper.keyTakeaway}
                      </span>
                    </div>
                  </div>

                  {/* Footer Action Row */}
                  <div className="pt-3.5 mt-3.5 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                    <span className="truncate max-w-[140px] text-[10px] text-slate-400">
                      {paper.authors.split(",")[0]}, et al.
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleDownload(paper, e)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-400 text-slate-200 hover:text-white flex items-center gap-1 transition-all text-[10px] font-semibold"
                      >
                        <Download className="w-3 h-3 text-blue-400" />
                        <span>{downloadingId === paper.id ? "SAVING..." : paper.downloadSize}</span>
                      </button>

                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-400 transition-all shadow-sm">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
};
