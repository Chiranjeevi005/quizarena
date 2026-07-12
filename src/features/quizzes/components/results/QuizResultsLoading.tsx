import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsLoading: React.FC<QuizResultsLoadingProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-loading",
      name: "QuizResultsLoading",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
