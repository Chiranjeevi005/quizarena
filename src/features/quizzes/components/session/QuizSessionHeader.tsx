import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionHeader: React.FC<QuizSessionHeaderProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-header",
      name: "QuizSessionHeader",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
