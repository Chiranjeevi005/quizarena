import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export class DeploymentLockService {
  /**
   * Attempts to acquire a deployment lock for a competition.
   * Throws an error if a deployment is currently locked.
   */
  public async acquireLock(
    competitionId: string,
    userId: string,
    reason: string,
    versionId?: string
  ): Promise<string> {
    const activeLock = await prisma.deploymentLock.findFirst({
      where: {
        competitionId,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    if (activeLock) {
      throw new Error("A deployment is currently in progress for this competition.");
    }

    // Default lock duration: 1 hour (can be extended by heartbeat if needed)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const lock = await prisma.deploymentLock.create({
      data: {
        competitionId,
        userId,
        reason,
        versionId,
        isActive: true,
        expiresAt,
      },
    });

    return lock.id;
  }

  /**
   * Releases a deployment lock.
   */
  public async releaseLock(lockId: string): Promise<void> {
    await prisma.deploymentLock.update({
      where: { id: lockId },
      data: {
        isActive: false,
      },
    });
  }

  /**
   * Checks if a competition is currently locked for deployment.
   */
  public async isLocked(competitionId: string): Promise<boolean> {
    const activeLock = await prisma.deploymentLock.findFirst({
      where: {
        competitionId,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    return !!activeLock;
  }
}
