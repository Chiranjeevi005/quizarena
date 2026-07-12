import { DomainEvent } from "../events/DomainEvent";

export class OperationResult<T = void> {
  public readonly success: boolean;
  public readonly partialSuccess: boolean;
  public readonly failed: boolean;

  public readonly data?: T;
  public readonly warnings: string[];
  public readonly errors: string[];

  public readonly durationMs: number;
  public readonly affectedItems: number;
  public readonly skippedItems: number;

  public readonly events: DomainEvent[];
  public readonly auditEntries: any[];
  public readonly statistics: Record<string, number | string>;

  private constructor(options: {
    success: boolean;
    partialSuccess: boolean;
    failed: boolean;
    data?: T;
    warnings?: string[];
    errors?: string[];
    durationMs?: number;
    affectedItems?: number;
    skippedItems?: number;
    events?: DomainEvent[];
    auditEntries?: any[];
    statistics?: Record<string, number | string>;
  }) {
    this.success = options.success;
    this.partialSuccess = options.partialSuccess;
    this.failed = options.failed;
    this.data = options.data;
    this.warnings = options.warnings || [];
    this.errors = options.errors || [];
    this.durationMs = options.durationMs || 0;
    this.affectedItems = options.affectedItems || 0;
    this.skippedItems = options.skippedItems || 0;
    this.events = options.events || [];
    this.auditEntries = options.auditEntries || [];
    this.statistics = options.statistics || {};
  }

  public static ok<T>(
    data?: T,
    options?: Partial<Omit<OperationResult<T>, "success" | "partialSuccess" | "failed" | "data">>
  ): OperationResult<T> {
    return new OperationResult<T>({
      success: true,
      partialSuccess: false,
      failed: false,
      data,
      ...options,
    });
  }

  public static partial<T>(
    data?: T,
    options?: Partial<Omit<OperationResult<T>, "success" | "partialSuccess" | "failed" | "data">>
  ): OperationResult<T> {
    return new OperationResult<T>({
      success: false,
      partialSuccess: true,
      failed: false,
      data,
      ...options,
    });
  }

  public static fail<T>(
    error: string,
    options?: Partial<Omit<OperationResult<T>, "success" | "partialSuccess" | "failed" | "data">>
  ): OperationResult<T> {
    const defaultErrors = options?.errors ? options.errors : [error];
    if (options?.errors && error && !options.errors.includes(error)) {
      defaultErrors.unshift(error);
    }
    return new OperationResult<T>({
      success: false,
      partialSuccess: false,
      failed: true,
      ...options,
      errors: defaultErrors,
    });
  }
}
