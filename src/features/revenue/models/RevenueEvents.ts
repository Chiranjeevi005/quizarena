/**
 * Revenue Domain Events
 *
 * Strict event definitions for the Revenue lifecycle.
 * Emitted by the WebhookProcessor, Gateways, and Engines.
 */

export enum RevenueEventType {
  ORDER_CREATED = "revenue.order.created",
  COUPON_APPLIED = "revenue.coupon.applied",
  COUPON_RELEASED = "revenue.coupon.released",
  PAYMENT_AUTHORIZED = "revenue.payment.authorized",
  PAYMENT_CAPTURED = "revenue.payment.captured",
  PAYMENT_FAILED = "revenue.payment.failed",
  ENROLLMENT_COMPLETED = "revenue.enrollment.completed",
  REFUND_REQUESTED = "revenue.refund.requested",
  REFUND_COMPLETED = "revenue.refund.completed",
  SETTLEMENT_RECEIVED = "revenue.settlement.received",
}

export interface OrderCreatedEvent {
  type: RevenueEventType.ORDER_CREATED;
  payload: {
    paymentOrderId: string;
    registrationId: string;
    userId: string;
    competitionId: string;
    amount: number;
    currency: string;
    timestamp: Date;
  };
}

export interface CouponAppliedEvent {
  type: RevenueEventType.COUPON_APPLIED;
  payload: {
    paymentOrderId: string;
    couponId: string;
    code: string;
    userId: string;
    timestamp: Date;
  };
}

export interface CouponReleasedEvent {
  type: RevenueEventType.COUPON_RELEASED;
  payload: {
    paymentOrderId: string;
    couponId: string;
    code: string;
    reason: string;
    timestamp: Date;
  };
}

export interface PaymentAuthorizedEvent {
  type: RevenueEventType.PAYMENT_AUTHORIZED;
  payload: {
    paymentOrderId: string;
    attemptId: string;
    razorpayPaymentId: string;
    amount: number;
    currency: string;
    timestamp: Date;
  };
}

export interface PaymentCapturedEvent {
  type: RevenueEventType.PAYMENT_CAPTURED;
  payload: {
    paymentOrderId: string;
    attemptId: string;
    revenueTransactionId: string;
    razorpayPaymentId: string;
    amount: number;
    currency: string;
    timestamp: Date;
  };
}

export interface PaymentFailedEvent {
  type: RevenueEventType.PAYMENT_FAILED;
  payload: {
    paymentOrderId: string;
    attemptId: string;
    razorpayPaymentId?: string;
    reason: string;
    timestamp: Date;
  };
}

export interface EnrollmentCompletedEvent {
  type: RevenueEventType.ENROLLMENT_COMPLETED;
  payload: {
    registrationId: string;
    userId: string;
    competitionId: string;
    revenueTransactionId: string;
    timestamp: Date;
  };
}

export interface RefundRequestedEvent {
  type: RevenueEventType.REFUND_REQUESTED;
  payload: {
    refundRecordId: string;
    revenueTransactionId: string;
    amount: number;
    reason: string;
    requestedBy: string;
    timestamp: Date;
  };
}

export interface RefundCompletedEvent {
  type: RevenueEventType.REFUND_COMPLETED;
  payload: {
    refundRecordId: string;
    revenueTransactionId: string;
    razorpayRefundId: string;
    amount: number;
    timestamp: Date;
  };
}

export interface SettlementReceivedEvent {
  type: RevenueEventType.SETTLEMENT_RECEIVED;
  payload: {
    settlementRecordId: string;
    razorpaySettlementId: string;
    amount: number;
    fees: number;
    tax: number;
    timestamp: Date;
  };
}

export type RevenueDomainEvent =
  | OrderCreatedEvent
  | CouponAppliedEvent
  | CouponReleasedEvent
  | PaymentAuthorizedEvent
  | PaymentCapturedEvent
  | PaymentFailedEvent
  | EnrollmentCompletedEvent
  | RefundRequestedEvent
  | RefundCompletedEvent
  | SettlementReceivedEvent;
