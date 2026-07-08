import { getRazorpayInstance } from './RazorpayConfig';

export class RazorpayRefundService {
  public async createRefund(options: {
    paymentId: string;
    amount?: number; // Optional. If not passed, full refund is initiated.
    receipt?: string;
    notes?: Record<string, string>;
  }): Promise<{ id: string; amount: number; status: string }> {
    const razorpay = getRazorpayInstance();

    try {
      const refund = await razorpay.payments.refund(options.paymentId, {
        amount: options.amount,
        receipt: options.receipt,
        notes: options.notes
      });

      return {
        id: refund.id,
        amount: Number(refund.amount),
        status: refund.status
      };
    } catch (error) {
      console.error('Razorpay Refund Creation Failed:', error);
      throw new Error('Failed to create refund in Razorpay');
    }
  }

  public async fetchRefund(refundId: string): Promise<any> {
    const razorpay = getRazorpayInstance();
    return await razorpay.refunds.fetch(refundId);
  }
}
