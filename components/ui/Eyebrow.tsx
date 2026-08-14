import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  label: string;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ label, className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs md:text-sm tracking-widest text-blue-400 uppercase font-semibold mb-3 select-none",
        className
      )}
    >
      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3B82F6]" />
      <span>{label}</span>
    </div>
  );
};
