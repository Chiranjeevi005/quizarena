import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PassFailBadgeProps {
  children?: React.ReactNode;
  className?: string;
}

export const PassFailBadge: React.FC<PassFailBadgeProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "pass-fail-badge",
      name: "PassFailBadge",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
