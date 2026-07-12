import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface AccuracySummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const AccuracySummary: React.FC<AccuracySummaryProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "accuracy-summary",
      name: "AccuracySummary",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
