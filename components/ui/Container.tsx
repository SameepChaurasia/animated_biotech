import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className, id }) => {
  return (
    <div id={id} className={cn("max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full", className)}>
      {children}
    </div>
  );
};
