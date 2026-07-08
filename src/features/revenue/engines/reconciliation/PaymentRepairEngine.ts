import { Discrepancy } from './PaymentReconciliationPlanner';
import { RevenueRepairCommandHandler, ResyncOrderCommand } from '../../commands/RepairCommands';

export class PaymentRepairEngine {
  constructor(
    private readonly commandHandler: RevenueRepairCommandHandler
  ) {}

  /**
   * Attempts to repair a specific discrepancy automatically.
   */
  public async repair(discrepancy: Discrepancy): Promise<boolean> {
    try {
      if (discrepancy.issueType === 'MISSING_WEBHOOK') {
        const command: ResyncOrderCommand = {
          paymentOrderId: discrepancy.paymentOrderId,
          actor: { id: 'SYSTEM', role: 'SUPER_ADMIN' } as any, // System actor
          reason: 'Automated reconciliation repair'
        };
        
        const result = await this.commandHandler.handleResyncOrder(command);
        return result.success;
      }
      
      // Other issue types can be handled here...
      
      return false;
    } catch (error) {
      console.error(`Repair failed for order ${discrepancy.paymentOrderId}`, error);
      return false;
    }
  }
}
