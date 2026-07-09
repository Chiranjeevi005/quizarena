export class InsightEngine {
  constructor(private readonly warehouse: any) {}

  public async generateInsights(metricId: string, timestamp: Date): Promise<string[]> {
    // Decision Intelligence: "Why did it happen?"
    const insights: string[] = [];

    if (metricId === "REVENUE_DROP") {
      insights.push("Coupon usage decreased by 40% compared to previous period.");
      insights.push("Registration conversion decreased on weekend competitions.");
    }

    return insights;
  }
}
