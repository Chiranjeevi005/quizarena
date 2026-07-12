import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PreviousAttemptComparisonProps {
  children?: React.ReactNode;
  className?: string;
}

export const PreviousAttemptComparison: React.FC<PreviousAttemptComparisonProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "previous-attempt-comparison",
      name: "PreviousAttemptComparison",
      category: "quiz",
      subtype: "analytics-comparison",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
