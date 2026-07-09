import { ComponentMetadata, IComponentRegistry } from "@/types";

class ComponentRegistryImpl implements IComponentRegistry {
  private components: Map<string, ComponentMetadata> = new Map();

  register(component: ComponentMetadata): void {
    if (this.components.has(component.id)) {
      console.warn(
        `[ComponentRegistry] Component ${component.id} is already registered. Overwriting.`
      );
    }
    this.components.set(component.id, component);
  }

  get(id: string): ComponentMetadata | undefined {
    return this.components.get(id);
  }

  getAll(): ComponentMetadata[] {
    return Array.from(this.components.values());
  }

  getByCategory(category: string): ComponentMetadata[] {
    return this.getAll().filter((c) => c.category === category);
  }

  getDeprecated(): ComponentMetadata[] {
    return this.getAll().filter((c) => c.deprecated === true);
  }
}

export const ComponentRegistry = new ComponentRegistryImpl();
