"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Dna, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/[0.12] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Top back navigation */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Landing</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
          <Dna className="w-3.5 h-3.5 animate-spin-20s" />
          <span>Codex Bio Platform</span>
        </div>
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-display font-bold text-ink">Initialize Workspace</h1>
          <p className="text-xs text-ink-muted mt-1">Create an institutional investigator account</p>
        </div>

        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/dashboard"
        />

        {/* Security watermark */}
        <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-ink-muted/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>HIPAA & SOC 2 Type II Bio-Informatics Compliance</span>
        </div>
      </div>
    </div>
  );
}
