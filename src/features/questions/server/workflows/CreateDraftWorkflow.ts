import { TransactionClient } from "@/core/server/transactions/TransactionManager";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";
import { RevisionStatus, QuestionSourceType } from "@/features/questions/shared/enums";
import { ConflictError } from "@/core/server/errors";
import { IEventBus } from "@/core/server/events/DomainEvent";
import { QuestionDraftCreated } from "../events/QuestionEvents";

export class CreateDraftWorkflow {
  constructor(
    private questionRepo: QuestionRepository,
    private revisionRepo: QuestionRevisionRepository,
    private eventBus?: IEventBus
  ) {}

  public async execute(questionId: string, userId: string, tx: TransactionClient): Promise<string> {
    // 1. Ensure no active draft exists
    const existingDraft = await this.revisionRepo.getActiveDraft(questionId, tx);
    if (existingDraft) {
      throw new ConflictError("A draft already exists for this question");
    }

    // 2. Fetch the current published revision to copy its data
    const question = await tx.question.findUnique({
      where: { id: questionId },
      select: { currentRevisionId: true, organizationId: true },
    });

    if (!question || !question.currentRevisionId) {
      throw new ConflictError("Cannot create a draft without a published base revision");
    }

    const baseRevision = await this.revisionRepo.getRevision(question.currentRevisionId, tx);
    if (!baseRevision) {
      throw new ConflictError("Base revision not found");
    }

    // 3. Determine next revision number
    const latestNum = await this.revisionRepo.getLatestRevisionNumber(questionId, tx);

    // 4. Create the draft revision (copying data from base)
    const draft = await this.revisionRepo.createRevision(
      {
        questionId,
        organizationId: question.organizationId,
        revisionNumber: latestNum + 1,
        status: RevisionStatus.DRAFT,
        sourceType: QuestionSourceType.MANUAL,
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

    // 5. Emit Domain Event
    if (this.eventBus) {
      await this.eventBus.publish(new QuestionDraftCreated(questionId, draft.id, userId));
    }

    return draft.id;
  }
}
