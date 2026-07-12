import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultHighlightsProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultHighlights: React.FC<ResultHighlightsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "result-highlights",
      name: "ResultHighlights",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
