import { PrismaClient, Prisma, Question } from "@/generated/prisma";
import { BaseRepository } from "@/core/server/repositories/BaseRepository";
import { TransactionClient } from "@/core/server/transactions/TransactionManager";

export class QuestionRepository extends BaseRepository {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  // CORE CRUD

  public async createQuestion(data: Prisma.QuestionUncheckedCreateInput, tx?: TransactionClient) {
    return this.getClient(tx).question.create({ data });
  }

  public async updateActiveRevision(
    questionId: string,
    revisionId: string,
    tx?: TransactionClient
  ) {
    return this.getClient(tx).question.update({
      where: { id: questionId },
      data: { currentRevisionId: revisionId },
    });
  }

  public async updateQuestionStatus(
    questionId: string,
    status: any, // QuestionStatus
    tx?: TransactionClient
  ) {
    return this.getClient(tx).question.update({
      where: { id: questionId },
      data: { status },
    });
  }

  public async archiveQuestion(questionId: string, tx?: TransactionClient) {
    return this.getClient(tx).question.update({
      where: { id: questionId },
      data: { status: "ARCHIVED" as any },
    });
  }

  public async restoreQuestion(questionId: string, tx?: TransactionClient) {
    return this.getClient(tx).question.update({
      where: { id: questionId },
      data: { status: "ACTIVE" as any },
    });
  }

  public async softDeleteQuestion(questionId: string, tx?: TransactionClient) {
    return this.getClient(tx).question.update({
      where: { id: questionId },
      data: { deletedAt: new Date() },
    });
  }

  // BULK OPERATIONS

  public async findManyByIds(ids: string[], tx?: TransactionClient) {
    return this.getClient(tx).question.findMany({
      where: { id: { in: ids } },
    });
  }

  public async existsMany(ids: string[], tx?: TransactionClient): Promise<boolean> {
    const count = await this.countMany(ids, tx);
    return count === ids.length;
  }

  public async countMany(ids: string[], tx?: TransactionClient): Promise<number> {
    return this.getClient(tx).question.count({
      where: { id: { in: ids } },
    });
  }

  // SEARCH OPERATIONS

  public async searchOffset(
    where: Prisma.QuestionWhereInput,
    orderBy: Prisma.QuestionOrderByWithRelationInput,
    include: Prisma.QuestionInclude,
    skip: number,
    take: number,
    tx?: TransactionClient
  ) {
    return this.getClient(tx).question.findMany({
      where,
      orderBy,
      include,
      skip,
      take,
    });
  }

  public async searchCursor(
    where: Prisma.QuestionWhereInput,
    orderBy: Prisma.QuestionOrderByWithRelationInput,
    include: Prisma.QuestionInclude,
    cursorId: string | undefined,
    take: number,
    tx?: TransactionClient
  ) {
    return this.getClient(tx).question.findMany({
      where,
      orderBy,
      include,
      take,
      ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
    });
  }

  public async count(where: Prisma.QuestionWhereInput, tx?: TransactionClient): Promise<number> {
    return this.getClient(tx).question.count({ where });
  }
}
