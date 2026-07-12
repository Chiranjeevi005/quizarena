// Definitions only. No event dispatcher. No listeners.
export type ToolbarEventType =
  | "ToolbarMounted"
  | "ToolbarUpdated"
  | "ToolbarCollapsed"
  | "ToolbarExpanded"
  | "ToolbarActionFocused"
  | "ToolbarOverflowOpened"
  | "CommandBarFocused";

export interface ToolbarEventPayloads {
  ToolbarMounted: { id: string; timestamp: number };
  ToolbarUpdated: { id: string; timestamp: number };
  ToolbarCollapsed: { id: string; timestamp: number };
  ToolbarExpanded: { id: string; timestamp: number };
  ToolbarActionFocused: { actionId: string; timestamp: number };
  ToolbarOverflowOpened: { id: string; timestamp: number };
  CommandBarFocused: { id: string; timestamp: number };
}
