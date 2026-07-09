export type LayoutTopology = "Workspace" | "Dashboard" | "Public" | "Auth" | "Error";

export interface LayoutMetadata {
  id: string;
  name: string;
  topology: LayoutTopology;
  description?: string;
}
