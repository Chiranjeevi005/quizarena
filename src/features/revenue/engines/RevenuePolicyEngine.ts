import { User, UserRole, PaymentOrder, PaymentOrderStatus, Coupon, CouponState, CompetitionPricingPolicy } from '../../../generated/prisma';

export interface PolicyContext {
  user: User;
}

export class RevenuePolicyEngine {
  
  /**
   * Determine if the user has overarching revenue operations permission
   */
  public hasRevenueOpsAccess(context: PolicyContext): boolean {
    return context.user.role === UserRole.SUPER_ADMIN || context.user.role === UserRole.ADMIN;
  }

  /**
   * Determine if a refund can be initiated for a specific payment order
   */
  public canRefund(context: PolicyContext, order: PaymentOrder): boolean {
    if (!this.hasRevenueOpsAccess(context)) return false;
    
    // Only CAPTURED or PARTIALLY_REFUNDED orders can be refunded
    if (order.status !== PaymentOrderStatus.CAPTURED && order.status !== PaymentOrderStatus.PARTIALLY_REFUNDED) {
      return false;
    }
    
    return true;
  }

  /**
   * Determine if a payment order can be manually captured
   */
  public canCapture(context: PolicyContext, order: PaymentOrder): boolean {
    if (!this.hasRevenueOpsAccess(context)) return false;
    
    // Only AUTHORIZED orders can be manually captured
    return order.status === PaymentOrderStatus.AUTHORIZED;
  }

  /**
   * Determine if pricing policies can be edited
   */
  public canEditPricing(context: PolicyContext, policy: CompetitionPricingPolicy): boolean {
    if (!this.hasRevenueOpsAccess(context)) return false;
    
    // Can only edit if no active registrations exist, otherwise must create new version
    // (This is a simplified check, full check would need to query registrations)
    return true; 
  }

  /**
   * Determine if a coupon can be deleted/archived
   */
  public canDeleteCoupon(context: PolicyContext, coupon: Coupon): boolean {
    if (!this.hasRevenueOpsAccess(context)) return false;
    
    // Cannot delete coupons that have been heavily used, only disable them
    return coupon.state === CouponState.DRAFT || coupon.currentUsage === 0;
  }

  /**
   * Determine if a webhook can be manually retried from the DLQ
   */
  public canRetryWebhook(context: PolicyContext): boolean {
    // Requires high-level access
    return context.user.role === UserRole.SUPER_ADMIN;
  }
}
