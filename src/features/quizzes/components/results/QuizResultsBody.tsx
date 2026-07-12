import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsBody: React.FC<QuizResultsBodyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-body",
      name: "QuizResultsBody",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
