"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dna,
  Sparkles,
  Binary,
  Bot,
  Scissors,
  Box,
  LayoutDashboard,
  ChevronUp,
  X,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { soundManager } from "@/lib/audio";

export const FloatingStudioTrigger: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Show floating launcher everywhere except inside deep workstation tools if desired, or show it globally
  // We keep it global, but highlight current route if on platform
  const isInsidePlatform = pathname.startsWith("/dashboard") || pathname.startsWith("/tools") || pathname.startsWith("/projects");

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    soundManager.playClickSound();
    setIsOpen(!isOpen);
  };

  const QUICK_TOOLS = [
    {
      title: "Command Center",
      desc: "Live biophysics telemetry & projects",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/40",
      badge: "Overview",
    },
    {
      title: "Sequence Lab",
      desc: "SantaLucia thermodynamics & alignment",
      href: "/tools/sequence-lab",
      icon: Binary,
      color: "from-cyan-500/20 to-blue-500/20 text-accent-cyan border-cyan-500/40",
      badge: "v2.4",
    },
    {
      title: "AI Genomics Copilot",
      desc: "Autonomous agent with live tool calling",
      href: "/tools/ai-agent",
      icon: Bot,
      color: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40",
      badge: "AI Agent",
    },
    {
      title: "CRISPR Designer",
      desc: "SpCas9 NGG PAM & Doench scoring",
      href: "/tools/crispr-designer",
      icon: Scissors,
      color: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40",
      badge: "SpCas9",
    },
    {
      title: "3D Molecular Studio",
      desc: "Three.js WebGL protein spatial viewer",
      href: "/tools/molecular-viewer",
      icon: Box,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40",
      badge: "3D WebGL",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Quick-Launch Drawer / Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-blue-500/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.25)] space-y-3 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Dna className="w-4 h-4 text-accent-cyan animate-spin-20s" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-display font-bold text-white flex items-center gap-1.5">
                    CODEX BIO <span className="text-accent-cyan font-mono text-[10px]">OS</span>
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">Enterprise Bio-Compute Suite</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
              {QUICK_TOOLS.map((tool, idx) => {
                const Icon = tool.icon;
                const isCurrent = pathname === tool.href;

                return (
                  <Link
                    key={idx}
                    href={tool.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl transition-all group border ${
                      isCurrent
                        ? "bg-blue-600/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        : "bg-slate-900/70 hover:bg-slate-900 border-white/5 hover:border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl bg-gradient-to-br border flex items-center justify-center ${tool.color} group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-accent-cyan transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-white/5">
                            {tool.badge}
                          </span>
                        </div>
                        <span className="text-[10.5px] text-slate-400 line-clamp-1">{tool.desc}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-accent-cyan group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* Direct Dashboard Launch Button */}
            <div className="pt-2 border-t border-white/10">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02]"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Launch Full Command Center</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-blue-500/50 hover:border-blue-400 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.4)] backdrop-blur-2xl transition-all cursor-pointer overflow-hidden"
        title="Open Codex Bio Compute Studio"
      >
        {/* Animated Bioluminescent Conic Glow Ring */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-[6px] opacity-40 group-hover:opacity-80 transition-opacity -z-10" />

        {/* Glowing Icon Container */}
        <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/60 flex items-center justify-center text-accent-cyan shadow-[0_0_12px_rgba(56,189,248,0.6)] flex-shrink-0 group-hover:rotate-12 transition-transform">
          <Dna className="w-4 h-4 animate-spin-20s" />
        </div>

        {/* Button Label & Telemetry Badge */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-xs sm:text-sm text-white tracking-tight">
              Codex <span className="text-accent-cyan">Studio OS</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-ping" />
          </div>
          <span className="text-[9.5px] font-mono text-indigo-300 font-semibold tracking-wider uppercase">
            ⚡ AI &amp; Bio-Compute Active
          </span>
        </div>

        {/* Up/Down Indicator */}
        <div className="pl-1 text-slate-400 group-hover:text-accent-cyan transition-colors">
          <ChevronUp
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-cyan" : ""}`}
          />
        </div>
      </motion.button>
    </div>
  );
};
