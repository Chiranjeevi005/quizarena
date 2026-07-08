import { getRazorpayInstance } from './RazorpayConfig';

export class RazorpayPaymentService {
  public async fetchPayment(paymentId: string): Promise<any> {
    const razorpay = getRazorpayInstance();
    try {
      return await razorpay.payments.fetch(paymentId);
    } catch (error) {
      console.error('Razorpay Fetch Payment Failed:', error);
      throw new Error('Failed to fetch payment from Razorpay');
    }
  }

  public async capturePayment(paymentId: string, amount: number, currency: string): Promise<any> {
    const razorpay = getRazorpayInstance();
    try {
      return await razorpay.payments.capture(paymentId, amount, currency);
    } catch (error) {
      console.error('Razorpay Capture Payment Failed:', error);
      throw new Error('Failed to capture payment in Razorpay');
    }
  }
}
