import { RegistrationEngine } from "../engines/RegistrationEngine";
import { RefundEngine } from "../engines/RefundEngine";

export class RevenueGateway {
  private registrationEngine = new RegistrationEngine();
  private refundEngine = new RefundEngine();

  /**
   * Starts the checkout process for a candidate.
   * Returns order details for Razorpay checkout, or finalizes if free.
   */
  public async checkout(userId: string, competitionId: string, couponCode?: string) {
    return this.registrationEngine.initiateRegistration(userId, competitionId, couponCode);
  }

  /**
   * Manual refund by Super Admin
   */
  public async issueRefund(
    revenueTransactionId: string,
    amount: number,
    reason: string,
    adminId: string
  ) {
    return this.refundEngine.initiateRefund(revenueTransactionId, amount, reason, adminId);
  }
}

export const revenueGateway = new RevenueGateway();
