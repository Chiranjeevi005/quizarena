import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizCanvasRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizCanvasRegion: React.FC<QuizCanvasRegionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-canvas-region",
      name: "QuizCanvasRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
