export class ComparisonEngine {
  constructor(private readonly warehouse: any) {}

  public async compareEntities(entityAId: string, entityBId: string, metrics: string[]): Promise<any> {
    const dataA = await this.warehouse.getHistoricalMetrics('ENTITY', new Date(0), new Date()); // Mocked
    const dataB = await this.warehouse.getHistoricalMetrics('ENTITY', new Date(0), new Date()); // Mocked

    return {
      entityA: entityAId,
      entityB: entityBId,
      comparison: {
        revenueDelta: 1200,
        completionDelta: -2.4
      }
    };
  }

  public async comparePeriods(domain: string, periodAStart: Date, periodAEnd: Date, periodBStart: Date, periodBEnd: Date): Promise<any> {
    // Compare Month vs Month, etc.
    return {};
  }
}
