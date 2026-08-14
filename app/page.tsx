"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";
import { ResearchKnowledgeHub } from "@/components/sections/ResearchKnowledgeHub";
import { GenePlayground } from "@/components/sections/GenePlayground";
import { Stats } from "@/components/sections/Stats";
import { FinalCta } from "@/components/sections/FinalCta";
import { MolecularCanvas } from "@/components/canvas/MolecularCanvas";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { DetailModal } from "@/components/ui/DetailModal";
import { PartnerModal } from "@/components/ui/PartnerModal";
import { MissionVideoModal } from "@/components/ui/MissionVideoModal";

import { DynamicScrollBackground } from "@/components/ui/DynamicScrollBackground";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Global Interactive Modal States
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState<boolean>(false);
  const [isMissionVideoOpen, setIsMissionVideoOpen] = useState<boolean>(false);

  const handleOpenDetail = (id: string) => {
    setActiveDetailId(id);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleOpenPartner = () => {
    setIsPartnerOpen(true);
  };

  const handleOpenMissionVideo = () => {
    setIsMissionVideoOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Whole-Page Interactive Molecular Canvas Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-75">
        <MolecularCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Atmospheric Dynamic Scroll Color Transition Background Layer */}
      <DynamicScrollBackground scrollProgress={scrollProgress} />

      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-slate-950 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out shadow-[0_0_12px_#3B82F6]"
          style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
        />
      </div>

      {/* Global Navigation Bar */}
      <Navbar onOpenPartner={handleOpenPartner} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenPartner={handleOpenPartner}
          onOpenMissionVideo={handleOpenMissionVideo}
          onOpenDetail={handleOpenDetail}
        />
        <SectionDivider />
        <About onOpenDetail={handleOpenDetail} />
        <SectionDivider />
        <Technology onOpenDetail={handleOpenDetail} />
        <SectionDivider />
        <ResearchKnowledgeHub onOpenDetail={handleOpenDetail} />
        <SectionDivider />
        <Capabilities onOpenDetail={handleOpenDetail} />
        <SectionDivider />
        <GenePlayground />
        <SectionDivider />
        <Stats onOpenDetail={handleOpenDetail} />
        <SectionDivider />
        <FinalCta onOpenPartner={handleOpenPartner} />
      </main>

      {/* Global Footer */}
      <Footer onOpenDetail={handleOpenDetail} onOpenPartner={handleOpenPartner} />

      {/* Interactive Global Modals & Drawers */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        detailId={activeDetailId}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      <MissionVideoModal
        isOpen={isMissionVideoOpen}
        onClose={() => setIsMissionVideoOpen(false)}
      />
    </>
  );
}
