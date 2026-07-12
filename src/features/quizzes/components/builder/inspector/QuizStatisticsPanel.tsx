import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizStatisticsPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizStatisticsPanel: React.FC<QuizStatisticsPanelProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-statistics-panel",
      name: "QuizStatisticsPanel",
      category: "quiz",
      subtype: "builder-inspector",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
