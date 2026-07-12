import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface TimeBreakdownProps {
  children?: React.ReactNode;
  className?: string;
}

export const TimeBreakdown: React.FC<TimeBreakdownProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "time-breakdown",
      name: "TimeBreakdown",
      category: "quiz",
      subtype: "analytics-breakdown",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
