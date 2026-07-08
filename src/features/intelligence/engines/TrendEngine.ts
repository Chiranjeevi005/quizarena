export type TrendType = 'INCREASING' | 'STABLE' | 'DECLINING' | 'SEASONAL' | 'SPIKE' | 'ANOMALY';

export class TrendEngine {
  public detectTrend(historicalDataPoints: number[]): TrendType {
    if (historicalDataPoints.length < 2) return 'STABLE';
    
    const latest = historicalDataPoints[historicalDataPoints.length - 1];
    const previous = historicalDataPoints[historicalDataPoints.length - 2];
    
    const diff = latest - previous;
    const percentageChange = (diff / previous) * 100;

    if (percentageChange > 50) return 'SPIKE';
    if (percentageChange < -50) return 'ANOMALY';
    if (percentageChange > 5) return 'INCREASING';
    if (percentageChange < -5) return 'DECLINING';
    
    return 'STABLE';
  }
}
