import { TransactionClient } from "@/core/server/transactions/TransactionManager";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";
import {
  RevisionStatus,
  QuestionSourceType,
  QuestionStatus,
} from "@/features/questions/shared/enums";
import { NotFoundError } from "@/core/server/errors";
import { IEventBus } from "@/core/server/events/DomainEvent";
import { QuestionDuplicated } from "../events/QuestionEvents";

export class DuplicateQuestionWorkflow {
  constructor(
    private questionRepo: QuestionRepository,
    private revisionRepo: QuestionRevisionRepository,
    private eventBus?: IEventBus
  ) {}

  public async execute(
    originalQuestionId: string,
    userId: string,
    tx: TransactionClient
  ): Promise<string> {
    // 1. Fetch original question and its active revision
    const originalQuestion = await tx.question.findUnique({
      where: { id: originalQuestionId },
      select: { currentRevisionId: true, bankId: true, organizationId: true, type: true },
    });

    if (!originalQuestion || !originalQuestion.currentRevisionId) {
      throw new NotFoundError("Original published question not found");
    }

    const baseRevision = await this.revisionRepo.getRevision(
      originalQuestion.currentRevisionId,
      tx
    );
    if (!baseRevision) {
      throw new NotFoundError("Base revision not found");
    }

    // 2. Create New Question Aggregate Root
    const newQuestion = await this.questionRepo.createQuestion(
      {
        bankId: originalQuestion.bankId,
        organizationId: originalQuestion.organizationId,
        type: originalQuestion.type,
        createdById: userId,
        status: QuestionStatus.ACTIVE as any,
      },
      tx
    );

    // 3. Create Draft Revision for new Question (copied from base)
    const draft = await this.revisionRepo.createRevision(
      {
        questionId: newQuestion.id,
        organizationId: newQuestion.organizationId,
        revisionNumber: 1,
        status: RevisionStatus.DRAFT,
        sourceType: QuestionSourceType.DUPLICATE as any,
        difficulty: baseRevision.difficulty,
        language: baseRevision.language,
        chapterId: baseRevision.chapterId,
        statement: baseRevision.statement
          ? { create: { content: baseRevision.statement.content } }
          : undefined,
        explanation: baseRevision.explanation
          ? { create: { content: baseRevision.explanation.content } }
          : undefined,
        options: {
          create: baseRevision.options.map((o: any) => ({
            content: o.content,
            isCorrect: o.isCorrect,
            displayOrder: o.displayOrder,
          })),
        },
      },
      tx
    );

    // 4. Emit Domain Event
    if (this.eventBus) {
      await this.eventBus.publish(
        new QuestionDuplicated(originalQuestionId, newQuestion.id, userId)
      );
    }

    return newQuestion.id;
  }
}
