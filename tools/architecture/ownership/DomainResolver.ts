import { Domain } from "../config/architecture.types";

export class DomainResolver {
  static resolve(relativePath: string): Domain {
    const p = relativePath.toLowerCase();

    if (p.includes("/auth/") || p.includes("auth.ts")) return Domain.Authentication;
    if (p.includes("competition-studio") || p.includes("studio")) return Domain.CompetitionStudio;
    if (p.includes("competitions")) return Domain.Competitions;
    if (p.includes("submission")) return Domain.Submission;
    if (p.includes("results")) return Domain.Results;
    if (p.includes("leaderboard")) return Domain.Leaderboard;
    if (p.includes("rewards")) return Domain.Rewards;
    if (p.includes("certificates")) return Domain.Certificates;
    if (p.includes("operations")) return Domain.Operations;
    if (p.includes("/shared/") || p.includes("/components/ui/")) return Domain.Shared;
    if (p.includes("/infrastructure/") || p.includes("/lib/") || p.includes("prisma"))
      return Domain.Infrastructure;
    if (p.includes("/runtime/")) return Domain.Runtime;

    if (p.includes("src/app") || p.includes("src/components")) return Domain.Platform;

    return Domain.Unknown;
  }
}
