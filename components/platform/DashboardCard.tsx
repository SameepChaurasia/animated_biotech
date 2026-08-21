"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtitle?: string;
  badge?: string;
  glowColor?: "blue" | "purple" | "cyan" | "lime";
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  badge,
  glowColor = "blue",
}) => {
  const glowMap = {
    blue: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-pink-500/5 border-purple-500/30 text-purple-400",
    cyan: "from-cyan-500/20 to-blue-500/5 border-cyan-500/30 text-cyan-400",
    lime: "from-lime-500/20 to-emerald-500/5 border-lime-500/30 text-lime-400",
  };

  return (
    <div className="relative group p-5 rounded-2xl bg-surface/70 backdrop-blur-xl border border-border hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden">
      {/* Top ambient glow corner */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity bg-gradient-to-br ${glowMap[glowColor]}`}
      />

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-mono font-medium text-ink-muted uppercase tracking-wider">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
              {value}
            </span>
            {change && (
              <span
                className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                }`}
              >
                {change}
              </span>
            )}
          </div>
        </div>

        <div
          className={`p-3 rounded-xl bg-surface-elevated/80 border border-white/5 group-hover:scale-110 transition-transform ${glowMap[glowColor]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {subtitle && (
        <p className="text-xs text-ink-muted mt-3 font-sans line-clamp-1">{subtitle}</p>
      )}

      {badge && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-ink-muted/80">
          <span>Target Metric</span>
          <span className="text-accent-cyan font-semibold">{badge}</span>
        </div>
      )}
    </div>
  );
};
