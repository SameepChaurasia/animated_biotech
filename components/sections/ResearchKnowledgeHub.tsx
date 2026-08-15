"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Dna,
  Atom,
  Bot,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  FileCheck,
  FileText,
  Target,
  Unlock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/researchData";
import { soundManager } from "@/lib/audio";

const CATEGORY_THEMES: Record<
  string,
  {
    icon: React.ReactNode;
    color: string;
    badgeBg: string;
    borderGlow: string;
    accentGradient: string;
    coordTag: string;
  }
> = {
  "Protein Design": {
    icon: <Atom className="w-3.5 h-3.5 text-cyan-400" />,
    color: "text-cyan-400",
    badgeBg: "bg-cyan-950/70 border-cyan-500/40 text-cyan-300",
    borderGlow: "group-hover:border-cyan-400 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]",
    accentGradient: "from-cyan-500/30 via-blue-500/20 to-indigo-500/30",
    coordTag: "DIFFUSION · 0.38Å",
  },
  "Genomic Omics": {
    icon: <Dna className="w-3.5 h-3.5 text-indigo-400" />,
    color: "text-indigo-400",
    badgeBg: "bg-indigo-950/70 border-indigo-500/40 text-indigo-300",
    borderGlow: "group-hover:border-indigo-400 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]",
    accentGradient: "from-indigo-500/30 via-purple-500/20 to-blue-500/30",
    coordTag: "PETABASE · 100K/HR",
  },
  "Wet-Lab Robotics": {
    icon: <Bot className="w-3.5 h-3.5 text-emerald-400" />,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-950/70 border-emerald-500/40 text-emerald-300",
    borderGlow: "group-hover:border-emerald-400 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
    accentGradient: "from-emerald-500/30 via-teal-500/20 to-blue-500/30",
    coordTag: "AUTONOMOUS · 24/7",
  },
  "Toxicology & Safety": {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />,
    color: "text-amber-400",
    badgeBg: "bg-amber-950/70 border-amber-500/40 text-amber-300",
    borderGlow: "group-hover:border-amber-400 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]",
    accentGradient: "from-amber-500/30 via-rose-500/20 to-indigo-500/30",
    coordTag: "IN SILICO · ADMET",
  },
  "Clinical Simulation": {
    icon: <Activity className="w-3.5 h-3.5 text-purple-400" />,
    color: "text-purple-400",
    badgeBg: "bg-purple-950/70 border-purple-500/40 text-purple-300",
    borderGlow: "group-hover:border-purple-400 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]",
    accentGradient: "from-purple-500/30 via-fuchsia-500/20 to-blue-500/30",
    coordTag: "TWIN COHORT · BAYES",
  },
};

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
    <section id="research" className="py-14 md:py-20 bg-transparent relative overflow-hidden">
      {/* Level 1: Progressive Micro Cyber-Grid (14px Squares) - Edge to Edge */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-micro opacity-90 pointer-events-none z-0" />

      {/* Synchronized Ambient Volumetric White & Silver Glow Flares */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-white/[0.05] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-slate-300/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// 03 — RESEARCH KNOWLEDGE HUB"
          headline="Peer-Reviewed Publications & Technical Whitepapers."
          subheading="Explore empirical benchmarks, generative model architectures, and closed-loop wet-lab validation papers published by Codex Bio scientists."
        />

        {/* Compact 3D Holographic Cyber-Console Metrics Dock */}
        <RevealOnScroll delay={80}>
          <div
            style={{ perspective: "1000px" }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="group relative p-[1.5px] rounded-2xl bg-gradient-to-r from-blue-500/50 via-cyan-400/60 to-indigo-500/50 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.9),0_0_30px_rgba(34,211,238,0.25)] hover:shadow-[0_22px_50px_-8px_rgba(0,0,0,0.95),0_0_45px_rgba(34,211,238,0.45)] transition-all duration-300 overflow-hidden">
              {/* Moving Holographic Laser Beam */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent w-48 h-full animate-scanline pointer-events-none opacity-80" />

              {/* Corner Alignment Crosshairs */}
              <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/50 pointer-events-none z-10">+</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-400/50 pointer-events-none z-10">+</div>

              {/* Console Interior Slab */}
              <div className="rounded-[14.5px] bg-slate-950/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(0,0,0,0.8)] backdrop-blur-2xl px-3 py-2.5 sm:px-5 sm:py-3 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 items-center justify-between divide-y md:divide-y-0 md:divide-x divide-slate-800/80 relative z-0">
                {/* Node 1 */}
                <div className="flex items-center gap-2.5 px-2 py-1 md:py-0 group/node hover:scale-105 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-sans font-black text-white text-xs sm:text-sm group-hover/node:text-cyan-300 transition-colors flex items-center gap-1">
                      <span>6 Articles</span>
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-slate-400">Peer-Reviewed</div>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="flex items-center gap-2.5 px-2 md:px-4 py-1 md:py-0 group/node hover:scale-105 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-sans font-black text-white text-xs sm:text-sm group-hover/node:text-amber-300 transition-colors flex items-center gap-1">
                      <span>136.7 IF</span>
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-slate-400">Cumulative Impact</div>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex items-center gap-2.5 px-2 md:px-4 py-1 md:py-0 group/node hover:scale-105 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <Target className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-sans font-black text-white text-xs sm:text-sm group-hover/node:text-emerald-300 transition-colors flex items-center gap-1">
                      <span>99.99%</span>
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-slate-400">Precision Accuracy</div>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="flex items-center gap-2.5 px-2 md:px-4 py-1 md:py-0 group/node hover:scale-105 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    <Unlock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-sans font-black text-white text-xs sm:text-sm group-hover/node:text-purple-300 transition-colors flex items-center gap-1">
                      <span>100% Open</span>
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-slate-400">Data Accessibility</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

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
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold ${selectedCategory === cat.label
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.45)] scale-105"
                    : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.label ? "bg-white/20 text-white font-bold" : "bg-slate-800 text-slate-400"
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
              className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans text-xs transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Dynamic Glowing 3-Column Paper Grid with 3D Depth & Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {filteredPapers.map((paper, idx) => {
            const theme = CATEGORY_THEMES[paper.category] || CATEGORY_THEMES["Protein Design"];

            return (
              <RevealOnScroll key={paper.id} delay={idx * 60}>
                <div
                  onClick={() => {
                    soundManager.playClickSound();
                    onOpenDetail(getMapId(paper.id));
                  }}
                  className={`group relative p-[1.5px] rounded-2xl bg-gradient-to-br from-slate-750 via-slate-850 to-slate-950 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.9),0_0_24px_rgba(59,130,246,0.14)] hover:shadow-[0_32px_65px_-12px_rgba(0,0,0,0.98),0_0_45px_rgba(34,211,238,0.45),inset_0_1px_2px_rgba(255,255,255,0.3)] hover:-translate-y-2.5 hover:scale-[1.015] cursor-pointer h-full overflow-hidden`}
                >
                  {/* Subtle Holographic Laser Scanline on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-12 w-full animate-scanline pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {/* Corner Crosshair Badges */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/40 pointer-events-none z-10">+</div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-400/40 pointer-events-none z-10">+</div>

                  {/* Card Interior with 3D Specular Top Rim */}
                  <div className="p-5 h-full flex flex-col justify-between rounded-[14.5px] bg-slate-950/96 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative z-0">
                    <div className="space-y-3">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        {/* Category Badge with Icon */}
                        <div className={`px-2.5 py-1 rounded-full border flex items-center gap-1.5 text-[10px] font-bold tracking-wider shadow-sm ${theme.badgeBg}`}>
                          {theme.icon}
                          <span>{paper.category}</span>
                        </div>

                        {/* Impact Factor Glowing Pill */}
                        <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-950 to-indigo-950 border border-cyan-400/50 text-cyan-300 font-mono font-black text-[10px] shadow-[0_0_10px_rgba(34,211,238,0.25)] flex items-center gap-1">
                          <span className="text-[8px] text-slate-400 font-normal">IF</span>
                          <span>{paper.impactFactor}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {paper.title}
                      </h3>

                      {/* Journal Citation & Year */}
                      <div className="font-mono text-[10px] text-indigo-300/90 flex flex-wrap items-center gap-1.5 pb-1">
                        <span className="truncate max-w-[170px] text-slate-300 font-medium">{paper.journal}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-cyan-400/90 font-bold">{paper.year}</span>
                      </div>

                      {/* Abstract Preview */}
                      <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {paper.abstract}
                      </p>

                      {/* Key Finding Breakthrough Callout */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-900/90 to-blue-950/60 border-l-2 border-l-cyan-400 border-y border-r border-slate-800 font-sans text-[11px] text-cyan-200 flex items-start gap-2 shadow-sm group-hover:border-cyan-500/40 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                        <span className="line-clamp-2 leading-tight">
                          <strong className="text-white font-bold">Key Finding:</strong> {paper.keyTakeaway}
                        </span>
                      </div>
                    </div>

                    {/* Footer Action Row */}
                    <div className="pt-3.5 mt-3.5 border-t border-slate-850 flex items-center justify-between font-mono text-xs text-slate-400">
                      <span className="truncate max-w-[130px] text-[10px] text-slate-400 font-medium">
                        {paper.authors.split(",")[0]}, et al.
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Download Whitepaper Button */}
                        <button
                          onClick={(e) => handleDownload(paper, e)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-400 hover:bg-cyan-950/40 text-slate-300 hover:text-white flex items-center gap-1 transition-all text-[10px] font-semibold shadow-sm"
                        >
                          <Download className="w-3 h-3 text-cyan-400" />
                          <span>{downloadingId === paper.id ? "SAVING..." : paper.downloadSize}</span>
                        </button>

                        {/* Open Dossier Modal Icon */}
                        <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-cyan-400 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-cyan-400 transition-all shadow-sm">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
