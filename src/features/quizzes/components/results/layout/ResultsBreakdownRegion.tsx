import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsBreakdownRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsBreakdownRegion: React.FC<ResultsBreakdownRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-breakdown-region",
      name: "ResultsBreakdownRegion",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
