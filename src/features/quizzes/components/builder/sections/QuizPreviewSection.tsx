import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizPreviewSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizPreviewSection: React.FC<QuizPreviewSectionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-preview-section",
      name: "QuizPreviewSection",
      category: "quiz",
      subtype: "builder-section",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
