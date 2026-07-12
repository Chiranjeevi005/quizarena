import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerReviewPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerReviewPlaceholder: React.FC<PlayerReviewPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-review-placeholder",
      name: "PlayerReviewPlaceholder",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
