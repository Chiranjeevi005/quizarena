/**
 * The Universal Bulk Engine executes operations over a large dataset strictly following:
 * Planner -> Validator -> Preview -> Executor -> Report
 */

export interface BulkOperationPlan<T> {
  id: string;
  operationName: string;
  items: T[];
}

export interface BulkValidationResult {
  validIds: string[];
  invalidIds: string[];
  errors: Record<string, string>;
}

export interface BulkExecutionReport {
  operationId: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  failures: Record<string, string>;
  completedAt: number;
}

export class UniversalBulkEngine {
  static plan<T>(operationName: string, items: T[]): BulkOperationPlan<T> {
    return {
      id: `bulk-${Date.now()}`,
      operationName,
      items,
    };
  }

  static validate<T>(
    plan: BulkOperationPlan<T>,
    validatorFn: (item: T) => string | null
  ): BulkValidationResult {
    const result: BulkValidationResult = { validIds: [], invalidIds: [], errors: {} };

    plan.items.forEach((item, index) => {
      const id = (item as any).id || `index-${index}`;
      const error = validatorFn(item);
      if (error) {
        result.invalidIds.push(id);
        result.errors[id] = error;
      } else {
        result.validIds.push(id);
      }
    });

    return result;
  }

  static preview(validationResult: BulkValidationResult) {
    console.log(
      `[Bulk Preview] Valid: ${validationResult.validIds.length}, Invalid: ${validationResult.invalidIds.length}`
    );
    return validationResult;
  }

  static async execute<T>(
    plan: BulkOperationPlan<T>,
    validationResult: BulkValidationResult,
    executorFn: (id: string) => Promise<void>
  ): Promise<BulkExecutionReport> {
    const report: BulkExecutionReport = {
      operationId: plan.id,
      totalProcessed: validationResult.validIds.length,
      successCount: 0,
      failureCount: 0,
      failures: {},
      completedAt: 0,
    };

    for (const id of validationResult.validIds) {
      try {
        await executorFn(id);
        report.successCount++;
      } catch (err: any) {
        report.failureCount++;
        report.failures[id] = err.message;
      }
    }

    report.completedAt = Date.now();
    return report;
  }
}
