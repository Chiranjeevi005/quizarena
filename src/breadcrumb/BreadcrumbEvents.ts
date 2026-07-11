// Definitions only. No event dispatcher. No listeners.
export type BreadcrumbEventType =
  | "BreadcrumbMounted"
  | "BreadcrumbUpdated"
  | "BreadcrumbExpanded"
  | "BreadcrumbCollapsed"
  | "BreadcrumbItemSelected";

export interface BreadcrumbEventPayloads {
  BreadcrumbMounted: { id: string; timestamp: number };
  BreadcrumbUpdated: { id: string; timestamp: number };
  BreadcrumbExpanded: { timestamp: number };
  BreadcrumbCollapsed: { timestamp: number };
  BreadcrumbItemSelected: { itemId: string; timestamp: number };
}
