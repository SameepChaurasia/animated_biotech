"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className }) => {
  return (
    <div className={cn("w-full flex items-center justify-center my-6 pointer-events-none z-10 relative", className)}>
      <div className="w-1/2 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_10px_#00E5FF] animate-pulse" />
      </div>
    </div>
  );
};
