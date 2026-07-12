import { Prisma, Question } from "@/generated/prisma";
import { Specification, AndSpecification } from "@/core/server/specifications/Specification";

export class QuestionFilterBuilder {
  public static buildWhereClause(specs: Specification<Question>[]): Prisma.QuestionWhereInput {
    if (specs.length === 0) {
      return {}; // Match all
    }

    // Combine all specs with AND
    let combined: Specification<Question> = specs[0];
    for (let i = 1; i < specs.length; i++) {
      combined = new AndSpecification(combined, specs[i]);
    }

    // Ensure we don't return soft-deleted records by default
    const where = combined.toPrismaWhere();
    return {
      AND: [where, { deletedAt: null }],
    };
  }
}
