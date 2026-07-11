import { BreadcrumbManifest } from "./BreadcrumbManifest";
import { BreadcrumbCapabilities } from "./BreadcrumbCapabilities";

class BreadcrumbRegistryImpl {
  private breadcrumbs = new Map<string, BreadcrumbManifest>();

  public register(manifest: BreadcrumbManifest): void {
    if (this.breadcrumbs.has(manifest.id)) {
      console.warn(
        `BreadcrumbManifest with id '${manifest.id}' is already registered and will be overwritten.`
      );
    }
    this.breadcrumbs.set(manifest.id, manifest);
  }

  public unregister(id: string): void {
    this.breadcrumbs.delete(id);
  }

  public find(id: string): BreadcrumbManifest | undefined {
    return this.breadcrumbs.get(id);
  }

  public list(): BreadcrumbManifest[] {
    return Array.from(this.breadcrumbs.values());
  }

  public validate(manifest: BreadcrumbManifest): boolean {
    if (!manifest.id || !manifest.version) {
      return false;
    }
    return true;
  }

  public resolve(id: string): BreadcrumbManifest | null {
    return this.find(id) || null;
  }

  public resolveCapabilities(id: string): BreadcrumbCapabilities | null {
    const manifest = this.find(id);
    if (!manifest) return null;

    return {
      icons: manifest.supportsIcons,
      overflow: manifest.supportsOverflow,
      compactMode: manifest.supportsCompact,
      responsive: manifest.supportsResponsive,
      accessibility: manifest.supportsAccessibility,
      truncation: manifest.supportsTruncation,
    };
  }
}

export const BreadcrumbRegistry = new BreadcrumbRegistryImpl();
