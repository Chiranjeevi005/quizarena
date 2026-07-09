export class PlatformHealthEngine {
  constructor(private readonly serviceRegistry: any) {}

  public async getAggregateHealth(): Promise<{
    status: string;
    components: Record<string, string>;
  }> {
    const services = await this.serviceRegistry.getAllServices();
    const components: Record<string, string> = {};

    let allHealthy = true;
    for (const service of services) {
      components[service.name] = service.status;
      if (service.status !== "HEALTHY") allHealthy = false;
    }

    return {
      status: allHealthy ? "HEALTHY" : "DEGRADED",
      components,
    };
  }
}
