import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className, id }) => {
  return (
    <div id={id} className={cn("max-w-7xl mx-auto px-6 md:px-10 w-full", className)}>
      {children}
    </div>
  );
};
