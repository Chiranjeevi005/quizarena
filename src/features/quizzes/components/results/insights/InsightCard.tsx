import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface InsightCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "insight-card",
      name: "InsightCard",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
