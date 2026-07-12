export interface SearchMetrics {
  executionTimeMs: number;
  totalHits: number;
  cacheHit: boolean;
}

export interface SearchPerformance {
  p95ExecutionTimeMs: number;
  p99ExecutionTimeMs: number;
  averageExecutionTimeMs: number;
  queriesPerSecond: number;
}
