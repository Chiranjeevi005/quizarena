import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizBuilderHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizBuilderHeader: React.FC<QuizBuilderHeaderProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-builder-header",
      name: "QuizBuilderHeader",
      category: "quiz",
      subtype: "builder",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
