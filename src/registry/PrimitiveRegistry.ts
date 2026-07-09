import { ComponentStatus, ComponentCategory } from "@/types";

export interface PrimitiveManifest {
  id: string;
  name: string;
  version: string;
  registryVersion: string;
  status: ComponentStatus;
  category: ComponentCategory;
  description: string;
  dependencies: string[];
  tokens: string[];
  accessibility: string[];
  responsive: boolean;
  motion: string[];
  component: React.ComponentType<any>;
}

class PrimitiveRegistryImpl {
  private primitives: Map<string, PrimitiveManifest> = new Map();

  register(manifest: PrimitiveManifest): void {
    if (this.primitives.has(manifest.id)) {
      console.warn(
        `[PrimitiveRegistry] Primitive ${manifest.id} is already registered. Overwriting.`
      );
    }
    this.primitives.set(manifest.id, manifest);
  }

  get(id: string): PrimitiveManifest | undefined {
    return this.primitives.get(id);
  }

  getAll(): PrimitiveManifest[] {
    return Array.from(this.primitives.values());
  }
}

export const PrimitiveRegistry = new PrimitiveRegistryImpl();
