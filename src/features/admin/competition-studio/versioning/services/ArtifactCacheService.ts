import { CompetitionVersionArtifact } from "../types/artifact.types";

export class ArtifactCacheEngine {
  // In a production environment, this would interface with Redis or Memcached
  private cache = new Map<string, { artifact: CompetitionVersionArtifact; expiresAt: number }>();

  async getCachedArtifact(competitionId: string): Promise<CompetitionVersionArtifact | null> {
    const entry = this.cache.get(competitionId);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(competitionId);
      return null;
    }

    return entry.artifact;
  }

  async setCachedArtifact(
    competitionId: string,
    artifact: CompetitionVersionArtifact,
    ttlSeconds: number = 3600
  ): Promise<void> {
    this.cache.set(competitionId, {
      artifact,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async invalidateCache(competitionId: string): Promise<void> {
    this.cache.delete(competitionId);
  }
}

export const ArtifactCacheService = new ArtifactCacheEngine();
