import { BaseService } from "@/core/server/services/BaseService";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";
import { IEventBus } from "@/core/server/events/DomainEvent";

// Workflows
import { CreateDraftWorkflow } from "../workflows/CreateDraftWorkflow";
import { PublishQuestionWorkflow } from "../workflows/PublishQuestionWorkflow";
import { ArchiveQuestionWorkflow } from "../workflows/ArchiveQuestionWorkflow";
import { RestoreQuestionWorkflow } from "../workflows/RestoreQuestionWorkflow";
import { DiscardDraftWorkflow } from "../workflows/DiscardDraftWorkflow";
import { DuplicateQuestionWorkflow } from "../workflows/DuplicateQuestionWorkflow";
import { Result } from "@/core/server/utils/Result";

export class QuestionAuthoringService extends BaseService {
  private createDraftWorkflow: CreateDraftWorkflow;
  private publishWorkflow: PublishQuestionWorkflow;
  private archiveWorkflow: ArchiveQuestionWorkflow;
  private restoreWorkflow: RestoreQuestionWorkflow;
  private discardWorkflow: DiscardDraftWorkflow;
  private duplicateWorkflow: DuplicateQuestionWorkflow;

  constructor(
    transactionManager: TransactionManager,
    questionRepo: QuestionRepository,
    revisionRepo: QuestionRevisionRepository,
    eventBus?: IEventBus
  ) {
    super(transactionManager);
    this.createDraftWorkflow = new CreateDraftWorkflow(questionRepo, revisionRepo, eventBus);
    this.publishWorkflow = new PublishQuestionWorkflow(questionRepo, revisionRepo, eventBus);
    this.archiveWorkflow = new ArchiveQuestionWorkflow(questionRepo, revisionRepo, eventBus);
    this.restoreWorkflow = new RestoreQuestionWorkflow(questionRepo, revisionRepo, eventBus);
    this.discardWorkflow = new DiscardDraftWorkflow(revisionRepo);
    this.duplicateWorkflow = new DuplicateQuestionWorkflow(questionRepo, revisionRepo, eventBus);
  }

  public async createDraft(questionId: string, userId: string): Promise<Result<string>> {
    return this.transactionManager!.execute(async (tx) => {
      const draftId = await this.createDraftWorkflow.execute(questionId, userId, tx);
      return Result.ok(draftId);
    });
  }

  public async publishDraft(
    questionId: string,
    draftId: string,
    userId: string,
    reason: string
  ): Promise<Result<void>> {
    return this.transactionManager!.execute(async (tx) => {
      await this.publishWorkflow.execute(questionId, draftId, userId, reason, tx);
      return Result.ok(undefined);
    });
  }

  public async archiveQuestion(questionId: string, userId: string): Promise<Result<void>> {
    return this.transactionManager!.execute(async (tx) => {
      await this.archiveWorkflow.execute(questionId, userId, tx);
      return Result.ok(undefined);
    });
  }

  public async restoreQuestion(questionId: string, userId: string): Promise<Result<void>> {
    return this.transactionManager!.execute(async (tx) => {
      await this.restoreWorkflow.execute(questionId, userId, tx);
      return Result.ok(undefined);
    });
  }

  public async discardDraft(questionId: string): Promise<Result<void>> {
    return this.transactionManager!.execute(async (tx) => {
      await this.discardWorkflow.execute(questionId, tx);
      return Result.ok(undefined);
    });
  }

  public async duplicateQuestion(
    originalQuestionId: string,
    userId: string
  ): Promise<Result<string>> {
    return this.transactionManager!.execute(async (tx) => {
      const newId = await this.duplicateWorkflow.execute(originalQuestionId, userId, tx);
      return Result.ok(newId);
    });
  }
}
