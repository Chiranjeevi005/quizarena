import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizBuilderWorkspaceProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizBuilderWorkspace: React.FC<QuizBuilderWorkspaceProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-builder-workspace",
      name: "QuizBuilderWorkspace",
      category: "quiz",
      subtype: "builder",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
