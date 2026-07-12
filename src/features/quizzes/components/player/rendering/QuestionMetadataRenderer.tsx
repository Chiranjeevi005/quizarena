import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionMetadataRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionMetadataRenderer: React.FC<QuestionMetadataRendererProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-metadata-renderer",
      name: "QuestionMetadataRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
