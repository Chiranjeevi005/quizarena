export class FeatureResolver {
  static resolve(relativePath: string): string {
    const parts = relativePath.split(/[/\\]/);

    // Simplistic feature resolution based on path. E.g. src/app/dashboard -> dashboard
    // or src/features/auth -> auth
    const featureIndex = parts.indexOf("features");
    if (featureIndex !== -1 && featureIndex + 1 < parts.length) {
      return parts[featureIndex + 1];
    }

    const appIndex = parts.indexOf("app");
    if (appIndex !== -1 && appIndex + 1 < parts.length) {
      const nextPart = parts[appIndex + 1];
      if (nextPart !== "api" && !nextPart.startsWith("(") && !nextPart.includes(".")) {
        return nextPart;
      }
    }

    return "Core";
  }
}

export class ResponsibilityResolver {
  static resolve(layer: string, feature: string): string {
    if (layer === "Page") return `Renders the ${feature} page`;
    if (layer === "Component") return `UI Component for ${feature}`;
    if (layer === "Service") return `Business logic for ${feature}`;
    if (layer === "Store") return `State management for ${feature}`;
    if (layer === "Action") return `Server action for ${feature}`;
    return `Provides ${layer} capabilities for ${feature}`;
  }
}
