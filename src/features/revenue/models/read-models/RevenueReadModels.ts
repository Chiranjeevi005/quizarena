// Immutable Data Transfer Objects (Read Models) for the UI

export interface PaymentTimelineEvent {
  title: string;
  timestamp: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  description?: string;
}

export interface PaymentTimelineReadModel {
  orderId: string;
  competitionName: string;
  amount: string;
  currency: string;
  events: PaymentTimelineEvent[];
  currentState: 'REGISTRATION_STARTED' | 'PAYMENT_PENDING' | 'PAYMENT_CAPTURED' | 'ENROLLED' | 'REFUNDED';
}

export interface RevenueHealthReadModel {
  currentGateway: string;
  gatewayMode: 'TEST' | 'LIVE';
  paymentSuccessRate: number; // e.g. 98.5
  webhookDelayMs: number;
  lastSuccessfulPaymentAt: string;
  lastSuccessfulRefundAt: string | null;
  lastSettlementAt: string | null;
  webhookStatus: 'HEALTHY' | 'DELAYED' | 'FAILING';
  databaseSyncStatus: 'SYNCED' | 'MISMATCHES_FOUND';
}

export interface RevenueWorkspaceDashboardReadModel {
  todayRevenue: number;
  thisMonthRevenue: number;
  activeCouponsCount: number;
  pendingRefundsCount: number;
  recentOrders: {
    orderId: string;
    amount: number;
    status: string;
    timestamp: string;
  }[];
}

export interface RevenueWorkspaceOrderReadModel {
  orderId: string;
  userName: string;
  competitionName: string;
  amount: number;
  status: string;
  createdAt: string;
}
