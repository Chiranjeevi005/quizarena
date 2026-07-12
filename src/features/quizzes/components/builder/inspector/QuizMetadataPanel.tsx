import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizMetadataPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizMetadataPanel: React.FC<QuizMetadataPanelProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-metadata-panel",
      name: "QuizMetadataPanel",
      category: "quiz",
      subtype: "builder-inspector",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
