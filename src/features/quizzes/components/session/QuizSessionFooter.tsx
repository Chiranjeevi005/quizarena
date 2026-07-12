import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizSessionFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizSessionFooter: React.FC<QuizSessionFooterProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-session-footer",
      name: "QuizSessionFooter",
      category: "quiz",
      subtype: "session",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
