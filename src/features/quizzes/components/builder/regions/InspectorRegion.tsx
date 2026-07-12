import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface InspectorRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const InspectorRegion: React.FC<InspectorRegionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "inspector-region",
      name: "InspectorRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
