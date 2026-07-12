import { BatchContext } from "../context/BatchContext";
import { OperationResult } from "../utils/OperationResult";

export interface IPipeline<TInput, TOutput> {
  execute(input: TInput, context: BatchContext): Promise<OperationResult<TOutput>>;
}

export abstract class BasePipeline<TInput, TOutput> implements IPipeline<TInput, TOutput> {
  public abstract execute(input: TInput, context: BatchContext): Promise<OperationResult<TOutput>>;
}
