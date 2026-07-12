import { BulkWorkflowBase } from "./BulkWorkflowBase";
import { OperationResult } from "@/core/server/utils/OperationResult";
import { PublishQuestionWorkflow } from "../PublishQuestionWorkflow";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";

export class BulkPublishWorkflow extends BulkWorkflowBase<{ questionId: string; draftId: string }> {
  constructor(
    private publishWorkflow: PublishQuestionWorkflow,
    private transactionManager: TransactionManager
  ) {
    super();
  }

  public async execute(
    items: { questionId: string; draftId: string }[],
    userId: string,
    reason: string
  ): Promise<OperationResult<void>> {
    return this.executeBulk(items, async (item) => {
      await this.transactionManager.execute(async (tx) => {
        await this.publishWorkflow.execute(item.questionId, item.draftId, userId, reason, tx);
      });
    });
  }
}
