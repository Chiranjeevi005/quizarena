import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export class FinancialReportsService {
  /**
   * Generates a monthly revenue report
   */
  public async getMonthlyRevenue(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await prisma.revenueTransaction.findMany({
      where: {
        capturedAt: { gte: startDate, lte: endDate }
      }
    });

    const gross = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    const tax = transactions.reduce((acc, tx) => acc + tx.taxAmount, 0);
    const fees = transactions.reduce((acc, tx) => acc + tx.platformFee, 0);
    const net = transactions.reduce((acc, tx) => acc + tx.netAmount, 0);

    return {
      period: `${year}-${month.toString().padStart(2, '0')}`,
      totalTransactions: transactions.length,
      grossRevenue: gross,
      taxCollected: tax,
      platformFees: fees,
      netRevenue: net
    };
  }

  /**
   * Generates a report showing revenue per competition
   */
  public async getCompetitionRevenue(competitionId: string) {
    const orders = await prisma.paymentOrder.findMany({
      where: {
        competitionId,
        status: 'CAPTURED'
      },
      include: { revenueTransaction: true }
    });

    const gross = orders.reduce((acc, order) => acc + order.amount, 0);
    const net = orders.reduce((acc, order) => acc + (order.revenueTransaction?.netAmount || 0), 0);

    return {
      competitionId,
      totalPaidRegistrations: orders.length,
      grossRevenue: gross,
      netRevenue: net
    };
  }

  /**
   * Analyzes the impact of a specific coupon
   */
  public async getCouponImpact(couponCode: string) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: couponCode },
      include: {
        paymentOrders: {
          where: { status: 'CAPTURED' }
        }
      }
    });

    if (!coupon) throw new Error('Coupon not found');

    // Reconstruct the discount given
    // (This requires looking at the original price vs final amount, simplified here)
    const totalOrders = coupon.paymentOrders.length;
    let estimatedDiscountGiven = 0;
    
    if (coupon.type === 'FIXED') {
      estimatedDiscountGiven = totalOrders * coupon.value;
    } else {
      // Percentage involves math against original fee
      estimatedDiscountGiven = coupon.paymentOrders.reduce((acc, order) => {
         // rough math assuming amount = original - discount
         // For a real system we'd log the literal discount amount in the order
         return acc + (order.amount * (coupon.value / (100 - coupon.value)));
      }, 0);
    }

    return {
      couponCode,
      uses: totalOrders,
      discountGiven: estimatedDiscountGiven,
      revenueGenerated: coupon.paymentOrders.reduce((acc, order) => acc + order.amount, 0)
    };
  }
}
