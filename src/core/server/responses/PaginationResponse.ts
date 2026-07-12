export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor?: string; // For cursor-based pagination
}

export class PaginationResponse {
  public static build<T>(
    items: T[],
    totalItems: number,
    page: number,
    limit: number,
    nextCursor?: string
  ) {
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data: items,
      meta: {
        pagination: {
          page,
          limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          nextCursor,
        },
      },
    };
  }
}
