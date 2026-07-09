export class DigestEngine {
  constructor(private readonly communicationKernel: any) {}

  public async generateDailyDigest(userId: string): Promise<void> {
    // Rollup unread notifications
    await this.communicationKernel.orchestrateDelivery({
      type: "EMAIL",
      templateId: "DAILY_DIGEST",
      recipient: userId,
    });
  }
}
