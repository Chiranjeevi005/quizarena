import { QuestionResponseDTO } from "../../dto";
import { PaginationMeta } from "@/core/server/responses/PaginationResponse";
import { QuestionFilterQuery } from "../query/QuestionFilterQuery";
import { SortQuery } from "@/core/server/queries/BaseSearchQuery";

export interface SearchSummary {
  totalFound: number;
}

export interface QuestionSearchResultDTO {
  results: QuestionResponseDTO[];
  pagination: PaginationMeta;
  filters: QuestionFilterQuery;
  sorting: SortQuery;
  statistics: SearchSummary;
}
