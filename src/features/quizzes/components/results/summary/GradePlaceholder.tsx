import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface GradePlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const GradePlaceholder: React.FC<GradePlaceholderProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "grade-placeholder",
      name: "GradePlaceholder",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
