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
    <div className={cn("flex flex-col mb-8 md:mb-10 max-w-4xl", alignmentStyles[align], className)}>
      <Eyebrow label={eyebrow} />
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.15] mb-3">
        {useDecode ? <TextDecode text={headline} /> : headline}
      </h2>
      {subheading && (
        <p className="text-sm md:text-base text-ink-muted leading-relaxed font-sans max-w-2xl">
          {subheading}
        </p>
      )}
    </div>
  );
};
