import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface TopicBreakdownProps {
  children?: React.ReactNode;
  className?: string;
}

export const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "topic-breakdown",
      name: "TopicBreakdown",
      category: "quiz",
      subtype: "analytics-breakdown",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
