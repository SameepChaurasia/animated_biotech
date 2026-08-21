"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/content";
import { soundManager } from "@/lib/audio";

interface NavbarProps {
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartner }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("main");

  useEffect(() => {
    const sectionIds = ["main", "about", "technology", "research", "capabilities", "playground", "impact", "cta"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (elementTop <= scrollPosition) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        soundManager.playClickSound();
        const rect = el.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - 60;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActiveSection(id);
      }
    }
  };

  return (
    <header className="fixed top-3 left-3 right-3 z-50 max-w-5xl mx-auto">
      <div
        className={`w-full rounded-full transition-all duration-300 px-3.5 md:px-4 py-1.5 md:py-2 flex items-center justify-between backdrop-blur-2xl border ${
          scrolled
            ? "bg-slate-950/90 border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
            : "bg-slate-950/75 border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.65)]"
        }`}
      >
        {/* Logo Monogram with Recruiter Attribution Pill */}
        <Link
          href="#main"
          onClick={(e) => handleNavClick("#main", e)}
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full px-1 py-0.5"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all shrink-0">
            <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 stroke-current fill-none stroke-[8]">
              <path d="M 75 30 C 40 10, 20 40, 35 70 C 50 90, 80 75, 80 75" strokeLinecap="round" />
              <path d="M 65 20 C 30 30, 30 70, 65 80" stroke="#38BDF8" strokeLinecap="round" />
              <circle cx="50" cy="50" r="7" fill="#6366F1" stroke="none" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xs sm:text-sm text-white tracking-tight flex items-center gap-1">
              Codex <span className="text-blue-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Bio</span>
            </span>
            <span className="font-mono text-[7.5px] uppercase tracking-widest text-indigo-400 font-semibold -mt-0.5 hidden sm:inline-block">
              BY SAMEEP CHAURASIA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Active Scroll-Spy */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-1 py-0.5">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`font-sans text-xs lg:text-[13px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] border border-blue-400/60"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/70"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-accent-cyan font-mono text-xs px-3 py-1.5 transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:scale-105"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
            <span>Platform OS</span>
          </Link>

          <Button
            onClick={onOpenPartner}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all border-none text-xs px-3.5 py-1.5 cursor-pointer shadow-sm"
            icon={<ArrowUpRight className="w-3 h-3 text-slate-950" />}
          >
            Partner with us
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-1.5 rounded-full bg-slate-900 border border-white/20 text-white hover:text-blue-400 focus-visible:outline-none"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-3 w-full bg-slate-950/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1">
                // NAVIGATION
              </span>
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(link.href, e);
                    }}
                    className={`font-sans text-xl font-bold transition-all py-2.5 px-4 rounded-2xl flex items-center justify-between ${
                      isActive
                        ? "bg-blue-600/40 text-blue-300 border border-blue-500/50 shadow-md"
                        : "text-white hover:text-blue-400 hover:bg-slate-900/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartner();
                }}
                variant="primary"
                size="lg"
                className="w-full text-center rounded-full bg-white text-slate-950 font-bold text-base py-3 cursor-pointer"
              >
                Partner with us
              </Button>
              <div className="text-center font-mono text-[11px] text-slate-400">
                CODEX BIO © 2026 · ALL RIGHTS RESERVED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};



