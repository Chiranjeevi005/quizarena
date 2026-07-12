import { BaseService } from "@/core/server/services/BaseService";
import { RequestContext } from "@/core/server/context/RequestContext";
import { Result } from "@/core/server/utils/Result";
import { QuestionSearchQuery } from "../query/QuestionSearchQuery";
import { QuestionSearchResultDTO } from "../dto/QuestionSearchResultDTO";
import { QuestionSearchMode, QuestionSearchModeFactory } from "../profiles/QuestionSearchMode";
import { QuestionSpecificationFactory } from "./QuestionSpecificationFactory";
import { KeywordSpecification } from "../specifications/QuestionSpecifications";
import { QuestionFilterBuilder } from "./QuestionFilterBuilder";
import { QuestionSearchExecutor } from "./QuestionSearchExecutor";
import { QuestionRepository } from "../../repositories/QuestionRepository";
import { PrismaClient, Prisma } from "@/generated/prisma";
import { QuestionSortSpecification } from "../sorting/QuestionSortSpecification";

export class QuestionSearchService extends BaseService {
  private executor: QuestionSearchExecutor;

  constructor(prisma: PrismaClient) {
    super(); // No transaction manager needed for pure search right now
    this.executor = new QuestionSearchExecutor(new QuestionRepository(prisma));
  }

  public async search(
    context: RequestContext,
    query: QuestionSearchQuery,
    mode: QuestionSearchMode = QuestionSearchMode.STANDARD
  ): Promise<Result<QuestionSearchResultDTO>> {
    return this.executeSafe(context, "QuestionSearch", async () => {
      // 1. Resolve Profile
      const profile = QuestionSearchModeFactory.getProfile(mode);

      // 2. Build Specifications
      const specs = [];
      if (query.q) {
        specs.push(new KeywordSpecification(query.q));
      }
      if (query.filters) {
        const filterSpecs = QuestionSpecificationFactory.createFromFilters(query.filters);
        specs.push(...filterSpecs);
      }

      // 3. Build Prisma Where Clause
      const whereClause = QuestionFilterBuilder.buildWhereClause(specs);

      // 4. Resolve Sorting
      let orderBy = profile.defaultSort;
      if (query.sort) {
        // Map SortQuery to Prisma Sorting
        orderBy = {
          [query.sort.sortBy]: query.sort.sortOrder,
        } as Prisma.QuestionOrderByWithRelationInput;
      }

      // 5. Execute via appropriate pagination engine
      let result: QuestionSearchResultDTO;
      if (query.pagination && "cursor" in query.pagination) {
        result = await this.executor.executeCursorSearch(
          whereClause,
          orderBy,
          profile.allowedIncludes,
          query
        );
      } else {
        result = await this.executor.executeOffsetSearch(
          whereClause,
          orderBy,
          profile.allowedIncludes,
          query
        );
      }

      return Result.ok(result);
    });
  }
}
