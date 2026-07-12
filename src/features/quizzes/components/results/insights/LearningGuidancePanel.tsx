import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface LearningGuidancePanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const LearningGuidancePanel: React.FC<LearningGuidancePanelProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "learning-guidance-panel",
      name: "LearningGuidancePanel",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
