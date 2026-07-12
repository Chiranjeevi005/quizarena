import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionSelectionSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionSelectionSection: React.FC<QuestionSelectionSectionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-selection-section",
      name: "QuestionSelectionSection",
      category: "quiz",
      subtype: "builder-section",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
