import { Discrepancy } from "./PaymentReconciliationPlanner";

export class PaymentReconciliationExecutor {
  constructor(
    private readonly repairEngine: any,
    private readonly reportGenerator: any
  ) {}

  /**
   * Executes the repairs for the planned discrepancies and generates a report.
   */
  public async execute(discrepancies: Discrepancy[]): Promise<string> {
    const reportId = await this.reportGenerator.startReport(discrepancies.length);
    let resolvedCount = 0;

    for (const discrepancy of discrepancies) {
      const success = await this.repairEngine.repair(discrepancy);

      await this.reportGenerator.logSnapshot(reportId, {
        paymentOrderId: discrepancy.paymentOrderId,
        razorpayStatus: discrepancy.razorpayStatus,
        databaseStatus: discrepancy.databaseStatus,
        resolved: success,
        resolutionAction: success ? "Repaired via engine" : "Manual intervention required",
      });

      if (success) resolvedCount++;
    }

    await this.reportGenerator.completeReport(reportId, resolvedCount);

    return reportId;
  }
}
