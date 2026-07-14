import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { verifyRazorpaySignature } from "../providers/razorpay.provider";
import { PaymentOrderStatus, RegistrationState } from "@/generated/prisma";

export class WebhookService {
  async handleRazorpayWebhook(payload: any, signature: string, rawBody: string) {
    const eventType = payload.event;

    if (eventType === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      // 1. Verify Signature
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "dummy_webhook_secret";

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        throw new Error("Invalid signature");
      }

      // 2. Find internal payment order
      const paymentOrder = await prisma.paymentOrder.findUnique({
        where: { razorpayOrderId: orderId },
      });

      if (!paymentOrder) {
        console.warn(`Payment order not found for razorpayOrderId: ${orderId}`);
        return;
      }

      if (paymentOrder.status === PaymentOrderStatus.CAPTURED) {
        // Idempotency: Already captured
        return;
      }

      // 3. Update Order and Registration atomically
      await prisma.$transaction([
        prisma.paymentOrder.update({
          where: { id: paymentOrder.id },
          data: { status: PaymentOrderStatus.CAPTURED },
        }),
        prisma.registration.update({
          where: { id: paymentOrder.registrationId },
          data: {
            state: RegistrationState.ENROLLED,
            enrolledAt: new Date(),
          },
        }),
      ]);
    }
  }
}

export const webhookService = new WebhookService();
