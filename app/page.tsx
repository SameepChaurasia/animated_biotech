"use client";

import React, { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";
import { GenePlayground } from "@/components/sections/GenePlayground";
import { Stats } from "@/components/sections/Stats";
import { FinalCta } from "@/components/sections/FinalCta";
import { MolecularCanvas } from "@/components/canvas/MolecularCanvas";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Whole-Page Interactive Molecular Canvas Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-75">
        <MolecularCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Perspective Cyber Grid & Ambient Glowing Royal Blue/Indigo Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-perspective-grid opacity-40" />
      <div className="fixed top-1/4 left-1/4 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-1/3 right-1/4 w-[650px] h-[650px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3.5s" }} />

      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-slate-950 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out shadow-[0_0_12px_#3B82F6]"
          style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
        />
      </div>

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Technology />
        <SectionDivider />
        <Capabilities />
        <SectionDivider />
        <GenePlayground />
        <SectionDivider />
        <Stats />
        <SectionDivider />
        <FinalCta />
      </main>
    </>
  );
}

