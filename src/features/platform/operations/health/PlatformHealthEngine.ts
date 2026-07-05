import {
  PrismaClient,
  PlatformComponentHealth,
  WorkerStatus,
  QueueStatus,
} from "@/generated/prisma";

const prisma = new PrismaClient();

export class PlatformHealthEngine {
  /**
   * Recalculates the global platform health score by aggregating
   * database, redis, worker, and queue health statuses.
   */
  public async updateGlobalHealth(): Promise<void> {
    const dbHealth = await this.checkDatabaseHealth();
    const redisHealth = await this.checkRedisHealth();
    const cronHealth = await this.checkCronHealth();

    // Evaluate workers
    const workers = await prisma.workerHealth.findMany();
    const allWorkersHealthy = workers.every(
      (w) => w.status === WorkerStatus.IDLE || w.status === WorkerStatus.PROCESSING
    );

    // Evaluate queues
    const queues = await prisma.queueHealth.findMany();
    const allQueuesHealthy = queues.every((q) => q.status === QueueStatus.HEALTHY);

    let overallScore = 100;

    if (
      dbHealth !== PlatformComponentHealth.HEALTHY &&
      dbHealth !== PlatformComponentHealth.EXCELLENT
    )
      overallScore -= 20;
    if (
      redisHealth !== PlatformComponentHealth.HEALTHY &&
      redisHealth !== PlatformComponentHealth.EXCELLENT
    )
      overallScore -= 10;
    if (
      cronHealth !== PlatformComponentHealth.HEALTHY &&
      cronHealth !== PlatformComponentHealth.EXCELLENT
    )
      overallScore -= 10;
    if (!allWorkersHealthy) overallScore -= 15;
    if (!allQueuesHealthy) overallScore -= 10;

    await prisma.platformSystemHealth.upsert({
      where: { id: "global-health" },
      update: {
        overallScore: Math.max(0, overallScore),
        databaseHealth: dbHealth,
        redisHealth: redisHealth,
        storageHealth: PlatformComponentHealth.HEALTHY,
        cronHealth: cronHealth,
        authenticationHealth: PlatformComponentHealth.HEALTHY,
        paymentsHealth: PlatformComponentHealth.HEALTHY,
        lastCheckedAt: new Date(),
      },
      create: {
        id: "global-health",
        overallScore: Math.max(0, overallScore),
        databaseHealth: dbHealth,
        redisHealth: redisHealth,
        storageHealth: PlatformComponentHealth.HEALTHY,
        cronHealth: cronHealth,
        authenticationHealth: PlatformComponentHealth.HEALTHY,
        paymentsHealth: PlatformComponentHealth.HEALTHY,
      },
    });
  }

  private async checkDatabaseHealth(): Promise<PlatformComponentHealth> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return PlatformComponentHealth.HEALTHY;
    } catch {
      return PlatformComponentHealth.CRITICAL;
    }
  }

  private async checkRedisHealth(): Promise<PlatformComponentHealth> {
    // Placeholder for actual Redis ping
    return PlatformComponentHealth.HEALTHY;
  }

  private async checkCronHealth(): Promise<PlatformComponentHealth> {
    return PlatformComponentHealth.HEALTHY;
  }
}
