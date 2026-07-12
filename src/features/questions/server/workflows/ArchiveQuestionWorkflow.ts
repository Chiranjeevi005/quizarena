import { TransactionClient } from "@/core/server/transactions/TransactionManager";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";
import { RevisionStatus, QuestionStatus } from "@/features/questions/shared/enums";
import { NotFoundError } from "@/core/server/errors";
import { IEventBus } from "@/core/server/events/DomainEvent";
import { QuestionArchived } from "../events/QuestionEvents";

export class ArchiveQuestionWorkflow {
  constructor(
    private questionRepo: QuestionRepository,
    private revisionRepo: QuestionRevisionRepository,
    private eventBus?: IEventBus
  ) {}

  public async execute(questionId: string, userId: string, tx: TransactionClient): Promise<void> {
    const question = await tx.question.findUnique({
      where: { id: questionId },
      select: { currentRevisionId: true, status: true },
    });

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    if (question.status === QuestionStatus.ARCHIVED) {
      return; // Idempotent
    }

    // Mark question as archived
    await this.questionRepo.archiveQuestion(questionId, tx);

    // If there's an active published revision, mark it archived too
    if (question.currentRevisionId) {
      await this.revisionRepo.updateRevisionStatus(
        question.currentRevisionId,
        RevisionStatus.ARCHIVED as any,
        tx
      );
    }

    // Emit Domain Event
    if (this.eventBus) {
      await this.eventBus.publish(new QuestionArchived(questionId, userId));
    }
  }
}
