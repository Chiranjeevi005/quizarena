import { DependencyValidator } from "../validation/DependencyValidator";
import { VersionManifestDTO, VersionCompatibilityDTO } from "../types/artifact.types";
import { CompetitionSnapshotDTO } from "../types/version.types";

export class CompatibilityEngine {
  static evaluate(
    manifest: VersionManifestDTO,
    snapshot: CompetitionSnapshotDTO
  ): VersionCompatibilityDTO[] {
    const compatibilities: VersionCompatibilityDTO[] = [];

    // Runtime Compatibility
    compatibilities.push({
      system: "RUNTIME",
      status: "COMPATIBLE",
      details: { version: manifest.schemaVersion },
    });

    // Submission Compatibility
    compatibilities.push({
      system: "SUBMISSION",
      status: "COMPATIBLE",
    });

    // Leaderboard Compatibility
    compatibilities.push({
      system: "LEADERBOARD",
      status: snapshot.config.economics ? "COMPATIBLE" : "PARTIALLY_COMPATIBLE",
      details: { missingEconomics: !snapshot.config.economics },
    });

    // Rewards Compatibility
    compatibilities.push({
      system: "REWARDS",
      status: snapshot.config.economics ? "COMPATIBLE" : "BLOCKED",
      details: { missingEconomics: !snapshot.config.economics },
    });

    // Certificates Compatibility
    compatibilities.push({
      system: "CERTIFICATES",
      status: "COMPATIBLE",
    });

    // Analytics Compatibility
    compatibilities.push({
      system: "ANALYTICS",
      status: "COMPATIBLE",
    });

    // Lifecycle Compatibility
    compatibilities.push({
      system: "LIFECYCLE",
      status: "COMPATIBLE",
    });

    return compatibilities;
  }
}
