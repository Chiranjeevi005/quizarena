import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPreviewRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPreviewRegion: React.FC<QuestionPreviewRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-preview-region",
      name: "QuestionPreviewRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
