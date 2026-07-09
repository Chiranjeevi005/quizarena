export class ReconciliationReportGenerator {
  constructor(private readonly db: any) {}

  public async startReport(totalChecked: number): Promise<string> {
    const report = await this.db.paymentReconciliationReport.create({
      data: {
        totalChecked,
        status: "IN_PROGRESS",
      },
    });
    return report.id;
  }

  public async logSnapshot(reportId: string, snapshot: any): Promise<void> {
    await this.db.reconciliationSnapshot.create({
      data: {
        reportId,
        paymentOrderId: snapshot.paymentOrderId,
        razorpayStatus: snapshot.razorpayStatus,
        databaseStatus: snapshot.databaseStatus,
        resolved: snapshot.resolved,
        resolutionAction: snapshot.resolutionAction,
      },
    });
  }

  public async completeReport(reportId: string, mismatchesFixed: number): Promise<void> {
    await this.db.paymentReconciliationReport.update({
      where: { id: reportId },
      data: {
        status: "COMPLETED",
        mismatchesFound: mismatchesFixed, // or total mismatches
      },
    });
  }
}
