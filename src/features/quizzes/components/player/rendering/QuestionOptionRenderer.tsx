import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuestionOptionRendererProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const QuestionOptionRenderer: React.FC<QuestionOptionRendererProps> = ({
  children,
  className,
  onClick,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "question-option-renderer",
      name: "QuestionOptionRenderer",
      category: "quiz",
      subtype: "player-renderer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return (
    <div className={className || ""} onClick={onClick}>
      {children}
    </div>
  );
};
