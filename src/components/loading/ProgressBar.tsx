import React from "react";
import { cn } from "@/utilities";
import { ComponentRegistry } from "@/registry";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

export function ProgressBar({ value, max = 100, className, ...props }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800",
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

ComponentRegistry.register({
  id: "progress-bar",
  name: "ProgressBar",
  category: "loading",
  version: "1.0.0",
  status: "stable",
  owner: "FS-00",
});
