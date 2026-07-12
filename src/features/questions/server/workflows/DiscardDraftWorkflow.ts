import { TransactionClient } from "@/core/server/transactions/TransactionManager";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";
import { RevisionStatus } from "@/features/questions/shared/enums";
import { NotFoundError, ConflictError } from "@/core/server/errors";

export class DiscardDraftWorkflow {
  constructor(private revisionRepo: QuestionRevisionRepository) {}

  public async execute(questionId: string, tx: TransactionClient): Promise<void> {
    const draft = await this.revisionRepo.getActiveDraft(questionId, tx);

    if (!draft) {
      throw new NotFoundError("No active draft found");
    }

    if (draft.status !== RevisionStatus.DRAFT) {
      throw new ConflictError("Can only discard DRAFT revisions");
    }

    // Hard delete the draft since it was never published and we want to keep the DB clean
    await tx.questionRevision.delete({
      where: { id: draft.id },
    });
  }
}
