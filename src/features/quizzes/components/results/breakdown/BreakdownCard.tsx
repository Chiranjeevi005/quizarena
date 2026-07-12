import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface BreakdownCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const BreakdownCard: React.FC<BreakdownCardProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "breakdown-card",
      name: "BreakdownCard",
      category: "quiz",
      subtype: "analytics-breakdown",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
