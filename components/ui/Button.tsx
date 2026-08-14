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
      "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-void disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-accent-cyan text-void font-bold shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 border border-accent-cyan",
      ghost:
        "bg-surface-elevated/80 text-ink border border-accent-cyan/30 backdrop-blur-md hover:bg-surface-elevated hover:border-accent-cyan hover:text-accent-cyan hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] active:scale-95",
      cyan:
        "bg-accent-cyan text-void font-bold shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 border border-accent-cyan",
      pink:
        "bg-accent-pink text-void font-bold shadow-[0_0_20px_rgba(255,107,157,0.3)] hover:shadow-[0_0_35px_rgba(255,107,157,0.6)] hover:scale-105 active:scale-95 border border-accent-pink",
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
