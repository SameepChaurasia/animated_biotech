"use client";

import React from "react";
import { Eyebrow } from "./Eyebrow";
import { TextDecode } from "./TextDecode";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  subheading?: string;
  align?: "left" | "center" | "right";
  className?: string;
  useDecode?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  headline,
  subheading,
  align = "left",
  className,
  useDecode = false,
}) => {
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col mb-12 md:mb-16 max-w-5xl", alignmentStyles[align], className)}>
      <Eyebrow label={eyebrow} />
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.1] mb-4">
        {useDecode ? <TextDecode text={headline} /> : headline}
      </h2>
      {subheading && (
        <p className="text-base md:text-lg text-ink-muted leading-relaxed font-sans max-w-3xl">
          {subheading}
        </p>
      )}
    </div>
  );
};
