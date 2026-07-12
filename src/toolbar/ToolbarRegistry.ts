import { ToolbarManifest } from "./ToolbarManifest";
import { ToolbarCapabilities } from "./ToolbarCapabilities";

class ToolbarRegistryImpl {
  private manifests = new Map<string, ToolbarManifest>();

  public register(manifest: ToolbarManifest): void {
    if (this.manifests.has(manifest.id)) {
      console.warn(
        `ToolbarManifest with id '${manifest.id}' is already registered and will be overwritten.`
      );
    }
    this.manifests.set(manifest.id, manifest);
  }

  public unregister(id: string): void {
    this.manifests.delete(id);
  }

  public find(id: string): ToolbarManifest | undefined {
    return this.manifests.get(id);
  }

  public list(): ToolbarManifest[] {
    return Array.from(this.manifests.values());
  }

  public validate(manifest: ToolbarManifest): boolean {
    if (!manifest.id || !manifest.version) {
      return false;
    }
    return true;
  }

  public resolve(id: string): ToolbarManifest | null {
    return this.find(id) || null;
  }

  public resolveCapabilities(id: string): ToolbarCapabilities | null {
    const manifest = this.find(id);
    if (!manifest) return null;

    return {
      groups: manifest.supportsGroups,
      actions: true, // inherent to toolbars
      overflow: manifest.supportsOverflow,
      commandBar: manifest.supportsCommandBar,
      actionBar: manifest.supportsActionBar,
      responsive: manifest.responsive,
      accessibility: manifest.supportsAccessibility,
      compactMode: true, // Defaulting compact support
    };
  }
}

export const ToolbarRegistry = new ToolbarRegistryImpl();
