/**
 * Integrity Validator
 * 
 * Ensures the structure of the data inside the snapshot has not been corrupted.
 */

import { CompetitionVersionArtifact } from '../types/artifact.types';

export class IntegrityValidatorService {
  /**
   * Validates structural integrity.
   */
  validate(artifact: CompetitionVersionArtifact): string[] {
    const errors: string[] = [];

    if (!artifact.competitionSnapshot) {
      errors.push('Competition Snapshot is missing.');
    }

    if (!artifact.sectionsSnapshot || !Array.isArray(artifact.sectionsSnapshot)) {
      errors.push('Sections Snapshot is missing or corrupted.');
    }

    if (!artifact.questionsSnapshot || !Array.isArray(artifact.questionsSnapshot)) {
      errors.push('Questions Snapshot is missing or corrupted.');
    }

    return errors;
  }
}

export const IntegrityValidator = new IntegrityValidatorService();
