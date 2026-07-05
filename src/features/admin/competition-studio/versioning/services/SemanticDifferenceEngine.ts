/**
 * Semantic Difference Engine
 *
 * Compares semantic domains (Metadata, Sections, Questions) between versions
 * and returns structured diffs, replacing raw JSON diffing.
 */

import { CompetitionVersionArtifact } from "../types/artifact.types";

export class SemanticDifferenceEngineService {
  /**
   * Compares two artifacts and returns structured semantic changes.
   */
  compare(
    oldVersion: CompetitionVersionArtifact,
    newVersion: CompetitionVersionArtifact
  ): string[] {
    const changes: string[] = [];

    // Metadata diff
    if (oldVersion.competitionSnapshot.title !== newVersion.competitionSnapshot.title) {
      changes.push(
        `Title changed from "${oldVersion.competitionSnapshot.title}" to "${newVersion.competitionSnapshot.title}"`
      );
    }

    // Configuration diff
    if (oldVersion.rulesSnapshot.strictMode !== newVersion.rulesSnapshot.strictMode) {
      changes.push(
        `Strict mode changed: ${oldVersion.rulesSnapshot.strictMode} -> ${newVersion.rulesSnapshot.strictMode}`
      );
    }

    // Sections diff
    if (oldVersion.sectionsSnapshot.length !== newVersion.sectionsSnapshot.length) {
      changes.push(
        `Section count changed: ${oldVersion.sectionsSnapshot.length} -> ${newVersion.sectionsSnapshot.length}`
      );
    }

    // Questions diff
    if (oldVersion.questionsSnapshot.length !== newVersion.questionsSnapshot.length) {
      changes.push(
        `Question count changed: ${oldVersion.questionsSnapshot.length} -> ${newVersion.questionsSnapshot.length}`
      );
    }

    return changes;
  }
}

export const SemanticDifferenceEngine = new SemanticDifferenceEngineService();
