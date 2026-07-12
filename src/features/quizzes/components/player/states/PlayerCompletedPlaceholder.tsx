import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerCompletedPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerCompletedPlaceholder: React.FC<PlayerCompletedPlaceholderProps> = ({
  children,
  className,
}) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-completed-placeholder",
      name: "PlayerCompletedPlaceholder",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
