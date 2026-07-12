import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface OutlineReorderPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const OutlineReorderPlaceholder: React.FC<OutlineReorderPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "outline-reorder-placeholder",
      name: "OutlineReorderPlaceholder",
      category: "quiz",
      subtype: "builder-outline",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
