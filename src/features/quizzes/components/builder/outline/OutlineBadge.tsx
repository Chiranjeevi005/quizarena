import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface OutlineBadgeProps {
  children?: React.ReactNode;
  className?: string;
}

export const OutlineBadge: React.FC<OutlineBadgeProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "outline-badge",
      name: "OutlineBadge",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
