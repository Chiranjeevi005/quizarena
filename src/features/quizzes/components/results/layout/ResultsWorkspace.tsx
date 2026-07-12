import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsWorkspaceProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsWorkspace: React.FC<ResultsWorkspaceProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-workspace",
      name: "ResultsWorkspace",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
