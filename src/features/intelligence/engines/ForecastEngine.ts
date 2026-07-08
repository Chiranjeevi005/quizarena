export class ForecastEngine {
  constructor(private readonly warehouse: any) {}

  public async generateHybridForecast(metricId: string, historicalData: number[]): Promise<number> {
    if (historicalData.length < 30) return historicalData[historicalData.length - 1] || 0;

    const last7 = historicalData.slice(-7);
    const last30 = historicalData.slice(-30);

    const avg7 = last7.reduce((a, b) => a + b, 0) / 7;
    const avg30 = last30.reduce((a, b) => a + b, 0) / 30;

    const previous = historicalData[historicalData.length - 2];
    const latest = historicalData[historicalData.length - 1];
    const growthRate = previous > 0 ? (latest - previous) / previous : 0;

    // Hybrid calculation weighing recent trends more heavily
    const forecast = (avg7 * 0.5) + (avg30 * 0.3) + (latest * (1 + growthRate) * 0.2);

    return Math.round(forecast);
  }
}
