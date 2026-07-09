export interface QuickActionManifest {
  id: string;
  title: string;
  icon: any;
  href: string;
  permission?: string;
  capability?: string;
}

class QuickActionRegistryClass {
  private actions: QuickActionManifest[] = [];

  register(manifest: QuickActionManifest) {
    this.actions.push(manifest);
  }

  getActions(permissions: string[], capabilities: string[]): QuickActionManifest[] {
    return this.actions.filter((a) => {
      if (a.permission && !permissions.includes(a.permission)) return false;
      if (a.capability && !capabilities.includes(a.capability)) return false;
      return true;
    });
  }

  getAll(): QuickActionManifest[] {
    return this.actions;
  }
}

export const QuickActionRegistry = new QuickActionRegistryClass();
