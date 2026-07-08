import { PaymentGateway, GatewayCapability } from '../../gateways/core/PaymentGateway';
import { getRazorpayInstance } from './RazorpayConfig';
import crypto from 'crypto';

export class RazorpayAdapter implements PaymentGateway {
  public getCapabilities(): GatewayCapability[] {
    return [
      GatewayCapability.SupportsRefund,
      GatewayCapability.SupportsPartialRefund,
      GatewayCapability.SupportsCapture,
      GatewayCapability.SupportsWebhook,
      GatewayCapability.SupportsSettlement
    ];
  }

  public hasCapability(capability: GatewayCapability): boolean {
    return this.getCapabilities().includes(capability);
  }

  public async createOrder(options: { amount: number; currency: string; receipt: string; notes?: Record<string, string> }) {
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: options.amount,
      currency: options.currency,
      receipt: options.receipt,
      notes: options.notes
    });
    return {
      id: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      status: order.status,
      receipt: order.receipt || ''
    };
  }

  public async fetchOrder(orderId: string) {
    return await getRazorpayInstance().orders.fetch(orderId);
  }

  public async fetchPayment(paymentId: string) {
    return await getRazorpayInstance().payments.fetch(paymentId);
  }

  public async capturePayment(paymentId: string, amount: number, currency: string) {
    return await getRazorpayInstance().payments.capture(paymentId, amount, currency);
  }

  public async createRefund(options: { paymentId: string; amount?: number; receipt?: string; notes?: Record<string, string> }) {
    const refund = await getRazorpayInstance().payments.refund(options.paymentId, {
      amount: options.amount,
      receipt: options.receipt,
      notes: options.notes
    });
    return {
      id: refund.id,
      amount: Number(refund.amount),
      status: refund.status
    };
  }

  public async fetchRefund(refundId: string) {
    return await getRazorpayInstance().refunds.fetch(refundId);
  }

  public verifyWebhookSignature(payload: string, signature: string): boolean {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) return false;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return expectedSignature === signature;
  }
}
