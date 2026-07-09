export interface RevenueHealthReadModel {
  paymentSuccessPercentage: number;
  webhookDelayMs: number;
  webhookFailuresCount: number;
  refundQueueLength: number;
  settlementDelayDays: number;
  gatewayLatencyMs: number;
  couponReservationQueueLength: number;
  averageCheckoutTimeSeconds: number;
  abandonedCheckouts: number;
  duplicatePaymentAttempts: number;
}

export interface PaymentTimelineReadModel {
  orderId: string;
  candidateId: string;
  events: {
    eventType: string;
    timestamp: Date;
    status: "SUCCESS" | "WARNING" | "FAILED";
    metadata?: Record<string, any>;
  }[];
}

export interface CompetitionRevenueReadModel {
  competitionId: string;
  totalRegistrations: number;
  grossRevenue: number;
  netRevenue: number;
  refundsProcessed: number;
  activePricingVersion: number;
}

export interface SettlementReadModel {
  settlementId: string;
  razorpayId: string;
  status: string;
  amount: number;
  fees: number;
  tax: number;
  utr: string | null;
  settledAt: Date | null;
}

export interface RefundReadModel {
  refundId: string;
  transactionId: string;
  amount: number;
  reason: string;
  status: string;
  requestedBy: string;
  createdAt: Date;
}

export interface CouponAnalyticsReadModel {
  couponId: string;
  code: string;
  totalUses: number;
  totalReserved: number;
  revenueGenerated: number;
  discountGiven: number;
}
