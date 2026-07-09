import React from "react";
import { cn } from "@/utilities";
import { ComponentRegistry } from "@/registry";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "text";
}

export function Skeleton({ className, variant = "rectangular", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4 w-full",
        className
      )}
      {...props}
    />
  );
}

ComponentRegistry.register({
  id: "skeleton",
  name: "Skeleton",
  category: "loading",
  version: "1.0.0",
  status: "stable",
  owner: "FS-00",
});
