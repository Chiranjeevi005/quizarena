import { PrismaClient, PaymentOrderStatus, RegistrationState } from "../../../generated/prisma";

const prisma = new PrismaClient();
import { RegistrationEngine } from "../engines/RegistrationEngine";
import { CouponEngine } from "../engines/CouponEngine";

export class WebhookProcessor {
  private registrationEngine = new RegistrationEngine();
  private couponEngine = new CouponEngine();

  public async processWebhook(eventId: string, eventType: string, payload: any) {
    // 1. Idempotency Check
    const existingEvent = await prisma.webhookEvent.findUnique({ where: { eventId } });
    if (existingEvent && existingEvent.processed) {
      console.log(`Webhook Event ${eventId} already processed.`);
      return;
    }

    const webhookEvent = await prisma.webhookEvent.upsert({
      where: { eventId },
      update: { retries: { increment: 1 } },
      create: { eventId, eventType, payload, status: "PROCESSING" },
    });

    try {
      // 2. Route by Event Type
      switch (eventType) {
        case "payment.captured":
          await this.handlePaymentCaptured(payload);
          break;
        case "payment.failed":
          await this.handlePaymentFailed(payload);
          break;
        case "refund.processed":
          await this.handleRefundProcessed(payload);
          break;
        default:
          console.log(`Unhandled webhook event type: ${eventType}`);
      }

      // 3. Mark Processed
      await prisma.webhookEvent.update({
        where: { id: webhookEvent.id },
        data: { processed: true, processedAt: new Date(), status: "SUCCESS" },
      });
    } catch (error: any) {
      console.error(`Error processing webhook ${eventId}:`, error);

      // Update WebhookEvent to FAILED
      await prisma.webhookEvent.update({
        where: { id: webhookEvent.id },
        data: { status: "FAILED", error: error.message },
      });

      // Push to Dead Letter Queue for Retry/Repair
      await prisma.webhookDeadLetterQueue.upsert({
        where: { eventId },
        update: {
          status: "FAILED",
          failureReason: error.message,
          retryCount: { increment: 1 },
        },
        create: {
          eventId,
          eventType,
          payload,
          failureReason: error.message,
          status: "FAILED",
        },
      });

      throw error;
    }
  }

  private async handlePaymentCaptured(payload: any) {
    const paymentEntity = payload.payment.entity;
    const razorpayOrderId = paymentEntity.order_id;
    const razorpayPaymentId = paymentEntity.id;
    const amount = paymentEntity.amount / 100;
    const currency = paymentEntity.currency;

    const paymentOrder = await prisma.paymentOrder.findUnique({
      where: { razorpayOrderId },
      include: { registration: true, coupon: true },
    });

    if (!paymentOrder)
      throw new Error(`PaymentOrder not found for Razorpay Order: ${razorpayOrderId}`);

    // Update Attempt
    await prisma.paymentAttempt.upsert({
      where: { razorpayPaymentId },
      update: { status: PaymentOrderStatus.CAPTURED },
      create: {
        paymentOrderId: paymentOrder.id,
        razorpayPaymentId,
        status: PaymentOrderStatus.CAPTURED,
        amount,
        currency,
        ipAddress: paymentEntity.notes?.ip,
        userAgent: paymentEntity.notes?.userAgent,
      },
    });

    // Update Order Status
    await prisma.paymentOrder.update({
      where: { id: paymentOrder.id },
      data: { status: PaymentOrderStatus.CAPTURED },
    });

    // Immutable Ledger Entry
    const revenueTx = await prisma.revenueTransaction.create({
      data: {
        paymentOrderId: paymentOrder.id,
        amount,
        currency,
        taxAmount: paymentEntity.tax || 0,
        platformFee: paymentEntity.fee || 0,
        netAmount: amount - ((paymentEntity.fee || 0) + (paymentEntity.tax || 0)) / 100,
      },
    });

    // Consume Coupon
    if (paymentOrder.coupon) {
      await this.couponEngine.consumeCoupon(paymentOrder.coupon.code);
    }

    // Trigger Enrollment
    await this.registrationEngine.enrollCandidate(paymentOrder.registrationId);

    // Audit Log
    await prisma.revenueAuditLog.create({
      data: {
        action: "PAYMENT_CAPTURED_AND_ENROLLED",
        targetId: revenueTx.id,
        metadata: { paymentOrderId: paymentOrder.id, amount, razorpayPaymentId },
      },
    });
  }

  private async handlePaymentFailed(payload: any) {
    const paymentEntity = payload.payment.entity;
    const razorpayOrderId = paymentEntity.order_id;
    const razorpayPaymentId = paymentEntity.id;
    const errorReason = paymentEntity.error_description;

    const paymentOrder = await prisma.paymentOrder.findUnique({
      where: { razorpayOrderId },
    });

    if (!paymentOrder)
      throw new Error(`PaymentOrder not found for Razorpay Order: ${razorpayOrderId}`);

    // Create Failed Attempt
    await prisma.paymentAttempt.create({
      data: {
        paymentOrderId: paymentOrder.id,
        razorpayPaymentId,
        status: PaymentOrderStatus.FAILED,
        amount: paymentEntity.amount / 100,
        currency: paymentEntity.currency,
        errorReason,
      },
    });

    // Fallback logic for releasing coupon and resetting registration
    await this.registrationEngine.processFailedPayment(paymentOrder.id);
  }

  private async handleRefundProcessed(payload: any) {
    const refundEntity = payload.refund.entity;
    const razorpayRefundId = refundEntity.id;

    await prisma.refundRecord.update({
      where: { razorpayRefundId },
      data: { status: "PROCESSED" },
    });
  }
}
