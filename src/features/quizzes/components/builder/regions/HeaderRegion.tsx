import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface HeaderRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const HeaderRegion: React.FC<HeaderRegionProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "header-region",
      name: "HeaderRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
