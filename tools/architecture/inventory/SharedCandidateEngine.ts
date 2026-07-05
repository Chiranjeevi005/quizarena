import { FileRecord, Layer, Domain } from "../config/architecture.types";

export interface SharedCandidate {
  path: string;
  suggestedLayer: string;
  migrationPriority: "HIGH" | "MEDIUM" | "LOW";
  reason: string;
}

export class SharedCandidateEngine {
  static evaluate(records: FileRecord[]): SharedCandidate[] {
    const candidates: SharedCandidate[] = [];

    for (const record of records) {
      if (record.ownership?.domain === Domain.Shared) continue; // Already shared

      // Check if it's heavily imported by multiple domains
      if (record.dependencies && record.dependencies.reverseDependencyCount > 3) {
        candidates.push({
          path: record.metadata.relativePath,
          suggestedLayer: `Shared ${record.ownership?.layer || "Utility"}`,
          migrationPriority: "HIGH",
          reason: `Imported by ${record.dependencies.reverseDependencyCount} modules across domains`,
        });
      }
    }

    return candidates;
  }
}
