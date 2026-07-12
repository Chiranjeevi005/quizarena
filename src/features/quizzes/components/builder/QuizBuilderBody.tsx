import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizBuilderBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizBuilderBody: React.FC<QuizBuilderBodyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-builder-body",
      name: "QuizBuilderBody",
      category: "quiz",
      subtype: "builder",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
