"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "cyan" | "pink";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, children, className, icon, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-white text-slate-950 font-bold shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 border-none",
      ghost:
        "bg-slate-900/80 text-white border border-white/20 backdrop-blur-md hover:bg-slate-800 hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] active:scale-95",
      cyan:
        "bg-blue-600 text-white font-bold shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:scale-105 active:scale-95 border border-blue-500",
      pink:
        "bg-purple-600 text-white font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500 hover:shadow-[0_0_35px_rgba(147,51,234,0.6)] hover:scale-105 active:scale-95 border border-purple-500",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-4 gap-2.5 font-semibold",
    };

    const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
          {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...props}
      >
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
