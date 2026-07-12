import { DomainEvent } from "@/core/server/events/DomainEvent";

export class QuestionEvent implements DomainEvent {
  public occurredOn: Date = new Date();
  constructor(
    public eventName: string,
    public aggregateId: string,
    public payload: any
  ) {}
}

export class QuestionDraftCreated extends QuestionEvent {
  constructor(questionId: string, revisionId: string, userId: string) {
    super("QuestionDraftCreated", questionId, { revisionId, userId });
  }
}

export class QuestionDraftUpdated extends QuestionEvent {
  constructor(questionId: string, revisionId: string, userId: string) {
    super("QuestionDraftUpdated", questionId, { revisionId, userId });
  }
}

export class QuestionPublished extends QuestionEvent {
  constructor(questionId: string, revisionId: string, userId: string) {
    super("QuestionPublished", questionId, { revisionId, userId });
  }
}

export class QuestionArchived extends QuestionEvent {
  constructor(questionId: string, userId: string) {
    super("QuestionArchived", questionId, { userId });
  }
}

export class QuestionRestored extends QuestionEvent {
  constructor(questionId: string, userId: string) {
    super("QuestionRestored", questionId, { userId });
  }
}

export class QuestionDuplicated extends QuestionEvent {
  constructor(originalId: string, newId: string, userId: string) {
    super("QuestionDuplicated", newId, { originalId, userId });
  }
}

export class QuestionReviewRequested extends QuestionEvent {
  constructor(questionId: string, revisionId: string, userId: string) {
    super("QuestionReviewRequested", questionId, { revisionId, userId });
  }
}

export class QuestionReviewApproved extends QuestionEvent {
  constructor(questionId: string, revisionId: string, userId: string) {
    super("QuestionReviewApproved", questionId, { revisionId, userId });
  }
}

export class QuestionReviewRejected extends QuestionEvent {
  constructor(questionId: string, revisionId: string, userId: string) {
    super("QuestionReviewRejected", questionId, { revisionId, userId });
  }
}

export class QuestionLocked extends QuestionEvent {
  constructor(questionId: string, userId: string) {
    super("QuestionLocked", questionId, { userId });
  }
}

export class QuestionUnlocked extends QuestionEvent {
  constructor(questionId: string, userId: string) {
    super("QuestionUnlocked", questionId, { userId });
  }
}

// --- Bulk & Pipeline Events ---

export class ImportStarted implements DomainEvent {
  public eventName = "ImportStarted";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; source: string }
  ) {}
}

export class ImportValidated implements DomainEvent {
  public eventName = "ImportValidated";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; report: any }
  ) {}
}

export class ImportPreviewGenerated implements DomainEvent {
  public eventName = "ImportPreviewGenerated";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string }
  ) {}
}

export class ImportCompleted implements DomainEvent {
  public eventName = "ImportCompleted";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; stats: any }
  ) {}
}

export class ImportFailed implements DomainEvent {
  public eventName = "ImportFailed";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; error: string }
  ) {}
}

export class ImportCancelled implements DomainEvent {
  public eventName = "ImportCancelled";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string }
  ) {}
}

export class ExportStarted implements DomainEvent {
  public eventName = "ExportStarted";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; profile: string }
  ) {}
}

export class ExportCompleted implements DomainEvent {
  public eventName = "ExportCompleted";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; url: string }
  ) {}
}

export class ExportCancelled implements DomainEvent {
  public eventName = "ExportCancelled";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string }
  ) {}
}

export class BulkOperationStarted implements DomainEvent {
  public eventName = "BulkOperationStarted";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; operation: string }
  ) {}
}

export class BulkOperationCompleted implements DomainEvent {
  public eventName = "BulkOperationCompleted";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; operation: string; result: any }
  ) {}
}

export class BulkOperationFailed implements DomainEvent {
  public eventName = "BulkOperationFailed";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; operation: string; error: string }
  ) {}
}

export class BulkOperationCancelled implements DomainEvent {
  public eventName = "BulkOperationCancelled";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { jobId: string; operation: string }
  ) {}
}

export class SearchIndexRefreshRequested implements DomainEvent {
  public eventName = "SearchIndexRefreshRequested";
  constructor(
    public aggregateId: string,
    public occurredOn: Date,
    public payload: { targetType: string; targetIds: string[] }
  ) {}
}
