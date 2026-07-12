import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPreviewCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPreviewCard: React.FC<QuestionPreviewCardProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-preview-card",
      name: "QuestionPreviewCard",
      category: "quiz",
      subtype: "builder-preview",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
