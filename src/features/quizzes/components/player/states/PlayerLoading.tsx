import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerLoading: React.FC<PlayerLoadingProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-loading",
      name: "PlayerLoading",
      category: "quiz",
      subtype: "player-state",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
