import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface NextLearningPathPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const NextLearningPathPlaceholder: React.FC<NextLearningPathPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "next-learning-path-placeholder",
      name: "NextLearningPathPlaceholder",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
