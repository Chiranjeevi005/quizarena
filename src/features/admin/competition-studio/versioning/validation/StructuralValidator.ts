import { Competition, CompetitionSection, CompetitionQuestion } from "@/generated/prisma";

export class StructuralValidator {
  static validate(
    competition: Competition,
    sections: CompetitionSection[],
    questions: CompetitionQuestion[]
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!sections || sections.length === 0) {
      errors.push("Competition must have at least one section.");
    }

    if (!questions || questions.length === 0) {
      errors.push("Competition must have at least one question.");
    }

    if (competition.totalQuestions !== questions.length) {
      errors.push("Total questions mismatch between metadata and attached questions.");
    }

    // Ensure all sections referenced by questions actually exist
    const sectionIds = new Set(sections.map((s) => s.id));
    for (const q of questions) {
      if (q.sectionId && !sectionIds.has(q.sectionId)) {
        errors.push(`Question ${q.id} references non-existent section ${q.sectionId}.`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
