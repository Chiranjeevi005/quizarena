import { BulkWorkflowBase } from "./BulkWorkflowBase";
import { OperationResult } from "@/core/server/utils/OperationResult";
import { DuplicateQuestionWorkflow } from "../DuplicateQuestionWorkflow";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";

export class BulkDuplicateWorkflow extends BulkWorkflowBase<string> {
  constructor(
    private duplicateWorkflow: DuplicateQuestionWorkflow,
    private transactionManager: TransactionManager
  ) {
    super();
  }

  public async execute(questionIds: string[], userId: string): Promise<OperationResult<void>> {
    return this.executeBulk(questionIds, async (questionId) => {
      await this.transactionManager.execute(async (tx) => {
        await this.duplicateWorkflow.execute(questionId, userId, tx);
      });
    });
  }
}
