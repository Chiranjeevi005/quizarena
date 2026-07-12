import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionAttachmentRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionAttachmentRenderer: React.FC<QuestionAttachmentRendererProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-attachment-renderer",
      name: "QuestionAttachmentRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
