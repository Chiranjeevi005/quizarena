import React, { useEffect } from "react";
import { ComponentRegistry } from "@/registry";

export interface PlayerWorkspaceProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlayerWorkspace: React.FC<PlayerWorkspaceProps> = ({ children, className }) => {
  useEffect(() => {
    ComponentRegistry.register({
      id: "player-workspace",
      name: "PlayerWorkspace",
      category: "quiz",
      subtype: "player-layout",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }, []);

  return <div className={className || ""}>{children}</div>;
};
