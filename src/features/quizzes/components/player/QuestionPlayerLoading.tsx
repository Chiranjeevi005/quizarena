import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionPlayerLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuestionPlayerLoading: React.FC<QuestionPlayerLoadingProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-player-loading",
      name: "QuestionPlayerLoading",
      category: "quiz",
      subtype: "player",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
