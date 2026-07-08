import { PrismaClient, RefundStatus, PaymentOrderStatus } from '../../../generated/prisma';

const prisma = new PrismaClient();
import { RazorpayRefundService } from '../adapters/razorpay/RazorpayRefundService';

export class RefundEngine {
  private refundService = new RazorpayRefundService();

  public async initiateRefund(revenueTransactionId: string, amount: number, reason: string, adminId: string): Promise<any> {
    const transaction = await prisma.revenueTransaction.findUnique({
      where: { id: revenueTransactionId },
      include: { paymentOrder: { include: { attempts: true } } }
    });

    if (!transaction) throw new Error('Transaction not found');

    const successfulAttempt = transaction.paymentOrder.attempts.find(a => a.status === PaymentOrderStatus.CAPTURED);
    if (!successfulAttempt || !successfulAttempt.razorpayPaymentId) {
      throw new Error('No successful payment attempt found to refund');
    }

    // Create a pending RefundRecord
    const refundRecord = await prisma.refundRecord.create({
      data: {
        revenueTransactionId,
        amount,
        currency: transaction.currency,
        reason,
        status: RefundStatus.PENDING,
        approvedById: adminId
      }
    });

    try {
      // Call Razorpay API
      const razorpayRefund = await this.refundService.createRefund({
        paymentId: successfulAttempt.razorpayPaymentId,
        amount: amount * 100, // convert to minor units
        receipt: `RFD-${refundRecord.id}`
      });

      // Update RefundRecord with gateway response
      await prisma.refundRecord.update({
        where: { id: refundRecord.id },
        data: {
          razorpayRefundId: razorpayRefund.id,
          status: RefundStatus.PROCESSED
        }
      });

      // Audit Log
      await prisma.revenueAuditLog.create({
        data: {
          action: 'REFUND_PROCESSED',
          actorId: adminId,
          targetId: refundRecord.id,
          metadata: { amount, reason, razorpayRefundId: razorpayRefund.id }
        }
      });

      return refundRecord;
    } catch (error) {
      await prisma.refundRecord.update({
        where: { id: refundRecord.id },
        data: { status: RefundStatus.FAILED }
      });
      throw error;
    }
  }
}
