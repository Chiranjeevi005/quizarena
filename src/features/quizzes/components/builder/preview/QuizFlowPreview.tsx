import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizFlowPreviewProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizFlowPreview: React.FC<QuizFlowPreviewProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-flow-preview",
      name: "QuizFlowPreview",
      category: "quiz",
      subtype: "builder-preview",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
