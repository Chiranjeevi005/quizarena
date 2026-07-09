export interface RetryPolicy {
  maxAttempts: number;
  baseDelayMs: number;
  backoffMultiplier: number;
  maxDelayMs: number;
}

export const RevenueRetryPolicies: Record<string, RetryPolicy> = {
  WebhookProcessing: {
    maxAttempts: 5,
    baseDelayMs: 2000, // 2 seconds
    backoffMultiplier: 2, // Exponential
    maxDelayMs: 60000, // 1 minute max
  },
  SettlementSync: {
    maxAttempts: 3,
    baseDelayMs: 300000, // 5 minutes
    backoffMultiplier: 1, // Linear
    maxDelayMs: 300000,
  },
  RefundCreation: {
    maxAttempts: 2,
    baseDelayMs: 1000,
    backoffMultiplier: 2,
    maxDelayMs: 5000,
  },
  ReconciliationJob: {
    maxAttempts: 1, // Runs daily, don't auto-retry on failure immediately
    baseDelayMs: 0,
    backoffMultiplier: 1,
    maxDelayMs: 0,
  },
};

/**
 * Helper to calculate the next delay based on the current attempt number.
 */
export const calculateNextDelay = (policy: RetryPolicy, currentAttempt: number): number => {
  if (currentAttempt >= policy.maxAttempts) {
    return -1; // Stop retrying
  }

  const delay = policy.baseDelayMs * Math.pow(policy.backoffMultiplier, currentAttempt - 1);
  return Math.min(delay, policy.maxDelayMs);
};
