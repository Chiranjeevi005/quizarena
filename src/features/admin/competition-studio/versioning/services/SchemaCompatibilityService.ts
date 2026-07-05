import { CompetitionVersionArtifact } from "../types/artifact.types";

export class SchemaCompatibilityEngine {
  /**
   * Checks if an older artifact's schema is compatible with the current runtime engine.
   * If not, it applies upcasting rules to adapt the payload.
   */
  async upcastArtifactIfNecessary(
    artifact: CompetitionVersionArtifact
  ): Promise<CompetitionVersionArtifact> {
    const CURRENT_SCHEMA_VERSION = 1;

    if (artifact.schemaVersion === CURRENT_SCHEMA_VERSION) {
      return artifact; // No upcasting required
    }

    // Example upcasting logic for future schema evolution
    if (artifact.schemaVersion < CURRENT_SCHEMA_VERSION) {
      console.warn(
        `Upcasting artifact from schema ${artifact.schemaVersion} to ${CURRENT_SCHEMA_VERSION}`
      );
      // Mutate or return adapted clone
    }

    return artifact;
  }
}

export const SchemaCompatibilityService = new SchemaCompatibilityEngine();
