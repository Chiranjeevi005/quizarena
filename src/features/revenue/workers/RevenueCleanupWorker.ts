import { CouponState } from '../../../generated/prisma';

export class RevenueCleanupWorker {
  constructor(private readonly db: any) {}

  public async runCleanup(): Promise<void> {
    await this.cleanupExpiredCoupons();
    await this.cleanupOldWebhooks();
    await this.cleanupArchivedReports();
  }

  private async cleanupExpiredCoupons(): Promise<void> {
    const now = new Date();
    await this.db.coupon.updateMany({
      where: {
        expiresAt: { lt: now },
        state: CouponState.ACTIVE
      },
      data: {
        state: CouponState.EXPIRED
      }
    });
  }

  private async cleanupOldWebhooks(): Promise<void> {
    // Delete successfully processed webhooks older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await this.db.webhookEvent.deleteMany({
      where: {
        processed: true,
        createdAt: { lt: thirtyDaysAgo }
      }
    });
  }

  private async cleanupArchivedReports(): Promise<void> {
    // Delete reports older than 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    await this.db.paymentReconciliationReport.deleteMany({
      where: {
        dateRun: { lt: ninetyDaysAgo }
      }
    });
  }
}
