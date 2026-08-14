"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { NAV_LINKS } from "@/data/content";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 md:py-5",
        scrolled
          ? "bg-void/85 backdrop-blur-2xl border-b border-accent-cyan/20 shadow-[0_4px_30px_rgba(0,229,255,0.1)] py-3 md:py-4"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Logo Monogram with Recruiter Attribution Pill */}
        <Link href="#main" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-lg p-1">
          <div className="w-9 h-9 rounded-xl bg-surface-elevated border border-accent-cyan/30 flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan group-hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all">
            <svg viewBox="0 0 100 100" className="w-6 h-6 stroke-current fill-none stroke-[7]">
              {/* Double helix C mark */}
              <path d="M 75 30 C 40 10, 20 40, 35 70 C 50 90, 80 75, 80 75" strokeLinecap="round" />
              <path d="M 65 20 C 30 30, 30 70, 65 80" stroke="#00E5FF" strokeLinecap="round" />
              <circle cx="50" cy="50" r="6" fill="#C8FF4D" stroke="none" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg md:text-xl text-ink tracking-tight flex items-center gap-1.5">
              CODEX <span className="text-accent-cyan font-mono">BIO</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent-lime font-semibold -mt-1 hidden sm:inline-block">
              BY SAMEEP CHAURASIA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 bg-surface-elevated/70 border border-accent-cyan/25 rounded-full px-6 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(0,229,255,0.06)] hover:border-accent-cyan/50 transition-colors">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-accent-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button, Sound Toggle & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <SoundToggle />

          <Button href="#cta" variant="primary" size="sm" className="hidden sm:inline-flex" icon={<ArrowUpRight className="w-4 h-4" />}>
            Request Access
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2.5 rounded-full bg-surface-elevated border border-accent-cyan/30 text-ink hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-void/98 backdrop-blur-2xl border-t border-accent-cyan/20 flex flex-col justify-between p-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 my-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
                // NAVIGATION
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-3xl font-bold text-ink hover:text-accent-cyan transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-border flex flex-col gap-4">
              <Button
                href="#cta"
                variant="primary"
                size="lg"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center"
              >
                Request Access
              </Button>
              <div className="text-center font-mono text-xs text-ink-muted">
                CODEX BIO © 2026 · ALL RIGHTS RESERVED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

