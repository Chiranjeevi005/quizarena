import { QuestionSearchQuery } from "../query/QuestionSearchQuery";
import { BaseDTO } from "@/core/server/dto/BaseDTO";

export interface SavedSearchDTO extends BaseDTO {
  name: string;
  description?: string;
  query: QuestionSearchQuery;
  ownerId: string;
  isPublic: boolean;
}

export interface SavedSearchPresentation {
  id: string;
  name: string;
  filterSummary: string; // e.g. "Difficulty: Easy, Subject: Math"
  lastExecutedAt?: Date;
}
