"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface MissionVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MissionVideoModal: React.FC<MissionVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15);
  const [currentChapter, setCurrentChapter] = useState<number>(0);

  const chapters = [
    { title: "01. Generative AI Protein Folding Architecture", duration: "0:45" },
    { title: "02. Petabase Cloud Genomics Assembly Pipeline", duration: "1:20" },
    { title: "03. Closed-Loop Robotic Wet-Lab Automation", duration: "2:10" },
    { title: "04. Predictive ADMET & In Silico Toxicology", duration: "2:55" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  if (!isOpen) return null;

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
          className="relative w-full max-w-4xl bg-slate-950 border-2 border-blue-500/50 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto p-6 md:p-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> // CODEX BIO EXECUTIVE MISSION BRIEFING
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white">
                Engineering the Code of Life (Video Presentation)
              </h3>
            </div>

            <button
              onClick={() => {
                soundManager.playClickSound();
                onClose();
              }}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Display Screen */}
          <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between p-6 shadow-2xl">
            {/* Background Simulated Lab Animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950/40" />
            <div className="absolute inset-0 bg-perspective-grid opacity-30 pointer-events-none" />

            {/* Glowing Molecular Backbone Graphic inside video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            {/* Top Video Status Overlay */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-blue-500/40 text-blue-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>4K ULTRA HD BROADCAST</span>
              </div>
              <span className="text-slate-400">CAMBRIDGE LABS #04 · ROBOTIC ARRAY</span>
            </div>

            {/* Middle Live Video Transcript / Subtitle Overlay */}
            <div className="relative z-10 max-w-xl mx-auto text-center space-y-2">
              <span className="font-mono text-[11px] text-blue-400 uppercase tracking-widest bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800">
                CURRENT CHAPTER: {chapters[currentChapter]?.title}
              </span>
              <p className="font-sans text-base sm:text-lg text-white font-medium drop-shadow-md bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                &ldquo;By coupling 1.4-billion-parameter transformer diffusion networks with continuous liquid-handling robotics, we compress a 10-year drug discovery cycle into 18 months.&rdquo;
              </p>
            </div>

            {/* Bottom Custom Video Controls */}
            <div className="relative z-10 space-y-3 pt-4">
              {/* Progress Bar */}
              <div className="relative w-full h-2 rounded-full bg-slate-800 cursor-pointer overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 shadow-[0_0_10px_#3B82F6]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => setProgress(0)}
                    className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-all"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span>{Math.floor((progress * 180) / 100)}s / 180s</span>
                </div>

                <div className="flex items-center gap-2">
                  {chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentChapter(idx);
                        setProgress(idx * 25);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentChapter === idx ? "bg-blue-400 scale-125" : "bg-slate-700 hover:bg-slate-500"
                      }`}
                      title={ch.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Selector Grid */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider block mb-3">
              SELECT CHAPTER TO WATCH:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClickSound();
                    setCurrentChapter(idx);
                    setProgress(idx * 25);
                    setIsPlaying(true);
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    currentChapter === idx
                      ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <span className="truncate">{ch.title}</span>
                  {currentChapter === idx && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
