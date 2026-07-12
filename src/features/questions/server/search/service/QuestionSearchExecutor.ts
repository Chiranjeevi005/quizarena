import { Prisma } from "@/generated/prisma";
import { QuestionRepository } from "../../repositories/QuestionRepository";
import { QuestionSearchResultDTO } from "../dto/QuestionSearchResultDTO";
import { QuestionSearchQuery } from "../query/QuestionSearchQuery";
import { PaginationResponse } from "@/core/server/responses/PaginationResponse";
import { QuestionMapper } from "../../mappers/QuestionMapper";

export class QuestionSearchExecutor {
  private repo: QuestionRepository;

  constructor(repo: QuestionRepository) {
    this.repo = repo;
  }

  public async executeOffsetSearch(
    where: Prisma.QuestionWhereInput,
    orderBy: Prisma.QuestionOrderByWithRelationInput,
    include: Prisma.QuestionInclude,
    query: QuestionSearchQuery
  ): Promise<QuestionSearchResultDTO> {
    const page = query.pagination && "page" in query.pagination ? query.pagination.page : 1;
    const limit = query.pagination?.limit || 20;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      this.repo.searchOffset(where, orderBy, include, skip, limit),
      this.repo.count(where),
    ]);

    const dtos = items.map((item) => QuestionMapper.toQuestionDTO(item as any));
    const paginatedResponse = PaginationResponse.build(dtos, totalItems, page, limit);

    return {
      results: paginatedResponse.data,
      pagination: paginatedResponse.meta.pagination,
      filters: query.filters || {},
      sorting: query.sort || { sortBy: "createdAt", sortOrder: "desc" },
      statistics: {
        totalFound: totalItems,
      },
    };
  }

  public async executeCursorSearch(
    where: Prisma.QuestionWhereInput,
    orderBy: Prisma.QuestionOrderByWithRelationInput,
    include: Prisma.QuestionInclude,
    query: QuestionSearchQuery
  ): Promise<QuestionSearchResultDTO> {
    const cursor =
      query.pagination && "cursor" in query.pagination ? query.pagination.cursor : undefined;
    const limit = query.pagination?.limit || 20;

    const [items, totalItems] = await Promise.all([
      this.repo.searchCursor(where, orderBy, include, cursor, limit),
      this.repo.count(where),
    ]);

    let nextCursor: string | undefined = undefined;
    if (items.length > 0) {
      nextCursor = items[items.length - 1].id;
    }

    const dtos = items.map((item) => QuestionMapper.toQuestionDTO(item as any));
    const paginatedResponse = PaginationResponse.build(dtos, totalItems, 1, limit, nextCursor);

    return {
      results: paginatedResponse.data,
      pagination: paginatedResponse.meta.pagination,
      filters: query.filters || {},
      sorting: query.sort || { sortBy: "createdAt", sortOrder: "desc" },
      statistics: {
        totalFound: totalItems,
      },
    };
  }
}
