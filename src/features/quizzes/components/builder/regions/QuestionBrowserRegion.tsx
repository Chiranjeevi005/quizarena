import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionBrowserRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionBrowserRegion: React.FC<QuestionBrowserRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-browser-region",
      name: "QuestionBrowserRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
