import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsTimelineRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsTimelineRegion: React.FC<ResultsTimelineRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-timeline-region",
      name: "ResultsTimelineRegion",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
