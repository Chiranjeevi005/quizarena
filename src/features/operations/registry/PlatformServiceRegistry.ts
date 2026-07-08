export interface PlatformService {
  name: string;
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  version: string;
  capabilities: string[];
  owner: string;
  dependencies: string[];
  criticality: 'P0' | 'P1' | 'P2';
}

export class PlatformServiceRegistry {
  private services: Map<string, PlatformService> = new Map();

  public register(service: PlatformService): void {
    this.services.set(service.name, service);
  }

  public async getAllServices(): Promise<PlatformService[]> {
    return Array.from(this.services.values());
  }
}
