import { OperationResult } from "@/core/server/utils/OperationResult";

export abstract class BulkWorkflowBase<TItem> {
  protected async executeBulk(
    items: TItem[],
    action: (item: TItem) => Promise<void>
  ): Promise<OperationResult<void>> {
    const startTime = Date.now();
    let successCount = 0;
    let failedCount = 0;
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const item of items) {
      try {
        await action(item);
        successCount++;
      } catch (error: any) {
        failedCount++;
        errors.push(`Failed for item ${JSON.stringify(item)}: ${error?.message || error}`);
      }
    }

    const durationMs = Date.now() - startTime;

    if (failedCount === 0) {
      return OperationResult.ok(undefined, {
        affectedItems: successCount,
        durationMs,
        warnings,
      });
    } else if (successCount > 0) {
      return OperationResult.partial(undefined, {
        affectedItems: successCount,
        durationMs,
        warnings,
        errors,
        statistics: { failedItems: failedCount },
      });
    } else {
      return OperationResult.fail("All items failed", {
        affectedItems: 0,
        durationMs,
        warnings,
        errors,
      });
    }
  }
}
