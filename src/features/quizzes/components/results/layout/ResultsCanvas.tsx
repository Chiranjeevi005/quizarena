import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface ResultsCanvasProps {
  children?: React.ReactNode;
  className?: string;
}

export const ResultsCanvas: React.FC<ResultsCanvasProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "results-canvas",
      name: "ResultsCanvas",
      category: "quiz",
      subtype: "analytics-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
