import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export class DeploymentQueueService {
  /**
   * Enqueues a deployment if another deployment is currently running for the same competition.
   * Otherwise, returns 0 for immediate execution.
   */
  public async enqueue(competitionVersionId: string): Promise<number> {
    const version = await prisma.competitionVersion.findUnique({
      where: { id: competitionVersionId },
    });

    if (!version) {
      throw new Error(`Version ${competitionVersionId} not found.`);
    }

    const activeDeployments = await prisma.publishDeployment.count({
      where: {
        version: {
          competitionId: version.competitionId,
        },
        status: {
          in: ["PLANNED", "VALIDATING", "EXECUTING", "VERIFYING", "ACTIVATING"],
        },
      },
    });

    return activeDeployments > 0 ? activeDeployments + 1 : 0;
  }

  /**
   * Dequeues the next pending deployment for a competition.
   */
  public async dequeueNext(competitionId: string): Promise<string | null> {
    const nextDeployment = await prisma.publishDeployment.findFirst({
      where: {
        version: {
          competitionId,
        },
        status: "PLANNED",
        queuePosition: { gt: 0 },
      },
      orderBy: {
        queuedAt: "asc",
      },
    });

    if (!nextDeployment) return null;

    await prisma.publishDeployment.update({
      where: { id: nextDeployment.id },
      data: { queuePosition: 0 },
    });

    return nextDeployment.id;
  }
}
