import { PrismaClient, Prisma } from "@/generated/prisma";
import { BaseRepository } from "@/core/server/repositories/BaseRepository";
import { TransactionClient } from "@/core/server/transactions/TransactionManager";
import { RevisionStatus } from "@/features/questions/shared/enums";

export class QuestionRevisionRepository extends BaseRepository {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  public async createRevision(
    data: Prisma.QuestionRevisionUncheckedCreateInput,
    tx?: TransactionClient
  ) {
    return this.getClient(tx).questionRevision.create({
      data,
    });
  }

  public async getLatestRevisionNumber(
    questionId: string,
    tx?: TransactionClient
  ): Promise<number> {
    const latest = await this.getClient(tx).questionRevision.findFirst({
      where: { questionId },
      orderBy: { revisionNumber: "desc" },
      select: { revisionNumber: true },
    });
    return latest?.revisionNumber || 0;
  }

  public async updateRevisionStatus(
    revisionId: string,
    status: RevisionStatus,
    tx?: TransactionClient
  ) {
    return this.getClient(tx).questionRevision.update({
      where: { id: revisionId },
      data: { status: status as any },
    });
  }

  public async getActiveDraft(questionId: string, tx?: TransactionClient) {
    return this.getClient(tx).questionRevision.findFirst({
      where: {
        questionId,
        status: RevisionStatus.DRAFT,
      },
      include: {
        statement: true,
        explanation: true,
        options: true,
        chapter: true,
      },
    });
  }

  public async getRevision(revisionId: string, tx?: TransactionClient) {
    return this.getClient(tx).questionRevision.findUnique({
      where: { id: revisionId },
      include: {
        statement: true,
        explanation: true,
        options: true,
        chapter: true,
      },
    });
  }
}
