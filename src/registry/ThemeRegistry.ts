import { Registry } from "@/types";

export interface ThemeMetadata {
  id: string;
  name: string;
  version: string;
}

class ThemeRegistryImpl implements Registry<ThemeMetadata> {
  private themes: Map<string, ThemeMetadata> = new Map();

  register(theme: ThemeMetadata): void {
    if (this.themes.has(theme.id)) {
      console.warn(`[ThemeRegistry] Theme ${theme.id} is already registered. Overwriting.`);
    }
    this.themes.set(theme.id, theme);
  }

  get(id: string): ThemeMetadata | undefined {
    return this.themes.get(id);
  }

  getAll(): ThemeMetadata[] {
    return Array.from(this.themes.values());
  }
}

export const ThemeRegistry = new ThemeRegistryImpl();
