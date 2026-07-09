import crypto from "crypto";

export class RazorpayWebhookVerifier {
  public static verifySignature(payload: string, signature: string): boolean {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("Razorpay webhook secret is missing from environment variables");
      return false;
    }

    try {
      const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

      return expectedSignature === signature;
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return false;
    }
  }
}
