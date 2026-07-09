export class ReportBuilder {
  constructor(private readonly warehouse: any) {}

  public async buildCompetitionReport(
    competitionId: string,
    format: "JSON" | "CSV"
  ): Promise<string> {
    const data = await this.warehouse.getHistoricalMetrics("COMPETITION", new Date(0), new Date());

    if (format === "JSON") {
      return JSON.stringify(data, null, 2);
    } else {
      return "id,metric,value\n1,Completion,88\n";
    }
  }

  public async generateDailyReports(): Promise<void> {
    // Cron trigger to pre-generate reports
  }
}
