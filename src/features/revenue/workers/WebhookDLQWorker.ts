export class WebhookDLQWorker {
  constructor(
    private readonly db: any,
    private readonly webhookProcessor: any
  ) {}

  public async processDLQ(): Promise<void> {
    const now = new Date();

    // Fetch items that are ready for retry
    const dlqItems = await this.db.webhookDeadLetterQueue.findMany({
      where: {
        status: "RETRYING",
        nextRetryAt: { lte: now },
      },
    });

    for (const item of dlqItems) {
      try {
        await this.webhookProcessor.process(item.payload);

        // If successful, mark as recovered
        await this.db.webhookDeadLetterQueue.update({
          where: { id: item.id },
          data: { status: "RECOVERED" },
        });
      } catch (error: any) {
        // If failed again, apply exponential backoff
        const newRetryCount = item.retryCount + 1;

        if (newRetryCount >= 5) {
          // Permanent failure
          await this.db.webhookDeadLetterQueue.update({
            where: { id: item.id },
            data: {
              status: "FAILED",
              failureReason: error.message || "Max retries exceeded",
            },
          });
        } else {
          // Schedule next retry (exponential: 2^retryCount * 5 minutes)
          const delayMinutes = Math.pow(2, newRetryCount) * 5;
          const nextRetryAt = new Date(now.getTime() + delayMinutes * 60000);

          await this.db.webhookDeadLetterQueue.update({
            where: { id: item.id },
            data: {
              retryCount: newRetryCount,
              nextRetryAt,
              failureReason: error.message,
            },
          });
        }
      }
    }
  }
}
