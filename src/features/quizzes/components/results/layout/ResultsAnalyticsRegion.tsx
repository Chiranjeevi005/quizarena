import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsAnalyticsRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsAnalyticsRegion: React.FC<ResultsAnalyticsRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-analytics-region",
      name: "ResultsAnalyticsRegion",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
