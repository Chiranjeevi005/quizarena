import { Prisma, Question } from "@/generated/prisma";
import { Specification } from "@/core/server/specifications/Specification";
import {
  QuestionDifficulty,
  QuestionType,
  RevisionStatus,
  QuestionStatus,
} from "@/features/questions/shared/enums";

// STATUS SPECIFICATIONS
export class StatusSpecification extends Specification<Question> {
  constructor(private status: RevisionStatus) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { status: this.status } } };
  }
}

// DIFFICULTY SPECIFICATIONS
export class DifficultySpecification extends Specification<Question> {
  constructor(private difficulty: QuestionDifficulty) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { difficulty: this.difficulty } } };
  }
}

// TAXONOMY SPECIFICATIONS (Nested relations on revisions.chapter)
export class SubjectSpecification extends Specification<Question> {
  constructor(private subject: string) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { chapter: { topic: { subject: { name: this.subject } } } } } };
  }
}

export class TopicSpecification extends Specification<Question> {
  constructor(private topic: string) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { chapter: { topic: { name: this.topic } } } } };
  }
}

// LIFECYCLE & AUTHORING SPECIFICATIONS
export class QuestionStatusSpecification extends Specification<Question> {
  constructor(private status: QuestionStatus) {
    super();
  }
  public isSatisfiedBy(): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { status: this.status as any };
  }
}

export class RevisionStatusSpecification extends Specification<Question> {
  constructor(private status: RevisionStatus) {
    super();
  }
  public isSatisfiedBy(): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { status: this.status as any } } };
  }
}

export class HasDraftSpecification extends Specification<Question> {
  public isSatisfiedBy(): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { status: RevisionStatus.DRAFT as any } } };
  }
}

export class CurrentRevisionOnlySpecification extends Specification<Question> {
  public isSatisfiedBy(): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    // Requires prisma to join against currentRevisionId
    // Simplification for search: we only care about questions that HAVE a current revision
    return { currentRevisionId: { not: null } };
  }
}

export class ChapterSpecification extends Specification<Question> {
  constructor(private chapter: string) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { revisions: { some: { chapter: { name: this.chapter } } } };
  }
}

// KEYWORD SPECIFICATION
export class KeywordSpecification extends Specification<Question> {
  constructor(private keyword: string) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return {
      OR: [
        {
          revisions: {
            some: { statement: { content: { contains: this.keyword, mode: "insensitive" } } },
          },
        },
        {
          revisions: {
            some: { explanation: { content: { contains: this.keyword, mode: "insensitive" } } },
          },
        },
      ],
    };
  }
}

// AUTHOR SPECIFICATION
export class AuthorSpecification extends Specification<Question> {
  constructor(private authorId: string) {
    super();
  }
  public isSatisfiedBy(candidate: Question): boolean {
    return true;
  }
  public toPrismaWhere(): Prisma.QuestionWhereInput {
    return { createdById: this.authorId };
  }
}
