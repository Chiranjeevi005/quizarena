import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionStatisticsProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionStatistics: React.FC<SessionStatisticsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-statistics",
      name: "SessionStatistics",
      category: "quiz",
      subtype: "session-metadata",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
