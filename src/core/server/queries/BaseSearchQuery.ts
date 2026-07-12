export interface OffsetPagination {
  page: number;
  limit: number;
}

export interface CursorPagination {
  cursor?: string;
  limit: number;
}

export interface SortQuery {
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface BaseSearchQuery {
  q?: string;
}

export interface PaginatedSearchQuery extends BaseSearchQuery {
  pagination?: OffsetPagination | CursorPagination;
  sort?: SortQuery;
}
