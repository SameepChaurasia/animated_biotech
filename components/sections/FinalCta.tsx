"use client";

import React, { useState, useRef } from "react";
import { Send, ShieldCheck, Activity, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FINAL_CTA } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FinalCtaProps {
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenPartner }) => {
  const [email, setEmail] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(1024);

  // 3D Tilt & Specular Light Coordinates with smooth damping
  const [coords, setCoords] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isReducedMotion || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D rotational tilt tuned for compact card
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setCoords({
      x: percentX,
      y: percentY,
      rotateX,
      rotateY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenPartner();
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      className="py-12 md:py-18 bg-transparent relative overflow-visible scroll-mt-24"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SEAMLESS BLENDED BACKGROUND SYSTEM
          Smooth gradient transitions connecting System B above & Footer below
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, #070c18 0%, #040814 30%, #030712 70%, #020617 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {/* Bioluminescent Vortex Nebula 1 — Vibrant Electric Cyan (Upper Center) */}
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"
          style={{
            top: "30%",
            left: "50%",
            width: "45vw",
            height: "35vh",
            maxWidth: "600px",
            maxHeight: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.12) 0%, rgba(59, 130, 246, 0.06) 45%, transparent 70%)",
            filter: "blur(75px)",
          }}
        />

        {/* Bioluminescent Nebula 2 — Deep Royal Indigo & Violet (Lower Center) */}
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            top: "65%",
            left: "50%",
            width: "40vw",
            height: "30vh",
            maxWidth: "550px",
            maxHeight: "350px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.14) 0%, rgba(168, 85, 247, 0.06) 50%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* Continuous Micro Perspective Cyber-Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.07) 1px, transparent 1px),
              radial-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px, 28px 28px, 28px 28px",
            opacity: 0.65,
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            2. COMPACT 3D PERSPECTIVE WRAPPER & REALISTIC POP-OUT CONTAINER
           ───────────────────────────────────────────────────────────── */}
        <div
          className="relative max-w-2xl mx-auto px-2"
          style={{ perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Floating 3D Pop-Out Holographic Badge 1 — Top Left Overhang */}
          <div
            className="absolute -top-3.5 left-4 sm:left-7 z-30 pointer-events-none transition-transform duration-300 ease-out hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400/60 shadow-[0_8px_25px_rgba(0,0,0,0.9),0_0_15px_rgba(34,211,238,0.35)] backdrop-blur-xl animate-float-1"
            style={{
              transform: `translateZ(${isHovered ? "55px" : "35px"}) translateY(${isHovered ? "-3px" : "0px"})`,
              transformStyle: "preserve-3d",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[10px] font-bold text-cyan-300 tracking-wider">
              SYS.ACTIVE // 99.8% ACCEL
            </span>
          </div>

          {/* Floating 3D Pop-Out Holographic Badge 2 — Bottom Right Overhang */}
          <div
            className="absolute -bottom-3.5 right-4 sm:right-7 z-30 pointer-events-none transition-transform duration-300 ease-out hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-indigo-400/60 shadow-[0_8px_25px_rgba(0,0,0,0.9),0_0_15px_rgba(99,102,241,0.35)] backdrop-blur-xl animate-float-2"
            style={{
              transform: `translateZ(${isHovered ? "55px" : "35px"}) translateY(${isHovered ? "3px" : "0px"})`,
              transformStyle: "preserve-3d",
            }}
          >
            <Cpu className="w-3 h-3 text-indigo-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-indigo-300 tracking-wider">
              PROTOCOL 05 · CLOUD LAB
            </span>
          </div>

          {/* Floating 3D Bioluminescent Energy Orbital Nodes */}
          <div
            className="absolute -top-5 -right-4 w-10 h-10 pointer-events-none z-30 hidden md:block transition-transform duration-500 ease-out"
            style={{
              transform: `translateZ(${isHovered ? "65px" : "40px"}) scale(${isHovered ? 1.1 : 1})`,
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#3b82f6] animate-ping opacity-75" />
            <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
          </div>

          <div
            className="absolute -bottom-5 -left-4 w-10 h-10 pointer-events-none z-30 hidden md:block transition-transform duration-500 ease-out"
            style={{
              transform: `translateZ(${isHovered ? "65px" : "40px"}) scale(${isHovered ? 1.1 : 1})`,
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_15px_#6366f1,0_0_30px_#a855f7] animate-pulse" />
          </div>

          {/* ─────────────────────────────────────────────────────────
              3. COMPACT 3D CYBERNETIC COCKPIT CARD
              Permanent glowing cyber border + dynamic 3D tilt & specular reflection
             ───────────────────────────────────────────────────────── */}
          <div
            ref={cardRef}
            className="relative p-[2px] transition-transform duration-200 ease-out cursor-default"
            style={{
              borderRadius: "32px 14px 32px 14px",
              transformStyle: "preserve-3d",
              transform: isReducedMotion || isMobile
                ? "none"
                : `perspective(1200px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(${isHovered ? 1.02 : 1.005}, ${isHovered ? 1.02 : 1.005}, ${isHovered ? 1.02 : 1.005})`,
              boxShadow: `
                0 0 35px rgba(59, 130, 246, ${isHovered ? "0.4" : "0.25"}),
                0 0 70px rgba(34, 211, 238, ${isHovered ? "0.22" : "0.14"}),
                0 0 100px rgba(99, 102, 241, ${isHovered ? "0.18" : "0.10"}),
                0 25px 60px -10px rgba(0, 0, 0, 0.95)
              `,
              background: "linear-gradient(135deg, #38BDF8 0%, #3B82F6 30%, #6366F1 70%, #A855F7 100%)",
            }}
          >
            {/* Top Metallic Specular Rim Line */}
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent rounded-full z-20 pointer-events-none opacity-80" />

            {/* Bottom Cyber Glow Line */}
            <div className="absolute bottom-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent rounded-full z-20 pointer-events-none opacity-65" />

            {/* Inner Slab Container */}
            <div
              className="relative p-6 sm:p-8 md:p-9 bg-slate-950/95 backdrop-blur-3xl overflow-hidden text-center"
              style={{
                borderRadius: "30px 12px 30px 12px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Sci-Fi HUD Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg border-cyan-400/90 pointer-events-none z-20 flex items-start justify-start p-0.5">
                <div className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_6px_#22d3ee]" />
              </div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 rounded-tr-md border-blue-400/90 pointer-events-none z-20 flex items-start justify-end p-0.5">
                <div className="w-1 h-1 rounded-full bg-blue-300 animate-pulse shadow-[0_0_6px_#3b82f6]" />
              </div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 rounded-bl-md border-purple-400/90 pointer-events-none z-20 flex items-end justify-start p-0.5">
                <div className="w-1 h-1 rounded-full bg-purple-300 animate-pulse shadow-[0_0_6px_#a855f7]" />
              </div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 rounded-br-lg border-cyan-400/90 pointer-events-none z-20 flex items-end justify-end p-0.5">
                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              </div>

              {/* Dynamic Cursor Spotlight & Flashlight Specular Sheen */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                style={{
                  background: `
                    radial-gradient(400px circle at ${coords.x}% ${coords.y}%, rgba(56, 189, 248, 0.14), rgba(99, 102, 241, 0.06) 40%, transparent 80%),
                    radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.06) 0%, transparent 60%)
                  `,
                }}
              />

              {/* Subtle Tech Grid Texture Inside Card */}
              <div
                className="absolute inset-0 pointer-events-none opacity-15 z-0"
                style={{
                  backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Ambient Inner Glow Blobs */}
              <div className="absolute -top-20 -left-20 w-44 h-44 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

              {/* ─────────────────────────────────────────────────────
                  4. COMPACT CARD CONTENT (PROFESSIONAL & SLEEK)
                 ───────────────────────────────────────────────────── */}
              <div
                className="relative z-20 flex flex-col items-center justify-center max-w-xl mx-auto"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Eyebrow with Glowing Pulse Beacon */}
                <div
                  className="mb-2.5 transition-transform duration-200"
                  style={{
                    transform: `translateZ(${isHovered ? "30px" : "20px"})`,
                  }}
                >
                  <Eyebrow
                    label={FINAL_CTA.eyebrow}
                    className="mx-auto text-cyan-400 font-semibold text-[11px] sm:text-xs drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  />
                </div>

                {/* Compact, Bold 3D Headline */}
                <h2
                  className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight transition-transform duration-200"
                  style={{
                    transform: `translateZ(${isHovered ? "45px" : "30px"})`,
                    background: "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #7DD3FC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.3))",
                  }}
                >
                  {FINAL_CTA.headline}
                </h2>

                {/* Compact Subheadline */}
                <p
                  className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6 drop-shadow-sm transition-transform duration-200"
                  style={{
                    transform: `translateZ(${isHovered ? "32px" : "22px"})`,
                  }}
                >
                  {FINAL_CTA.subheadline}
                </p>

                {/* Compact 3D Email Form Dock */}
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-[22px] sm:rounded-full bg-slate-900/90 border border-slate-700/80 shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all duration-200"
                  style={{
                    transform: `translateZ(${isHovered ? "50px" : "35px"})`,
                  }}
                >
                  <div className="relative w-full flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={FINAL_CTA.inputPlaceholder}
                      className="w-full px-4 py-2.5 rounded-full bg-transparent border-none text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 font-sans text-xs sm:text-sm font-medium"
                    />
                  </div>

                  <MagneticButton className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full sm:w-auto whitespace-nowrap rounded-full bg-gradient-to-r from-white via-slate-100 to-cyan-100 text-slate-950 font-bold hover:bg-white border-none px-5 py-2.5 text-xs sm:text-sm cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(255,255,255,0.7),0_0_45px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5"
                      icon={<Send className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />}
                    >
                      {FINAL_CTA.ctaButton}
                    </Button>
                  </MagneticButton>
                </form>

                {/* Compact Security & Compliance Badges */}
                <div
                  className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 font-mono text-[9.5px] sm:text-[10.5px] text-slate-300 font-medium transition-transform duration-200"
                  style={{
                    transform: `translateZ(${isHovered ? "25px" : "15px"})`,
                  }}
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-blue-300 shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>SOC 2 TYPE II</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-indigo-300 shadow-sm">
                    <Activity className="w-3 h-3 text-indigo-400" />
                    <span>HIPAA PIPELINES</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-purple-300 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>BIO-VAULT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
