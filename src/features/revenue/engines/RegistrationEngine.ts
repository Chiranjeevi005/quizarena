import { PrismaClient, RegistrationState, PaymentOrderStatus, PricingPolicyType } from '../../../generated/prisma';

const prisma = new PrismaClient();
import { CouponEngine } from './CouponEngine';
import { RazorpayOrderService } from '../adapters/razorpay/RazorpayOrderService';

export class RegistrationEngine {
  private couponEngine = new CouponEngine();
  private orderService = new RazorpayOrderService();

  public async initiateRegistration(userId: string, competitionId: string, couponCode?: string) {
    // 1. Fetch Competition & Active Pricing Policy
    const policy = await prisma.competitionPricingPolicy.findFirst({
      where: { competitionId, isActive: true },
      orderBy: { version: 'desc' }
    });

    if (!policy) throw new Error('No active pricing policy for this competition');

    // 2. State Machine: Initialize Registration
    const registration = await prisma.registration.upsert({
      where: { userId_competitionId: { userId, competitionId } },
      update: { state: RegistrationState.REGISTERING },
      create: {
        userId,
        competitionId,
        pricingPolicyId: policy.id,
        state: RegistrationState.REGISTERING
      }
    });

    // 3. Pricing Calculation & Coupon Processing
    let finalAmount = policy.baseFee;
    let couponId: string | undefined = undefined;

    if (policy.type === PricingPolicyType.FREE) {
      finalAmount = 0;
    } else if (couponCode) {
      const coupon = await this.couponEngine.validateCoupon(couponCode, competitionId, userId);
      couponId = coupon.id;
      if (coupon.type === 'PERCENTAGE') {
        finalAmount = finalAmount - (finalAmount * (coupon.value / 100));
      } else {
        finalAmount = Math.max(0, finalAmount - coupon.value);
      }
      await this.couponEngine.reserveCoupon(couponCode);
    }

    // 4. Create Payment Order if amount > 0
    if (finalAmount > 0) {
      const razorpayOrder = await this.orderService.createOrder({
        amount: Math.round(finalAmount * 100), // Minor units
        currency: policy.currency,
        receipt: `REG-${registration.id}`
      });

      const paymentOrder = await prisma.paymentOrder.create({
        data: {
          registrationId: registration.id,
          userId,
          competitionId,
          couponId,
          amount: finalAmount,
          currency: policy.currency,
          razorpayOrderId: razorpayOrder.id,
          status: PaymentOrderStatus.CREATED
        }
      });

      await prisma.registration.update({
        where: { id: registration.id },
        data: { state: RegistrationState.PAYMENT_PENDING }
      });

      return { registration, paymentOrder, finalAmount, razorpayOrderId: razorpayOrder.id };
    } else {
      // 5. Free / Full Discount Flow -> Enroll Immediately
      await this.enrollCandidate(registration.id);
      return { registration, finalAmount: 0 };
    }
  }

  public async enrollCandidate(registrationId: string) {
    await prisma.registration.update({
      where: { id: registrationId },
      data: {
        state: RegistrationState.ENROLLED,
        enrolledAt: new Date()
      }
    });

    // We can also emit ENROLLMENT_COMPLETED event here.
  }

  public async processFailedPayment(paymentOrderId: string) {
    const paymentOrder = await prisma.paymentOrder.findUnique({
      where: { id: paymentOrderId },
      include: { coupon: true, registration: true }
    });

    if (!paymentOrder) return;

    if (paymentOrder.coupon) {
      await this.couponEngine.releaseCoupon(paymentOrder.coupon.code);
    }

    await prisma.registration.update({
      where: { id: paymentOrder.registrationId },
      data: { state: RegistrationState.NOT_REGISTERED }
    });
  }
}
