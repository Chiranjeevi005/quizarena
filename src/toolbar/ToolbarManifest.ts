export interface ToolbarManifest {
  id: string;
  version: string;
  registryVersion: string;
  status: "stable" | "beta" | "deprecated";
  featureFlag?: string;
  responsive: boolean;
  supportsGroups: boolean;
  supportsOverflow: boolean;
  supportsActionBar: boolean;
  supportsCommandBar: boolean;
  supportsAccessibility: boolean;
}
