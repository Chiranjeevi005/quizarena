import { QuestionSearchProfile } from "./QuestionSearchProfile";
import {
  QuestionSummaryInclude,
  QuestionEditorInclude,
  QuestionAnalyticsInclude,
} from "../includes/QuestionIncludeProfile";

export enum QuestionSearchMode {
  STANDARD = "STANDARD",
  AUTHORING = "AUTHORING",
  QUIZ_BUILDER = "QUIZ_BUILDER",
  REVIEW = "REVIEW",
  ANALYTICS = "ANALYTICS",
}

export class QuestionSearchModeFactory {
  public static getProfile(mode: QuestionSearchMode): QuestionSearchProfile {
    switch (mode) {
      case QuestionSearchMode.STANDARD:
        return {
          defaultSort: { updatedAt: "desc" },
          allowedIncludes: QuestionSummaryInclude,
          allowedFilters: ["difficulty", "type", "tags", "subject", "topic"],
        };
      case QuestionSearchMode.AUTHORING:
      case QuestionSearchMode.REVIEW:
        return {
          defaultSort: { updatedAt: "desc" },
          allowedIncludes: QuestionEditorInclude,
          allowedFilters: ["difficulty", "type", "tags", "subject", "topic", "status", "authorId"],
        };
      case QuestionSearchMode.QUIZ_BUILDER:
        return {
          defaultSort: { createdAt: "asc" },
          allowedIncludes: QuestionSummaryInclude,
          allowedFilters: ["difficulty", "type", "tags", "subject", "topic", "status"],
        };
      case QuestionSearchMode.ANALYTICS:
        return {
          defaultSort: { createdAt: "desc" },
          allowedIncludes: QuestionAnalyticsInclude,
          allowedFilters: ["difficulty", "type", "tags", "subject", "topic"],
        };
      default:
        return {
          defaultSort: { createdAt: "desc" },
          allowedIncludes: QuestionSummaryInclude,
          allowedFilters: ["difficulty", "type", "tags", "subject", "topic"],
        };
    }
  }
}
