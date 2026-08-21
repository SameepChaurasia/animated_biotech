"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dna,
  LayoutDashboard,
  FolderGit2,
  Binary,
  Workflow,
  Bot,
  Box,
  Scissors,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export const NAV_PLATFORM_ITEMS = [
  {
    category: "Core Workstation",
    items: [
      { label: "Command Center", href: "/dashboard", icon: LayoutDashboard, badge: "Live" },
      { label: "Project Vault", href: "/projects", icon: FolderGit2 },
    ],
  },
  {
    category: "Bio-Compute Tools",
    items: [
      { label: "Sequence Lab", href: "/tools/sequence-lab", icon: Binary, badge: "v2.4" },
      { label: "Pipeline Builder", href: "/tools/pipeline-builder", icon: Workflow },
      { label: "AI Genomics Copilot", href: "/tools/ai-agent", icon: Bot, badge: "AI" },
      { label: "3D Molecular Studio", href: "/tools/molecular-viewer", icon: Box },
      { label: "CRISPR Guide Designer", href: "/tools/crispr-designer", icon: Scissors },
    ],
  },
  {
    category: "Knowledge & Config",
    items: [
      { label: "Research Monograph Hub", href: "/research", icon: BookOpen },
      { label: "Platform Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-surface/90 backdrop-blur-2xl border-r border-border flex flex-col transition-all duration-300 ease-premium ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3 overflow-hidden group" title="Return to Landing Page">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-void rounded-[10px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-accent-cyan animate-spin-20s" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-ink flex items-center gap-1.5 group-hover:text-accent-cyan transition-colors">
                CODEX <span className="text-accent-cyan">BIO</span>
              </span>
              <span className="text-[10px] font-mono text-ink-muted/80 tracking-widest uppercase">
                Enterprise OS
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-surface-elevated hover:bg-slate-800 text-ink-muted hover:text-ink transition-colors border border-white/5"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {NAV_PLATFORM_ITEMS.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {!collapsed && (
              <p className="px-3 text-[10px] font-mono font-semibold tracking-wider text-ink-muted/60 uppercase">
                {section.category}
              </p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/25 to-indigo-600/15 text-accent-cyan border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                      : "text-ink-muted hover:text-ink hover:bg-surface-elevated/60 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-accent-cyan" : "text-ink-muted group-hover:text-blue-400"
                    }`}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate font-sans">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md uppercase font-semibold ${
                        item.badge === "Live"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : item.badge === "AI"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Back to Public Landing */}
        <div className="pt-2 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono text-ink-muted hover:text-accent-lime hover:bg-surface-elevated transition-colors"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Public Landing</span>}
          </Link>
        </div>
      </div>

      {/* Footer User Profile */}
      <div className="p-3 border-t border-border bg-surface-elevated/40">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-surface/60 border border-white/5">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 rounded-lg border border-blue-500/40",
              },
            }}
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-ink truncate">
                {user?.fullName || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "Chief Investigator"}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Cluster Online
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
