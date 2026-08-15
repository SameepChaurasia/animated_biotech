"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/content";

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
      setScrolled(window.scrollY > 30);

      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
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

  return (
    <header className="fixed top-4 left-4 right-4 z-50 max-w-[1500px] mx-auto">
      <div
        className={`w-full rounded-full transition-all duration-300 px-5 md:px-7 py-3 flex items-center justify-between backdrop-blur-2xl border ${
          scrolled
            ? "bg-slate-950/90 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            : "bg-slate-950/70 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
        }`}
      >
        {/* Logo Monogram with Recruiter Attribution Pill */}
        <Link
          href="#main"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full px-2 py-1"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
            <svg viewBox="0 0 100 100" className="w-5 h-5 stroke-current fill-none stroke-[8]">
              <path d="M 75 30 C 40 10, 20 40, 35 70 C 50 90, 80 75, 80 75" strokeLinecap="round" />
              <path d="M 65 20 C 30 30, 30 70, 65 80" stroke="#38BDF8" strokeLinecap="round" />
              <circle cx="50" cy="50" r="7" fill="#6366F1" stroke="none" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
              Codex <span className="text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">Bio</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-400 font-semibold -mt-1 hidden sm:inline-block">
              BY SAMEEP CHAURASIA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Active Scroll-Spy & Increased Font Size */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 px-2 py-1">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-sans text-sm lg:text-base font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_0_18px_rgba(59,130,246,0.6)] border border-blue-400/60"
                    : "text-slate-200 hover:text-blue-400 hover:bg-slate-900/70"
                }`}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenPartner}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all border-none text-sm px-5 py-2 cursor-pointer"
            icon={<ArrowUpRight className="w-4 h-4 text-slate-950" />}
          >
            Partner with us
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2.5 rounded-full bg-slate-900 border border-white/20 text-white hover:text-blue-400 focus-visible:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                    onClick={() => setMobileMenuOpen(false)}
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



