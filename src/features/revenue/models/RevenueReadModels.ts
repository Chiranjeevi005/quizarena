import {
  PricingPolicyType,
  CouponState,
  CouponType,
  PaymentOrderStatus,
  RefundStatus,
  RegistrationState,
} from "../../../generated/prisma";

export interface RevenueDashboardReadModel {
  grossRevenue: number;
  netRevenue: number;
  platformFees: number;
  taxes: number;
  refundPercentage: number;
  couponLoss: number;
  averageTicketSize: number;
  conversionRate: number;
  paymentSuccessRate: number;
  paymentFailureRate: number;
  pendingAmount: number;
  todaysRevenue: number;
  monthlyRevenue: number;
  totalTransactions: number;
}

export interface PricingDashboardReadModel {
  competitionId: string;
  competitionTitle: string;
  currentVersion: number;
  type: PricingPolicyType;
  baseFee: number;
  currency: string;
  activeRegistrations: number;
  totalRevenueGenerated: number;
}

export interface CouponDashboardReadModel {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  state: CouponState;
  currentUsage: number;
  maxUsage: number | null;
  totalDiscountProvided: number;
  expiresAt: Date | null;
}

export interface RevenueAnalyticsReadModel {
  date: string; // YYYY-MM-DD
  grossRevenue: number;
  netRevenue: number;
  refunds: number;
  successfulTransactions: number;
  failedTransactions: number;
}

export interface PaymentTimelineReadModel {
  paymentOrderId: string;
  registrationId: string;
  candidateName: string;
  competitionTitle: string;
  amount: number;
  currency: string;
  currentStatus: PaymentOrderStatus;
  createdAt: Date;
  timelineEvents: {
    event: string; // e.g. "Order Generated", "Reserved", "Captured", "Refunded"
    timestamp: Date;
  }[];
}

export interface EnrollmentRevenueReadModel {
  registrationId: string;
  candidateName: string;
  competitionTitle: string;
  registrationState: RegistrationState;
  paymentStatus: PaymentOrderStatus;
  amountPaid: number;
  couponApplied: string | null;
  enrolledAt: Date | null;
}

export interface SettlementReadModel {
  id: string;
  razorpaySettlementId: string;
  status: string;
  amount: number;
  fees: number;
  tax: number;
  utr: string | null;
  settledAt: Date | null;
}
