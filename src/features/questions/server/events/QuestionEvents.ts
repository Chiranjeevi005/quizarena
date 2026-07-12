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
