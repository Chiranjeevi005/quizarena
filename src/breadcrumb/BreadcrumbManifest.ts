export interface BreadcrumbManifest {
  id: string;
  version: string;
  registryVersion: string;
  status: "stable" | "beta" | "deprecated";
  featureFlag?: string;
  supportsIcons: boolean;
  supportsOverflow: boolean;
  supportsCompact: boolean;
  supportsResponsive: boolean;
  supportsAccessibility: boolean;
  supportsTruncation: boolean;
}
