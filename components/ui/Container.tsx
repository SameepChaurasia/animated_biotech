import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className, id }) => {
  return (
    <div id={id} className={cn("max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full", className)}>
      {children}
    </div>
  );
};
