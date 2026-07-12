import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizWarningsPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizWarningsPanel: React.FC<QuizWarningsPanelProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-warnings-panel",
      name: "QuizWarningsPanel",
      category: "quiz",
      subtype: "builder-inspector",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
