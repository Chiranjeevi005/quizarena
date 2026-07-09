import { LayoutMetadata, Registry } from "@/types";

class LayoutRegistryImpl implements Registry<LayoutMetadata> {
  private layouts: Map<string, LayoutMetadata> = new Map();

  register(metadata: LayoutMetadata): void {
    if (this.layouts.has(metadata.id)) {
      console.warn(`[LayoutRegistry] Layout ${metadata.id} is already registered. Overwriting.`);
    }
    this.layouts.set(metadata.id, metadata);
  }

  get(id: string): LayoutMetadata | undefined {
    return this.layouts.get(id);
  }

  getAll(): LayoutMetadata[] {
    return Array.from(this.layouts.values());
  }

  getByTopology(topology: string): LayoutMetadata[] {
    return this.getAll().filter((l) => l.topology === topology);
  }
}

export const LayoutRegistry = new LayoutRegistryImpl();

LayoutRegistry.register({
  id: "workspace-shell",
  name: "WorkspaceShell",
  topology: "Workspace",
  description: "Standard workspace shell for authenticated users, admins, and SMEs.",
});
