import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SuggestedActionsProps {
  children?: React.ReactNode;
  className?: string;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "suggested-actions",
      name: "SuggestedActions",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
