import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerErrorProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerError: React.FC<PlayerErrorProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-error",
      name: "PlayerError",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
