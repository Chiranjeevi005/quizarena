import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerEmpty: React.FC<QuestionPlayerEmptyProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-empty",
      name: "QuestionPlayerEmpty",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
