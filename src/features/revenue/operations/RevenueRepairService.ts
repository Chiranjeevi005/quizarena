import { PrismaClient } from '../../../generated/prisma';
import { WebhookProcessor } from '../pipelines/WebhookProcessor';

const prisma = new PrismaClient();

export class RevenueRepairService {
  private webhookProcessor = new WebhookProcessor();

  /**
   * Replays a webhook from the Dead Letter Queue.
   */
  public async replayWebhook(dlqId: string, adminId: string): Promise<boolean> {
    const dlqEntry = await prisma.webhookDeadLetterQueue.findUnique({ where: { id: dlqId } });
    if (!dlqEntry) throw new Error('DLQ Entry not found');

    try {
      await prisma.webhookDeadLetterQueue.update({
        where: { id: dlqId },
        data: { status: 'RETRYING', retryCount: { increment: 1 } }
      });

      // Pass the payload back through the processor
      await this.webhookProcessor.processWebhook(
        dlqEntry.eventId,
        dlqEntry.eventType,
        dlqEntry.payload
      );

      // If successful, mark RECOVERED
      await prisma.webhookDeadLetterQueue.update({
        where: { id: dlqId },
        data: { status: 'RECOVERED', updatedAt: new Date() }
      });

      await prisma.revenueAuditLog.create({
        data: {
          action: 'DLQ_WEBHOOK_REPLAY_SUCCESS',
          actorId: adminId,
          targetId: dlqId,
          reason: 'Manual repair from Admin Console'
        }
      });

      return true;
    } catch (error: any) {
      // If it fails again, mark FAILED
      await prisma.webhookDeadLetterQueue.update({
        where: { id: dlqId },
        data: { status: 'FAILED', failureReason: error.message }
      });
      return false;
    }
  }

  /**
   * Archives a hopelessly failing webhook event.
   */
  public async archiveWebhook(dlqId: string, adminId: string): Promise<void> {
    await prisma.webhookDeadLetterQueue.update({
      where: { id: dlqId },
      data: { status: 'ARCHIVED' }
    });

    await prisma.revenueAuditLog.create({
      data: {
        action: 'DLQ_WEBHOOK_ARCHIVED',
        actorId: adminId,
        targetId: dlqId
      }
    });
  }
}
