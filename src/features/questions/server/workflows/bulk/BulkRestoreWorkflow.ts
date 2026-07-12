import { BulkWorkflowBase } from "./BulkWorkflowBase";
import { OperationResult } from "@/core/server/utils/OperationResult";
import { RestoreQuestionWorkflow } from "../RestoreQuestionWorkflow";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";

export class BulkRestoreWorkflow extends BulkWorkflowBase<string> {
  constructor(
    private restoreWorkflow: RestoreQuestionWorkflow,
    private transactionManager: TransactionManager
  ) {
    super();
  }

  public async execute(questionIds: string[], userId: string): Promise<OperationResult<void>> {
    return this.executeBulk(questionIds, async (questionId) => {
      await this.transactionManager.execute(async (tx) => {
        await this.restoreWorkflow.execute(questionId, userId, tx);
      });
    });
  }
}
