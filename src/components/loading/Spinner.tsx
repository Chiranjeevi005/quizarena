import React from "react";
import { cn } from "@/utilities";
import { ComponentRegistry } from "@/registry";

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "neutral";
}

export function Spinner({ className, size = "md", variant = "primary", ...props }: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "animate-spin",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        {
          "text-blue-500": variant === "primary",
          "text-slate-500": variant === "secondary",
          "text-slate-400": variant === "neutral",
        },
        className
      )}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

ComponentRegistry.register({
  id: "spinner",
  name: "Spinner",
  category: "loading",
  version: "1.0.0",
  status: "stable",
  owner: "FS-00",
});
