import { BulkWorkflowBase } from "./BulkWorkflowBase";
import { OperationResult } from "@/core/server/utils/OperationResult";
import { ArchiveQuestionWorkflow } from "../ArchiveQuestionWorkflow";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";

export class BulkArchiveWorkflow extends BulkWorkflowBase<string> {
  constructor(
    private archiveWorkflow: ArchiveQuestionWorkflow,
    private transactionManager: TransactionManager
  ) {
    super();
  }

  public async execute(questionIds: string[], userId: string): Promise<OperationResult<void>> {
    return this.executeBulk(questionIds, async (questionId) => {
      // Execute each archive in its own transaction so partial success is possible
      await this.transactionManager.execute(async (tx) => {
        await this.archiveWorkflow.execute(questionId, userId, tx);
      });
    });
  }
}
