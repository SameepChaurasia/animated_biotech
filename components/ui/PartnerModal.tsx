"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Building2, Mail, User, ShieldCheck, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    orgType: "Biopharma",
    therapeuticArea: "Oncology Lead Discovery",
    timeline: "Q3 2026",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClickSound();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      organization: "",
      orgType: "Biopharma",
      therapeuticArea: "Oncology Lead Discovery",
      timeline: "Q3 2026",
      message: "",
    });
    onClose();
  };

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
          className="relative w-full max-w-2xl bg-slate-950 border-2 border-blue-500/50 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest block mb-2">
                  // DISPATCH LOGGED & CONFIRMED
                </span>
                <h3 className="font-sans text-3xl font-extrabold text-white mb-2">
                  Partnership Inquiry Received
                </h3>
                <p className="font-sans text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-blue-300 font-bold">{formData.name || "Partner"}</span>. Our business development team at Codex Bio will review your project requirements for <span className="text-blue-300">{formData.organization || "your institution"}</span> and reach out within 24 business hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400 max-w-md mx-auto text-left space-y-1">
                <div><span className="text-blue-400">EMAIL:</span> {formData.email}</div>
                <div><span className="text-blue-400">DOMAIN:</span> {formData.therapeuticArea}</div>
                <div><span className="text-blue-400">TARGET TIMELINE:</span> {formData.timeline}</div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all shadow-lg"
              >
                RETURN TO PLATFORM
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4" /> // INITIATE RESEARCH COLLABORATION
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
                  Partner With Codex Bio
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                  Access our generative AI protein engine, custom synthesis automation, or co-develop breakthrough targets.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1 font-semibold">
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Eleanor Vance"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1 font-semibold">
                      INSTITUTIONAL EMAIL *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.vance@biopharma.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1 font-semibold">
                      ORGANIZATION / COMPANY *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Cambridge Bio Therapeutics"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Org Type */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1 font-semibold">
                      ORGANIZATION TYPE
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="Biopharma">Biopharma Leader</option>
                      <option value="Academic">Academic / Research University</option>
                      <option value="Startup">Early-Stage Biotech Startup</option>
                      <option value="Venture">Venture / Investor Partner</option>
                    </select>
                  </div>
                </div>

                {/* Therapeutic Area */}
                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1 font-semibold">
                    PRIMARY RESEARCH DOMAIN
                  </label>
                  <select
                    value={formData.therapeuticArea}
                    onChange={(e) => setFormData({ ...formData, therapeuticArea: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Oncology Lead Discovery">Oncology & Membrane Receptor Binding</option>
                    <option value="Genomic Omics Analytics">Pan-Genome Multi-Omics Analytics</option>
                    <option value="Synthetic Enzyme Engineering">Synthetic Pathway & Biomanufacturing</option>
                    <option value="In Silico Toxicology">Predictive Toxicology & ADMET Safety</option>
                    <option value="Custom Bio-Compute Infrastructure">Custom Bio-Compute Infrastructure</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1 font-semibold">
                    PROJECT SCOPE & OBJECTIVES
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your target proteins, therapeutic objectives, or computational bio requirements..."
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>NDAS & HIPAA COMPLIANT</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "DISPATCHING REQUEST..." : "SUBMIT PARTNERSHIP BRIEF"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
