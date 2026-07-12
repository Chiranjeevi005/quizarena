import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface AchievementPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const AchievementPlaceholder: React.FC<AchievementPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "achievement-placeholder",
      name: "AchievementPlaceholder",
      category: "quiz",
      subtype: "analytics-insight",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
