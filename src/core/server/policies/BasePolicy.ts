import { RequestContext } from "../context/RequestContext";

/**
 * Base Policy for evaluating Authorization and Business Rules
 * Example usage: QuestionPolicy extends BasePolicy<Question>
 */
export abstract class BasePolicy<TResource> {
  protected context: RequestContext;

  constructor(context: RequestContext) {
    this.context = context;
  }

  // Common abstraction
  public abstract canRead(resource: TResource): boolean;
  public abstract canUpdate(resource: TResource): boolean;
  public abstract canDelete(resource: TResource): boolean;
}
