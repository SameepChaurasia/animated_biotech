"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Sliders,
  Cpu,
  CheckCircle2,
  Download,
  ExternalLink,
  BookOpen,
  FlaskConical,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { RESEARCH_DETAILS, ResearchDetail } from "@/data/researchData";
import { soundManager } from "@/lib/audio";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailId: string | null;
}

export const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, detailId }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "simulator" | "whitepaper">("overview");

  // Interactive parameter state for simulator tab
  const [affinity, setAffinity] = useState<number>(0.42);
  const [rmsd, setRmsd] = useState<number>(0.38);
  const [throughput, setThroughput] = useState<number>(50000);
  const [copiedDoi, setCopiedDoi] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const detail: ResearchDetail | undefined = detailId ? RESEARCH_DETAILS[detailId] : undefined;

  useEffect(() => {
    if (detail?.interactiveParams) {
      setAffinity(detail.interactiveParams.bindingAffinity.default);
      setRmsd(detail.interactiveParams.foldingRmsd.default);
      setThroughput(detail.interactiveParams.throughputSpeed.default);
    }
  }, [detailId, detail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !detail) return null;

  const handleCopyDoi = () => {
    soundManager.playClickSound();
    navigator.clipboard.writeText(`https://doi.org/${detail.whitepaper.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleDownloadPdf = () => {
    soundManager.playClickSound();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Trigger virtual download
      const element = document.createElement("a");
      const file = new Blob(
        [
          `CODEX BIO RESEARCH SPECIFICATION & TECHNICAL WHITEPAPER\nTitle: ${detail.title}\nDOI: ${detail.whitepaper.doi}\nJournal: ${detail.whitepaper.journal}\nAuthors: ${detail.whitepaper.authors.join(", ")}\n\nABSTRACT:\n${detail.abstract}\n\nHIGHLIGHTS:\n${detail.highlights.join("\n")}\n\nempirically validated by Sameep Chaurasia / Codex Bio Labs 2026.`,
        ],
        { type: "text/plain" }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${detail.id}-technical-whitepaper.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  // Calculate dynamic simulation metrics
  const calculatedKd = (affinity * (1 + rmsd * 0.15)).toFixed(3);
  const estimatedTiter = Math.round(throughput * 0.85).toLocaleString();
  const bindingScore = Math.min(Math.max(Math.round((10 - affinity) * 10 + (2 - rmsd) * 20), 0), 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClickSound();
            onClose();
          }}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-slate-950 border-2 border-blue-500/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto"
        >
          {/* Header Top Bar */}
          <div className="p-6 md:p-8 bg-slate-900/80 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-semibold">
                  // {detail.category}
                </span>
                {detail.counter && (
                  <span className="font-mono text-xs text-indigo-400 font-bold">
                    MODULE {detail.counter}
                  </span>
                )}
              </div>
              <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {detail.title}
              </h2>
              <p className="font-sans text-sm text-slate-400 mt-1">{detail.subtitle}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playClickSound();
                onClose();
              }}
              className="self-end md:self-auto p-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400 transition-all focus-visible:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800/80 overflow-x-auto bg-slate-950/60 font-mono text-xs">
            <button
              onClick={() => {
                soundManager.playClickSound();
                setActiveTab("overview");
              }}
              className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === "overview"
                  ? "bg-slate-900 text-blue-400 border-blue-500"
                  : "text-slate-400 hover:text-white border-transparent"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              OVERVIEW & ABSTRACT
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                setActiveTab("specs");
              }}
              className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === "specs"
                  ? "bg-slate-900 text-blue-400 border-blue-500"
                  : "text-slate-400 hover:text-white border-transparent"
              }`}
            >
              <Cpu className="w-4 h-4" />
              SCIENTIFIC SPECS
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                setActiveTab("simulator");
              }}
              className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === "simulator"
                  ? "bg-slate-900 text-blue-400 border-blue-500"
                  : "text-slate-400 hover:text-white border-transparent"
              }`}
            >
              <Sliders className="w-4 h-4 text-purple-400" />
              LIVE SIMULATOR
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                setActiveTab("whitepaper");
              }}
              className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === "whitepaper"
                  ? "bg-slate-900 text-blue-400 border-blue-500"
                  : "text-slate-400 hover:text-white border-transparent"
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              WHITEPAPER & DOI
            </button>
          </div>

          {/* Modal Tab Content Area */}
          <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> // EXECUTIVE SCIENTIFIC ABSTRACT
                  </h3>
                  <p className="font-sans text-base text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                    {detail.abstract}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-widest mb-3">
                    // KEY BENCHMARK HIGHLIGHTS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detail.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-sm text-slate-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {detail.labProtocol && (
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800 pb-2">
                      <span className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4" />
                        AUTOMATED LAB PROTOCOL SPECIFICATIONS
                      </span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                        ROBOTIC DISPATCH READY
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-400 block">ASSAY TYPE</span>
                        <span className="font-bold text-white">{detail.labProtocol.assayType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">TEMPERATURE</span>
                        <span className="font-bold text-indigo-300">{detail.labProtocol.temperature}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">ROBOTIC PLATFORM</span>
                        <span className="font-bold text-purple-300">{detail.labProtocol.roboticPlatform}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">INCUBATION</span>
                        <span className="font-bold text-blue-300">{detail.labProtocol.incubationTime}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SCIENTIFIC SPECS */}
            {activeTab === "specs" && (
              <div className="space-y-6">
                <h3 className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">
                  // DEEP TECHNICAL & PERFORMANCE METRICS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 hover:border-blue-500/40 transition-colors"
                    >
                      <span className="font-mono text-xs text-slate-400 block">{spec.label}</span>
                      <span className="font-sans text-xl font-bold text-white block">{spec.value}</span>
                      <span className="font-sans text-xs text-slate-400 leading-relaxed block">
                        {spec.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: LIVE SIMULATOR */}
            {activeTab === "simulator" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    // IN SILICO PARAMETER SENSITIVITY SIMULATOR
                  </span>
                  <span className="font-mono text-[11px] text-purple-300 bg-purple-950/60 border border-purple-500/40 px-3 py-1 rounded-full">
                    REAL-TIME COMPUTATIONAL FEEDBACK
                  </span>
                </div>

                {/* Slider Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-bold">BINDING AFFINITY (Kd):</span>
                      <span className="text-blue-400 font-bold">{affinity.toFixed(2)} nM</span>
                    </div>
                    <input
                      type="range"
                      min={detail.interactiveParams?.bindingAffinity.min || 0.01}
                      max={detail.interactiveParams?.bindingAffinity.max || 10.0}
                      step="0.01"
                      value={affinity}
                      onChange={(e) => setAffinity(parseFloat(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-bold">BACKBONE RMSD:</span>
                      <span className="text-indigo-400 font-bold">{rmsd.toFixed(2)} Å</span>
                    </div>
                    <input
                      type="range"
                      min={detail.interactiveParams?.foldingRmsd.min || 0.1}
                      max={detail.interactiveParams?.foldingRmsd.max || 2.0}
                      step="0.01"
                      value={rmsd}
                      onChange={(e) => setRmsd(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Simulation Output Dashboard */}
                <div className="p-6 rounded-2xl bg-slate-950 border-2 border-purple-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center shadow-[inset_0_0_20px_rgba(168,85,247,0.15)]">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block mb-1">EFFECTIVE DISSOCIATION</span>
                    <span className="text-xl font-extrabold text-blue-400">{calculatedKd} nM</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block mb-1">PREDICTED SCORE</span>
                    <span className="text-xl font-extrabold text-purple-400">{bindingScore} / 100</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block mb-1">ESTIMATED YIELD</span>
                    <span className="text-xl font-extrabold text-indigo-400">{estimatedTiter} units/L</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: WHITEPAPER & DOI */}
            {activeTab === "whitepaper" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-indigo-400 font-bold uppercase tracking-wider">
                      JOURNAL PUBLICATION
                    </span>
                    <span className="text-slate-400">{detail.whitepaper.publicationDate}</span>
                  </div>

                  <h4 className="font-sans text-xl font-bold text-white">
                    {detail.whitepaper.journal}
                  </h4>

                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-slate-400">DOI:</span>
                    <span className="text-blue-400 font-bold">{detail.whitepaper.doi}</span>
                    <button
                      onClick={handleCopyDoi}
                      className="ml-2 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px]"
                    >
                      {copiedDoi ? "COPIED!" : "COPY DOI"}
                    </button>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">AUTHORS:</span>
                    <span className="text-slate-200 font-sans text-sm">
                      {detail.whitepaper.authors.join(", ")}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-2">KEY SCIENTIFIC FINDINGS:</span>
                    <ul className="space-y-1.5 font-sans text-sm text-slate-300 pl-4 list-disc">
                      {detail.whitepaper.keyFindings.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    <Download className="w-4 h-4" />
                    {downloading ? "GENERATING FILE..." : "DOWNLOAD FULL WHITEPAPER (TXT)"}
                  </button>

                  <a
                    href={`https://doi.org/${detail.whitepaper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-blue-400 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all"
                  >
                    <span>VIEW ON PUBLISHER</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 md:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CODEX BIO RESEARCH PORTAL · VERIFIED BY SAMEEP CHAURASIA</span>
            <button
              onClick={() => {
                soundManager.playClickSound();
                onClose();
              }}
              className="text-blue-400 hover:text-white font-bold"
            >
              CLOSE WINDOW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
