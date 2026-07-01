import { prisma } from '@/lib/prisma';
import { VersionBuildAudit } from '@/generated/prisma';

export class VersionAuditEngine {
  /**
   * Retrieves the detailed build audits for a specific competition version.
   */
  async getAuditsForVersion(versionId: string): Promise<VersionBuildAudit[]> {
    return prisma.versionBuildAudit.findMany({
      where: { competitionVersionId: versionId },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Logs an execution trace during a version build.
   */
  createExecutionTrace(stage: string, message: string, durationMs?: number): any {
    return {
      timestamp: new Date().toISOString(),
      stage,
      message,
      durationMs
    };
  }
}

export const VersionAuditService = new VersionAuditEngine();
