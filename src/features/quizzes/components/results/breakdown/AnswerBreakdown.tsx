import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface AnswerBreakdownProps {
  children?: React.ReactNode;
  className?: string;
}

export const AnswerBreakdown: React.FC<AnswerBreakdownProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "answer-breakdown",
      name: "AnswerBreakdown",
      category: "quiz",
      subtype: "analytics-breakdown",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
