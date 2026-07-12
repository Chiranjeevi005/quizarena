import { RequestContext } from "./RequestContext";

export interface BatchContextOptions {
  userId?: string;
  organizationId?: string;
  requestId?: string;
  ip?: string;
  userAgent?: string;
  locale?: string;

  jobId: string;
  importSource?: string;
  operation?: string;
}

export class BatchContext extends RequestContext {
  public readonly jobId: string;
  public readonly importSource?: string;
  public readonly operation: string;
  public readonly startedAt: Date;

  constructor(options: BatchContextOptions) {
    super({
      userId: options.userId,
      organizationId: options.organizationId,
      requestId: options.requestId || options.jobId,
      ip: options.ip,
      userAgent: options.userAgent,
      locale: options.locale,
    });

    this.jobId = options.jobId;
    this.importSource = options.importSource;
    this.operation = options.operation || "UNKNOWN";
    this.startedAt = new Date();
  }
}
