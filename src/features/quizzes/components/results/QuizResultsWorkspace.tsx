import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizResultsWorkspaceProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizResultsWorkspace: React.FC<QuizResultsWorkspaceProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-results-workspace",
      name: "QuizResultsWorkspace",
      category: "quiz",
      subtype: "results",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
