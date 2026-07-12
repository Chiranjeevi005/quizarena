import { QuestionFilterQuery } from "../query/QuestionFilterQuery";
import { Question } from "@/generated/prisma";
import {
  Specification,
  AndSpecification,
  OrSpecification,
} from "@/core/server/specifications/Specification";
import {
  StatusSpecification,
  DifficultySpecification,
  SubjectSpecification,
  TopicSpecification,
  ChapterSpecification,
  AuthorSpecification,
} from "../specifications/QuestionSpecifications";

export class QuestionSpecificationFactory {
  public static createFromFilters(filters: QuestionFilterQuery): Specification<Question>[] {
    const specs: Specification<Question>[] = [];

    if (filters.status?.status) {
      specs.push(new StatusSpecification(filters.status.status));
    }

    if (filters.metadata?.difficulty) {
      specs.push(new DifficultySpecification(filters.metadata.difficulty));
    }

    if (filters.classification?.subject) {
      specs.push(new SubjectSpecification(filters.classification.subject));
    }
    if (filters.classification?.topic) {
      specs.push(new TopicSpecification(filters.classification.topic));
    }
    if (filters.classification?.chapter) {
      specs.push(new ChapterSpecification(filters.classification.chapter));
    }

    if (filters.author?.authorId) {
      specs.push(new AuthorSpecification(filters.author.authorId));
    }

    return specs;
  }
}
