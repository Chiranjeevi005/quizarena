import { PrismaClient, CouponState } from '../../../generated/prisma';

const prisma = new PrismaClient();

export class CouponEngine {
  /**
   * Validate if a coupon can be applied to a specific competition.
   */
  public async validateCoupon(code: string, competitionId: string, userId: string): Promise<any> {
    const coupon = await prisma.coupon.findUnique({ where: { code } });

    if (!coupon) throw new Error('Coupon not found');
    if (coupon.state !== CouponState.ACTIVE) throw new Error('Coupon is not active');
    
    if (coupon.competitionId && coupon.competitionId !== competitionId) {
      throw new Error('Coupon is not valid for this competition');
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new Error('Coupon has expired');
    }

    if (coupon.maxUsage && coupon.currentUsage >= coupon.maxUsage) {
      throw new Error('Coupon usage limit reached');
    }

    if (coupon.firstUserOnly) {
      const pastOrders = await prisma.paymentOrder.findFirst({
        where: { userId, status: { in: ['CAPTURED', 'AUTHORIZED'] } }
      });
      if (pastOrders) throw new Error('Coupon is only valid for first-time users');
    }

    return coupon;
  }

  /**
   * Reserve a coupon for a pending checkout.
   */
  public async reserveCoupon(code: string): Promise<void> {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon) throw new Error('Coupon not found');

    if (coupon.maxUsage) {
      await prisma.coupon.update({
        where: { code },
        data: {
          currentUsage: { increment: 1 },
          state: coupon.currentUsage + 1 >= coupon.maxUsage ? CouponState.EXPIRED : undefined
        }
      });
    }
  }

  /**
   * Consume a coupon after payment is successfully captured.
   */
  public async consumeCoupon(code: string): Promise<void> {
    // Reservation already incremented currentUsage.
    // If you implement a deeper state machine for Coupons, you'd mark the Reservation ID as CONSUMED here.
  }

  /**
   * Release a coupon if payment fails or times out.
   */
  public async releaseCoupon(code: string): Promise<void> {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon) return;

    if (coupon.maxUsage && coupon.currentUsage > 0) {
      await prisma.coupon.update({
        where: { code },
        data: {
          currentUsage: { decrement: 1 },
          state: coupon.state === CouponState.EXPIRED ? CouponState.ACTIVE : undefined
        }
      });
    }
  }
}
