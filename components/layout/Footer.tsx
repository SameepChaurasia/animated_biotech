"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Dna } from "lucide-react";
import { FOOTER_COLUMNS } from "@/data/content";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surface-elevated/80 backdrop-blur-xl border-t border-accent-cyan/20 pt-16 md:pt-24 pb-12 text-ink relative z-10">
      <div className="max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Left Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="#main" className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface border border-accent-cyan/30 flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
                  <Dna className="w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">
                  CODEX <span className="text-accent-cyan font-mono">BIO</span>
                </span>
              </Link>
              <p className="text-sm text-ink-muted leading-relaxed max-w-sm mb-6">
                Engineering the code of life with generative protein design, cloud-native genomics, and high-throughput automated wet labs.
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X profile"
                className="w-10 h-10 rounded-full bg-surface border border-accent-cyan/20 flex items-center justify-center text-ink-muted hover:text-accent-cyan hover:border-accent-cyan/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-10 h-10 rounded-full bg-surface border border-accent-cyan/20 flex items-center justify-center text-ink-muted hover:text-accent-cyan hover:border-accent-cyan/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="w-10 h-10 rounded-full bg-surface border border-accent-cyan/20 flex items-center justify-center text-ink-muted hover:text-accent-cyan hover:border-accent-cyan/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Three Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-semibold">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-accent-cyan transition-colors font-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent-cyan/20 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-ink-muted">
          <div>
            © 2026 CODEX BIO. DESIGNED & DEVELOPED BY <span className="text-accent-cyan font-bold">SAMEEP CHAURASIA</span>.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-accent-cyan transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-accent-cyan transition-colors cursor-pointer">Terms of Access</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-accent-cyan hover:text-accent-lime transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan rounded p-1"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

