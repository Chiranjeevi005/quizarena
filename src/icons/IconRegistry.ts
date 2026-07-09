import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

export type IconName = keyof typeof LucideIcons;

export interface IconDefinition {
  name: IconName;
  component: React.ComponentType<LucideProps>;
}

class IconRegistryImpl {
  private customIcons: Map<string, React.ComponentType<LucideProps>> = new Map();

  register(name: string, component: React.ComponentType<LucideProps>) {
    this.customIcons.set(name, component);
  }

  get(name: string): React.ComponentType<LucideProps> | undefined {
    return this.customIcons.get(name) || (LucideIcons as any)[name];
  }
}

export const IconRegistry = new IconRegistryImpl();
