export class BenchmarkEngine {
  constructor(private readonly kpiRegistry: any) {}

  public async getBenchmarkDelta(
    metricId: string,
    entityValue: number
  ): Promise<{ platformAverage: number; delta: number; isAboveAverage: boolean }> {
    // Fetches the platform average from KPIRegistry
    const platformAverage = await this.kpiRegistry.getPlatformAverage(metricId);

    return {
      platformAverage,
      delta: entityValue - platformAverage,
      isAboveAverage: entityValue > platformAverage,
    };
  }
}
