export enum GatewayCapability {
  SupportsRefund = "SupportsRefund",
  SupportsPartialRefund = "SupportsPartialRefund",
  SupportsCapture = "SupportsCapture",
  SupportsWebhook = "SupportsWebhook",
  SupportsSettlement = "SupportsSettlement",
  SupportsSubscriptions = "SupportsSubscriptions",
}

export interface PaymentGateway {
  getCapabilities(): GatewayCapability[];
  hasCapability(capability: GatewayCapability): boolean;

  createOrder(options: {
    amount: number;
    currency: string;
    receipt: string;
    notes?: Record<string, string>;
  }): Promise<{ id: string; amount: number; currency: string; status: string; receipt: string }>;
  fetchOrder(orderId: string): Promise<any>;

  fetchPayment(paymentId: string): Promise<any>;
  capturePayment(paymentId: string, amount: number, currency: string): Promise<any>;

  createRefund(options: {
    paymentId: string;
    amount?: number;
    receipt?: string;
    notes?: Record<string, string>;
  }): Promise<{ id: string; amount: number; status: string }>;
  fetchRefund(refundId: string): Promise<any>;

  verifyWebhookSignature(payload: string, signature: string): boolean;
}
