import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsInsightsRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsInsightsRegion: React.FC<ResultsInsightsRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-insights-region",
      name: "ResultsInsightsRegion",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
