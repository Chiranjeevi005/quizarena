import React, { ReactNode } from "react";

export type CommandBarState = "idle" | "focused" | "loading" | "disabled" | "error";

export interface CommandBarProps {
  state?: CommandBarState;
  inputSlot?: ReactNode;
  leadingIconSlot?: ReactNode;
  trailingActionsSlot?: ReactNode;
  resultsSlot?: ReactNode;
  suggestionsSlot?: ReactNode;
  emptySlot?: ReactNode;
  className?: string;
}
