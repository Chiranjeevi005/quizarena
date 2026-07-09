export class AnalyticsCollector {
  constructor(private readonly rawAnalyticsStore: any) {}

  public async collectEvent(eventType: string, payload: any): Promise<void> {
    // Collects raw events from the Platform Event Bus in real-time
    // Writes directly to RawAnalyticsStore (bypassing operational tables)
    await this.rawAnalyticsStore.create({
      data: {
        eventType,
        payload,
        collectedAt: new Date(),
      },
    });
  }

  public registerSubscriptions(eventBus: any): void {
    eventBus.subscribe("COMPETITION_PUBLISHED", (data: any) =>
      this.collectEvent("COMPETITION_PUBLISHED", data)
    );
    eventBus.subscribe("CANDIDATE_REGISTERED", (data: any) =>
      this.collectEvent("CANDIDATE_REGISTERED", data)
    );
    eventBus.subscribe("PAYMENT_CAPTURED", (data: any) =>
      this.collectEvent("PAYMENT_CAPTURED", data)
    );
    eventBus.subscribe("SESSION_COMPLETED", (data: any) =>
      this.collectEvent("SESSION_COMPLETED", data)
    );
  }
}
