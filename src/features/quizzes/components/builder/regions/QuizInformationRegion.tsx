import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizInformationRegionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizInformationRegion: React.FC<QuizInformationRegionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-information-region",
      name: "QuizInformationRegion",
      category: "quiz",
      subtype: "builder-region",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
