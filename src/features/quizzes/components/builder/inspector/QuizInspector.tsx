import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizInspectorProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizInspector: React.FC<QuizInspectorProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-inspector",
      name: "QuizInspector",
      category: "quiz",
      subtype: "builder-inspector",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
