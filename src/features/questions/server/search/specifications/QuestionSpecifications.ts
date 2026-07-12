import { Prisma, Question } from "@/generated/prisma";
import { Specification } from "@/core/server/specifications/Specification";
import {
  QuestionDifficulty,
  QuestionType,
  RevisionStatus,
} from "@/features/questions/shared/enums/QuestionEnums";

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
