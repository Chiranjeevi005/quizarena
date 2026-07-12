import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsHighlightsRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsHighlightsRegion: React.FC<ResultsHighlightsRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-highlights-region",
      name: "ResultsHighlightsRegion",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
