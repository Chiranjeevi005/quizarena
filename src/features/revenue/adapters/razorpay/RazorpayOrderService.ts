import { getRazorpayInstance } from './RazorpayConfig';

export class RazorpayOrderService {
  public async createOrder(options: {
    amount: number; // in minor units (e.g., paise)
    currency: string;
    receipt: string;
    notes?: Record<string, string>;
  }): Promise<{ id: string; amount: number; currency: string; status: string; receipt: string }> {
    const razorpay = getRazorpayInstance();

    try {
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
    } catch (error) {
      console.error('Razorpay Order Creation Failed:', error);
      throw new Error('Failed to create payment order in Razorpay');
    }
  }

  public async fetchOrder(orderId: string): Promise<any> {
    const razorpay = getRazorpayInstance();
    return await razorpay.orders.fetch(orderId);
  }
}
