import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionInstructionBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionInstructionBar: React.FC<QuestionInstructionBarProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-instruction-bar",
      name: "QuestionInstructionBar",
      category: "quiz",
      subtype: "player-navigation",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
