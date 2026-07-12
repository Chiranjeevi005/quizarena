import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionReviewProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionReview: React.FC<SessionReviewProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "session-review",
      name: "SessionReview",
      category: "quiz",
      subtype: "session-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
