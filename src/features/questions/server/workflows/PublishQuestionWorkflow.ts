import { TransactionClient } from "@/core/server/transactions/TransactionManager";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";
import { RevisionStatus, QuestionStatus } from "@/features/questions/shared/enums";
import { NotFoundError, ConflictError } from "@/core/server/errors";
import { DomainEvent, IEventBus } from "@/core/server/events/DomainEvent";
import { QuestionPublished } from "../events/QuestionEvents";

export class PublishQuestionWorkflow {
  constructor(
    private questionRepo: QuestionRepository,
    private revisionRepo: QuestionRevisionRepository,
    private eventBus?: IEventBus
  ) {}

  public async execute(
    questionId: string,
    draftRevisionId: string,
    userId: string,
    reason: string,
    tx: TransactionClient
  ): Promise<void> {
    // 1. Validate Question & Draft
    const draft = await this.revisionRepo.getRevision(draftRevisionId, tx);
    if (!draft || draft.questionId !== questionId) {
      throw new NotFoundError("Draft revision not found");
    }
    if (draft.status !== RevisionStatus.DRAFT && draft.status !== RevisionStatus.READY) {
      throw new ConflictError("Only DRAFT or READY revisions can be published");
    }

    // 2. Fetch current published revision to supersede
    const question = await tx.question.findUnique({
      where: { id: questionId },
      select: { currentRevisionId: true, status: true },
    });

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    if (question.status === QuestionStatus.ARCHIVED || question.status === QuestionStatus.DELETED) {
      throw new ConflictError("Cannot publish a revision for an archived or deleted question");
    }

    const previousRevisionId = question.currentRevisionId;

    // 3. Mark old revision as SUPERSEDED
    if (previousRevisionId) {
      await this.revisionRepo.updateRevisionStatus(
        previousRevisionId,
        RevisionStatus.SUPERSEDED as any,
        tx
      );
    }

    // 4. Mark new revision as PUBLISHED and set metadata
    await tx.questionRevision.update({
      where: { id: draftRevisionId },
      data: {
        status: RevisionStatus.PUBLISHED,
        publishedAt: new Date(),
        publishedById: userId,
        revisionReason: reason,
      },
    });

    // 5. Update Question pointer
    await this.questionRepo.updateActiveRevision(questionId, draftRevisionId, tx);

    // 6. Emit Domain Event
    if (this.eventBus) {
      await this.eventBus.publish(new QuestionPublished(questionId, draftRevisionId, userId));
    }
  }
}
