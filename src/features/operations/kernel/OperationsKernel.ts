export class OperationsKernel {
  constructor(
    private readonly healthEngine: any,
    private readonly incidentEngine: any,
    private readonly alertEngine: any,
    private readonly automationEngine: any,
    private readonly recoveryEngine: any
  ) {}

  public async getPlatformHealth(): Promise<any> {
    return this.healthEngine.getAggregateHealth();
  }

  public async handleAlert(alertPayload: any): Promise<void> {
    // Coordinates an alert to possibly trigger an incident or automation
    await this.incidentEngine.createFromAlert(alertPayload);
  }
}
