/**
 * Basic in-memory rate limiter for server actions and API routes.
 * In a real-world production app with multiple nodes, use Redis (e.g. Upstash).
 * This implementation acts as a fallback/foundation for QuizArena.
 */

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimitCache = new Map<string, RateLimitInfo>();

export interface RateLimitConfig {
  interval: number; // in seconds
  maxRequests: number; // max requests per interval
}

/**
 * Validates if the action is allowed based on the rate limit configuration.
 * @param identifier The unique identifier for the user (IP address or User ID)
 * @param action The specific action being rate limited
 * @param config Rate limit settings
 * @returns boolean indicating if the request should be allowed
 */
export async function checkRateLimit(
  identifier: string,
  action: string,
  config: RateLimitConfig
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const key = `${action}:${identifier}`;
  const now = Date.now();
  const resetTime = now + config.interval * 1000;

  const current = rateLimitCache.get(key);

  if (!current) {
    rateLimitCache.set(key, { count: 1, resetTime });
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: resetTime,
    };
  }

  // If the interval has passed, reset the count
  if (now > current.resetTime) {
    rateLimitCache.set(key, { count: 1, resetTime });
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: resetTime,
    };
  }

  // If the interval is still active, increment count
  if (current.count < config.maxRequests) {
    current.count += 1;
    rateLimitCache.set(key, current);
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - current.count,
      reset: current.resetTime,
    };
  }

  // Rate limit exceeded
  return {
    success: false,
    limit: config.maxRequests,
    remaining: 0,
    reset: current.resetTime,
  };
}

// Cleanup interval to prevent memory leaks in the fallback implementation
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitCache.entries()) {
      if (now > value.resetTime) {
        rateLimitCache.delete(key);
      }
    }
  }, 60000); // cleanup every minute
}
