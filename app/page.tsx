"use client";

import React, { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";
import { GenePlayground } from "@/components/sections/GenePlayground";
import { Stats } from "@/components/sections/Stats";
import { FinalCta } from "@/components/sections/FinalCta";

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
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-surface pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-emerald transition-all duration-150 ease-out"
          style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
        />
      </div>

      <main>
        <Hero />
        <About />
        <Technology />
        <Capabilities />
        <GenePlayground />
        <Stats />
        <FinalCta />
      </main>
    </>
  );
}
