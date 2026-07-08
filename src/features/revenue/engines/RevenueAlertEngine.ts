import { AlertSeverity } from '../../../generated/prisma';

export interface AlertData {
  type: string;
  message: string;
  severity: AlertSeverity;
  metadata?: any;
}

export class RevenueAlertEngine {
  constructor(private readonly db: any) {}

  public async evaluateHealthAndAlert(): Promise<void> {
    await this.checkPaymentSuccessRate();
    await this.checkWebhookDelays();
    await this.checkSettlementDelays();
    await this.checkGatewayOffline();
  }

  private async raiseAlert(alert: AlertData): Promise<void> {
    await this.db.platformAlert.create({
      data: {
        type: alert.type,
        message: alert.message,
        severity: alert.severity,
        metadata: alert.metadata || {}
      }
    });
    // In a real system, you might also trigger PagerDuty, Slack, etc.
  }

  private async checkPaymentSuccessRate(): Promise<void> {
    // Check if success rate drops below 80%
    const threshold = 0.8;
    // mock query
    const currentRate = 0.95; 
    
    if (currentRate < threshold) {
      await this.raiseAlert({
        type: 'PAYMENT_SUCCESS_DROP',
        message: `Payment success rate dropped to ${currentRate * 100}%`,
        severity: AlertSeverity.CRITICAL
      });
    }
  }

  private async checkWebhookDelays(): Promise<void> {
    // Check for spikes in Webhook processing time or DLQ size
    const dlqCount = await this.db.webhookDeadLetterQueue.count({
      where: { status: 'FAILED' }
    });
    
    if (dlqCount > 100) {
      await this.raiseAlert({
        type: 'WEBHOOK_DLQ_SPIKE',
        message: `Webhook DLQ has exceeded 100 failed events (${dlqCount})`,
        severity: AlertSeverity.CRITICAL
      });
    }
  }

  private async checkSettlementDelays(): Promise<void> {
    // Mock logic
  }

  private async checkGatewayOffline(): Promise<void> {
    // Mock logic
  }
}
