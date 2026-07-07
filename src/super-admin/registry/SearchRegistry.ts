export interface SearchResult {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  url: string;
}

class SearchRegistryClass {
  private providers: Array<(query: string) => Promise<SearchResult[]>> = [];

  registerProvider(provider: (query: string) => Promise<SearchResult[]>) {
    this.providers.push(provider);
  }

  async search(query: string): Promise<SearchResult[]> {
    if (!query) return [];
    const results = await Promise.all(this.providers.map((p) => p(query)));
    return results.flat();
  }
}

export const SearchRegistry = new SearchRegistryClass();
