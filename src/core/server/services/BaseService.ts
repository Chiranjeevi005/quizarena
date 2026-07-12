import { ITransactionManager } from "../transactions/TransactionManager";
import { RequestContext } from "../context/RequestContext";
import { BaseError, InternalServerError } from "../errors";

export abstract class BaseService {
  protected readonly transactionManager?: ITransactionManager;

  constructor(transactionManager?: ITransactionManager) {
    this.transactionManager = transactionManager;
  }

  /**
   * Safe execution wrapper that handles unexpected errors and converts them
   * into standardized BaseErrors to ensure API stability.
   */
  protected async executeSafe<T>(
    context: RequestContext,
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      // Future: integrate audit/logging hooks here using context and operationName
      return await operation();
    } catch (error: any) {
      if (error instanceof BaseError) {
        throw error;
      }
      // Wrap unhandled exceptions
      throw new InternalServerError(
        `Unexpected error during ${operationName}`,
        error?.message || error
      );
    }
  }
}
