import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionPlaceholder: React.FC<QuizSessionPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-placeholder",
      name: "QuizSessionPlaceholder",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
