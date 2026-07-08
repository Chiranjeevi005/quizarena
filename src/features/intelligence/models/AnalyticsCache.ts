export class AnalyticsCache {
  constructor(private readonly redisClient: any) {}

  public async getCachedMetrics(key: string): Promise<any | null> {
    // Return fast-read layer data for dashboards
    return null;
  }

  public async setCachedMetrics(key: string, data: any, ttlSeconds: number): Promise<void> {
    // Dashboards only query the cache
  }

  public async invalidateCache(domain: string): Promise<void> {
    // Invalidate prefix
  }
}
