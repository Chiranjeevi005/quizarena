import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface BenchmarkComparisonProps {
  children?: React.ReactNode;
  className?: string;
}

export const BenchmarkComparison: React.FC<BenchmarkComparisonProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "benchmark-comparison",
      name: "BenchmarkComparison",
      category: "quiz",
      subtype: "analytics-comparison",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
