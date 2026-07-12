import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizPreviewProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-preview",
      name: "QuizPreview",
      category: "quiz",
      subtype: "builder-preview",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
