import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface TrendComparisonProps {
  children?: React.ReactNode;
  className?: string;
}

export const TrendComparison: React.FC<TrendComparisonProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "trend-comparison",
      name: "TrendComparison",
      category: "quiz",
      subtype: "analytics-comparison",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
