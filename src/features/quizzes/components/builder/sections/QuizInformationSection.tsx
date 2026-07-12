import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface QuizInformationSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const QuizInformationSection: React.FC<QuizInformationSectionProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "quiz-information-section",
      name: "QuizInformationSection",
      category: "quiz",
      subtype: "builder-section",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
