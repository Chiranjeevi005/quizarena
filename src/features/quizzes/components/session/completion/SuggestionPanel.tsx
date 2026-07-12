import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface SessionSuggestionPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const SessionSuggestionPanel: React.FC<SessionSuggestionPanelProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "suggestion-panel",
      name: "SessionSuggestionPanel",
      category: "quiz",
      subtype: "session-completion",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
