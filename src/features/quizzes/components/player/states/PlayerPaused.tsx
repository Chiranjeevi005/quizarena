import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerPausedProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerPaused: React.FC<PlayerPausedProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-paused",
      name: "PlayerPaused",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
