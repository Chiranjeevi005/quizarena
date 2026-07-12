import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ScoreSummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "score-summary",
      name: "ScoreSummary",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
