import { CompetitionSnapshotDTO } from '../types/version.types';

export class IntegrityEngine {
  static validate(snapshot: CompetitionSnapshotDTO): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic required properties
    if (!snapshot.metadata.title) errors.push('Title is missing');
    if (!snapshot.metadata.slug) errors.push('Slug is missing');

    // Section integrity
    const sectionIds = new Set(snapshot.sections.map(s => s.id));
    if (snapshot.sections.length !== sectionIds.size) {
      errors.push('Duplicate section IDs detected');
    }

    // Question integrity
    const questionIds = new Set(snapshot.questions.map(q => q.id));
    if (snapshot.questions.length !== questionIds.size) {
      errors.push('Duplicate question IDs detected');
    }

    // Reference integrity (questions -> sections)
    snapshot.questions.forEach(q => {
      if (q.sectionId && !sectionIds.has(q.sectionId)) {
        errors.push(`Question ${q.id} references non-existent section ${q.sectionId}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
