export class AnalyticsScheduler {
  constructor(
    private readonly aggregator: any,
    private readonly forecastEngine: any,
    private readonly reportBuilder: any
  ) {}

  public async runHourlyTasks(): Promise<void> {
    await this.aggregator.performHourlyRollup();
  }

  public async runDailyTasks(): Promise<void> {
    await this.aggregator.performDailyRollup();
    await this.forecastEngine.refreshForecasts();
    await this.reportBuilder.generateDailyReports();
  }

  public async runWeeklyTasks(): Promise<void> {
    await this.aggregator.performWeeklyRollup();
  }
}
