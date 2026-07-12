import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizReadinessPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizReadinessPanel: React.FC<QuizReadinessPanelProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-readiness-panel",
      name: "QuizReadinessPanel",
      category: "quiz",
      subtype: "builder-inspector",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
