import {
  PricingPolicyType,
  CouponType,
  CouponState,
  RegistrationState,
  PaymentOrderStatus,
  RefundStatus
} from '../../../generated/prisma';

export {
  PricingPolicyType,
  CouponType,
  CouponState,
  RegistrationState,
  PaymentOrderStatus,
  RefundStatus
};

// Domain DTOs
export interface CreatePricingPolicyDto {
  competitionId: string;
  type: PricingPolicyType;
  currency: string;
  baseFee: number;
}

export interface CreateCouponDto {
  code: string;
  type: CouponType;
  value: number;
  competitionId?: string;
  maxUsage?: number;
  expiresAt?: Date;
  firstUserOnly?: boolean;
}

export interface InitiatePaymentDto {
  userId: string;
  competitionId: string;
  couponCode?: string;
}

export interface WebhookPayloadDto {
  eventId: string;
  event: string;
  payload: any;
  signature: string;
}
