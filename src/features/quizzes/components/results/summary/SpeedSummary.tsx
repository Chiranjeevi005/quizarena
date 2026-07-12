import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SpeedSummaryProps {
  children?: React.ReactNode;
  className?: string;
}

export const SpeedSummary: React.FC<SpeedSummaryProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "speed-summary",
      name: "SpeedSummary",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
