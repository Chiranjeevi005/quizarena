import { BasePolicy } from "@/core/server/policies/BasePolicy";
import { RequestContext } from "@/core/server/context/RequestContext";
import { Question } from "@/generated/prisma";

export class CanEditDraftPolicy extends BasePolicy<Question> {
  constructor(context: RequestContext) {
    super(context);
  }
  public canRead(resource: Question): boolean {
    return true;
  }
  public canUpdate(resource: Question): boolean {
    return true;
  }
  public canDelete(resource: Question): boolean {
    return true;
  }
}

export class CanPublishQuestionPolicy extends BasePolicy<Question> {
  constructor(context: RequestContext) {
    super(context);
  }
  public canRead(resource: Question): boolean {
    return true;
  }
  public canUpdate(resource: Question): boolean {
    return true;
  }
  public canDelete(resource: Question): boolean {
    return true;
  }
}

export class CanArchiveQuestionPolicy extends BasePolicy<Question> {
  constructor(context: RequestContext) {
    super(context);
  }
  public canRead(resource: Question): boolean {
    return true;
  }
  public canUpdate(resource: Question): boolean {
    return true;
  }
  public canDelete(resource: Question): boolean {
    return true;
  }
}

export class CanRestoreQuestionPolicy extends BasePolicy<Question> {
  constructor(context: RequestContext) {
    super(context);
  }
  public canRead(resource: Question): boolean {
    return true;
  }
  public canUpdate(resource: Question): boolean {
    return true;
  }
  public canDelete(resource: Question): boolean {
    return true;
  }
}

export class CanDuplicateQuestionPolicy extends BasePolicy<Question> {
  constructor(context: RequestContext) {
    super(context);
  }
  public canRead(resource: Question): boolean {
    return true;
  }
  public canUpdate(resource: Question): boolean {
    return true;
  }
  public canDelete(resource: Question): boolean {
    return true;
  }
}
