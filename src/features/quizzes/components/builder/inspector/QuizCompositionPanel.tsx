import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizCompositionPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizCompositionPanel: React.FC<QuizCompositionPanelProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-composition-panel",
      name: "QuizCompositionPanel",
      category: "quiz",
      subtype: "builder-inspector",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
