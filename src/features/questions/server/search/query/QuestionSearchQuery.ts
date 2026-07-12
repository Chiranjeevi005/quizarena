import {
  BaseSearchQuery,
  PaginatedSearchQuery,
  SortQuery,
} from "@/core/server/queries/BaseSearchQuery";
import { QuestionFilterQuery } from "./QuestionFilterQuery";

export interface QuestionSearchQuery extends PaginatedSearchQuery {
  filters?: QuestionFilterQuery;
}
