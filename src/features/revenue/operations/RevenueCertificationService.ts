import { getRazorpayInstance } from '../adapters/razorpay/RazorpayConfig';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export class RevenueCertificationService {
  /**
   * Verifies the entire Revenue infrastructure.
   * Runs health checks on Razorpay APIs, local DB config, and webhook secrets.
   */
  public async verifyAll(): Promise<{ healthScore: number; status: string; details: any }> {
    const checks = {
      razorpayKeys: false,
      webhookSecret: false,
      gatewayConnectivity: false,
      environment: process.env.NODE_ENV,
      gstConfiguration: false
    };

    let passed = 0;
    const total = 4; // Excluding environment

    // 1. Webhook Secret
    if (process.env.RAZORPAY_WEBHOOK_SECRET) {
      checks.webhookSecret = true;
      passed++;
    }

    // 2. Razorpay Keys & Connectivity
    try {
      const razorpay = getRazorpayInstance();
      // Simple ping by fetching orders (limit 1)
      await razorpay.orders.all({ count: 1 });
      checks.razorpayKeys = true;
      checks.gatewayConnectivity = true;
      passed += 2;
    } catch (e) {
      console.error('Certification: Gateway Connectivity Failed', e);
    }

    // 3. GST Configuration
    try {
      const gst = await prisma.gstConfiguration.findFirst({ where: { isActive: true } });
      if (gst && gst.gstPercentage > 0) {
        checks.gstConfiguration = true;
        passed++;
      }
    } catch (e) {
      console.error('Certification: GST Check Failed', e);
    }

    const healthScore = Math.round((passed / total) * 100);

    return {
      healthScore,
      status: healthScore === 100 ? 'Ready for Production' : 'Requires Attention',
      details: checks
    };
  }
}
