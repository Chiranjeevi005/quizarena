import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsFooter: React.FC<QuizResultsFooterProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-footer",
      name: "QuizResultsFooter",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
