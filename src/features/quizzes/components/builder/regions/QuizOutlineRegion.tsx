import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizOutlineRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizOutlineRegion: React.FC<QuizOutlineRegionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-outline-region",
      name: "QuizOutlineRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
