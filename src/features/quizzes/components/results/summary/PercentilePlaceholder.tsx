import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PercentilePlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const PercentilePlaceholder: React.FC<PercentilePlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "percentile-placeholder",
      name: "PercentilePlaceholder",
      category: "quiz",
      subtype: "analytics-summary",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
