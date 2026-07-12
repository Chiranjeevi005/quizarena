import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerReadyProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerReady: React.FC<PlayerReadyProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-ready",
      name: "PlayerReady",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
