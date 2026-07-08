export interface CommunicationProvider {
  name: string;
  type: 'EMAIL' | 'SMS' | 'PUSH' | 'WEBHOOK';
  deliver(payload: any): Promise<boolean>;
}

export class ProviderRegistry {
  private providers: Map<string, CommunicationProvider> = new Map();

  public register(provider: CommunicationProvider): void {
    this.providers.set(provider.name, provider);
  }

  public getProvider(name: string): CommunicationProvider | undefined {
    return this.providers.get(name);
  }
}
