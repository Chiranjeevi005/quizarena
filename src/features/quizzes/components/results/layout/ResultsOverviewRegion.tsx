import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsOverviewRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsOverviewRegion: React.FC<ResultsOverviewRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-overview-region",
      name: "ResultsOverviewRegion",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
