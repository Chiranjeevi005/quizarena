import { Registry } from "@/types";

export interface ProviderMetadata {
  id: string;
  name: string;
  description: string;
}

class ProviderRegistryImpl implements Registry<ProviderMetadata> {
  private providers: Map<string, ProviderMetadata> = new Map();

  register(provider: ProviderMetadata): void {
    if (this.providers.has(provider.id)) {
      console.warn(
        `[ProviderRegistry] Provider ${provider.id} is already registered. Overwriting.`
      );
    }
    this.providers.set(provider.id, provider);
  }

  get(id: string): ProviderMetadata | undefined {
    return this.providers.get(id);
  }

  getAll(): ProviderMetadata[] {
    return Array.from(this.providers.values());
  }
}

export const ProviderRegistry = new ProviderRegistryImpl();
