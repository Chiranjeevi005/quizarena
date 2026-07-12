import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsStatusProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsStatus: React.FC<QuizResultsStatusProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-status",
      name: "QuizResultsStatus",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
