import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizBuilderStatusProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizBuilderStatus: React.FC<QuizBuilderStatusProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-builder-status",
      name: "QuizBuilderStatus",
      category: "quiz",
      subtype: "builder",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
