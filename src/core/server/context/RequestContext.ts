export interface RequestContextOptions {
  userId?: string;
  organizationId?: string;
  requestId: string;
  ip?: string;
  userAgent?: string;
  locale?: string;
}

export class RequestContext {
  public readonly userId?: string;
  public readonly organizationId?: string;
  public readonly requestId: string;
  public readonly ip?: string;
  public readonly userAgent?: string;
  public readonly locale?: string;
  public readonly timestamp: Date;

  constructor(options: RequestContextOptions) {
    this.userId = options.userId;
    this.organizationId = options.organizationId;
    this.requestId = options.requestId;
    this.ip = options.ip;
    this.userAgent = options.userAgent;
    this.locale = options.locale || "en";
    this.timestamp = new Date();
  }
}
