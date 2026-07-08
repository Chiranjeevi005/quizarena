import { PaymentOrder, PaymentOrderStatus } from '../../../../generated/prisma';

export interface Discrepancy {
  paymentOrderId: string;
  razorpayPaymentId?: string;
  databaseStatus: PaymentOrderStatus;
  razorpayStatus: string;
  issueType: 'MISSING_WEBHOOK' | 'STATUS_MISMATCH' | 'AMOUNT_MISMATCH';
}

export class PaymentReconciliationPlanner {
  constructor(
    private readonly db: any,
    private readonly razorpayAdapter: any
  ) {}

  /**
   * Plans the reconciliation by finding mismatches between local DB and remote Gateway.
   */
  public async plan(startDate: Date, endDate: Date): Promise<Discrepancy[]> {
    const discrepancies: Discrepancy[] = [];
    
    // Fetch all pending/authorized orders that are older than say 30 minutes
    const suspiciousOrders = await this.db.paymentOrder.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: { in: [PaymentOrderStatus.PENDING, PaymentOrderStatus.AUTHORIZED, PaymentOrderStatus.CREATED] }
      },
      include: { attempts: true }
    });

    for (const order of suspiciousOrders) {
      if (!order.razorpayOrderId) continue;

      // Fetch from Razorpay
      const remoteOrder = await this.razorpayAdapter.getOrder(order.razorpayOrderId);
      if (!remoteOrder) continue;

      const remoteStatus = remoteOrder.status; // e.g. "paid", "created", "attempted"
      
      if (remoteStatus === 'paid' && order.status !== PaymentOrderStatus.CAPTURED) {
        discrepancies.push({
          paymentOrderId: order.id,
          databaseStatus: order.status,
          razorpayStatus: remoteStatus,
          issueType: 'MISSING_WEBHOOK'
        });
      }
    }

    return discrepancies;
  }
}
