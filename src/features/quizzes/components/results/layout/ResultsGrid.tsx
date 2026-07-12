import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsGridProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-grid",
      name: "ResultsGrid",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
