import { logger } from "@/lib/logger";

/**
 * QuizArena Background Jobs Foundation.
 *
 * In a real-world scale (Next.js on Vercel), background jobs should be offloaded to
 * serverless queues like Inngest, Trigger.dev, or Vercel Functions with `waitUntil()`.
 * This wrapper abstract provides a unified interface that can be replaced with a real Queue.
 */

type JobPayload = Record<string, any>;

export interface BackgroundJob {
  name: string;
  handler: (payload: JobPayload) => Promise<void>;
}

class JobQueue {
  private jobs: Map<string, BackgroundJob> = new Map();

  register(job: BackgroundJob) {
    this.jobs.set(job.name, job);
    logger.info(`[JOB QUEUE] Registered job: ${job.name}`);
  }

  /**
   * Enqueues a job for background execution.
   * In local/fallback mode, it runs asynchronously without blocking the request.
   */
  async enqueue(jobName: string, payload: JobPayload) {
    const job = this.jobs.get(jobName);
    if (!job) {
      logger.error(`[JOB QUEUE] Failed to enqueue unknown job: ${jobName}`);
      return false;
    }

    // Fire and forget (Next.js 14+ `waitUntil` should be used here if available in context)
    Promise.resolve().then(async () => {
      try {
        logger.info(`[JOB QUEUE] Executing job: ${jobName}`, { payload });
        await job.handler(payload);
        logger.info(`[JOB QUEUE] Job completed successfully: ${jobName}`);
      } catch (error) {
        logger.error(`[JOB QUEUE] Job execution failed: ${jobName}`, error, { payload });
      }
    });

    return true;
  }
}

export const backgroundQueue = new JobQueue();

// --- Built-in Jobs Registration --- //

backgroundQueue.register({
  name: "leaderboard_recalculation",
  handler: async (payload) => {
    // Example: Trigger full leaderboard refresh for a challenge
    const { challengeId } = payload;
    logger.info(`Recalculating leaderboard for challenge ${challengeId}...`);
    // await recalculateLeaderboard(challengeId);
  },
});

backgroundQueue.register({
  name: "analytics_aggregation",
  handler: async (payload) => {
    logger.info("Running daily analytics aggregation...");
    // await aggregateDailyAnalytics();
  },
});
