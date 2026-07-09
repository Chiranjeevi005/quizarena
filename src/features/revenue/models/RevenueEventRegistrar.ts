import {
  PlatformEventRegistry,
  EventSchemaDefinition,
} from "../../../platform/registry/PlatformEventRegistry";

export enum RevenueEvent {
  OrderCreated = "revenue.order.created",
  CouponReserved = "revenue.coupon.reserved",
  CouponReleased = "revenue.coupon.released",
  PaymentOpened = "revenue.payment.opened",
  PaymentCaptured = "revenue.payment.captured",
  PaymentFailed = "revenue.payment.failed",
  EnrollmentCompleted = "revenue.enrollment.completed",
  RefundRequested = "revenue.refund.requested",
  RefundCompleted = "revenue.refund.completed",
  SettlementReceived = "revenue.settlement.received",
  SettlementSynced = "revenue.settlement.synced",
  RevenueReconciled = "revenue.reconciled",
}

export class RevenueEventRegistrar {
  constructor(private readonly registry: PlatformEventRegistry) {}

  public registerAll(): void {
    const events: EventSchemaDefinition[] = [
      {
        eventName: RevenueEvent.OrderCreated,
        version: "1.0",
        producer: "RevenueModule",
        consumers: ["NotificationModule"],
        schema: { type: "object" },
      },
      {
        eventName: RevenueEvent.PaymentCaptured,
        version: "1.0",
        producer: "RevenueModule",
        consumers: ["EnrollmentModule", "NotificationModule"],
        schema: { type: "object" },
      },
      {
        eventName: RevenueEvent.PaymentFailed,
        version: "1.0",
        producer: "RevenueModule",
        consumers: ["NotificationModule"],
        schema: { type: "object" },
      },
      {
        eventName: RevenueEvent.EnrollmentCompleted,
        version: "1.0",
        producer: "RevenueModule",
        consumers: ["LeaderboardModule", "CompetitionModule"],
        schema: { type: "object" },
      },
      {
        eventName: RevenueEvent.RefundRequested,
        version: "1.0",
        producer: "RevenueModule",
        consumers: ["AuditModule"],
        schema: { type: "object" },
      },
      {
        eventName: RevenueEvent.RefundCompleted,
        version: "1.0",
        producer: "RevenueModule",
        consumers: ["NotificationModule"],
        schema: { type: "object" },
      },
    ];

    events.forEach((event) => this.registry.register(event));
  }
}
