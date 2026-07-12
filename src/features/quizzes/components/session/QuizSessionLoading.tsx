import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionLoading: React.FC<QuizSessionLoadingProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-loading",
      name: "QuizSessionLoading",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
