import { prisma } from "@/lib/prisma";
import { CompetitionLifecycle } from "@/generated/prisma";

export class CompetitionDiscoveryService {
  /**
   * Fetch all competitions available to candidates (SCHEDULED, LIVE, COMPLETED)
   */
  async getDiscoverableCompetitions(filters?: {
    category?: string;
    difficulty?: string;
    status?: CompetitionLifecycle;
  }) {
    const whereClause: any = {
      lifecycleState: {
        in: ["SCHEDULED", "LIVE", "COMPLETED"] as CompetitionLifecycle[],
      },
    };

    if (filters?.status) {
      whereClause.lifecycleState = filters.status;
    }

    if (filters?.category) {
      whereClause.config = {
        is: {
          category: filters.category,
        },
      };
    }

    if (filters?.difficulty) {
      whereClause.config = {
        ...whereClause.config,
        is: {
          ...whereClause.config?.is,
          difficulty: filters.difficulty,
        },
      };
    }

    const competitions = await prisma.competition.findMany({
      where: whereClause,
      include: {
        config: true,
        schedule: true,
        economics: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return competitions;
  }
}

export const discoveryService = new CompetitionDiscoveryService();
