import { PrismaClient, AlertSeverity } from "@/generated/prisma";

const prisma = new PrismaClient();

export class AlertEngine {
  /**
   * Raises an alert with a 60-second deduplication window.
   * Increments occurrence count if already exists and unacknowledged.
   * Implements exponential back-off conceptually by suppressing spam.
   */
  public async raiseAlert(
    type: string,
    message: string,
    severity: AlertSeverity,
    competitionId?: string
  ): Promise<void> {
    // Config: 60s deduplication window
    const deduplicationWindow = new Date();
    deduplicationWindow.setSeconds(deduplicationWindow.getSeconds() - 60);

    const existingAlert = await prisma.platformAlert.findFirst({
      where: {
        type,
        competitionId,
        isResolved: false,
        lastSeenAt: { gt: deduplicationWindow },
      },
    });

    if (existingAlert) {
      if (existingAlert.isSuppressed) return;

      await prisma.platformAlert.update({
        where: { id: existingAlert.id },
        data: {
          occurrenceCount: { increment: 1 },
          lastSeenAt: new Date(),
          message, // Update with latest message string if needed
        },
      });
      return;
    }

    // New alert or outside deduction window
    await prisma.platformAlert.create({
      data: {
        type,
        message,
        severity,
        competitionId,
        occurrenceCount: 1,
        firstSeenAt: new Date(),
        lastSeenAt: new Date(),
      },
    });
  }

  /**
   * Dismisses an alert, preventing it from showing on the active dashboard.
   */
  public async dismissAlert(alertId: string, userId: string): Promise<void> {
    await prisma.platformAlert.update({
      where: { id: alertId },
      data: {
        isAcknowledged: true,
        acknowledgedById: userId,
        isSuppressed: true, // Stop firing
      },
    });
  }

  /**
   * Resolves an alert automatically once health restores.
   */
  public async resolveAlert(alertId: string): Promise<void> {
    await prisma.platformAlert.update({
      where: { id: alertId },
      data: {
        isResolved: true,
      },
    });
  }
}
