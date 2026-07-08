import { WorkspaceLifecycle, MembershipLifecycle } from "../models/TenantModels";

/**
 * Validates transitions between Workspace states.
 */
export class WorkspaceLifecycleEngine {
  private static allowedTransitions: Record<WorkspaceLifecycle, WorkspaceLifecycle[]> = {
    CREATED: ["CONFIGURED", "ARCHIVED"],
    CONFIGURED: ["ACTIVE", "LOCKED", "ARCHIVED"],
    ACTIVE: ["LOCKED", "ARCHIVED"],
    LOCKED: ["ACTIVE", "ARCHIVED"],
    ARCHIVED: [], // Terminal state
  };

  static canTransition(from: WorkspaceLifecycle, to: WorkspaceLifecycle): boolean {
    return this.allowedTransitions[from].includes(to);
  }
}

/**
 * Validates transitions between Membership states.
 */
export class MembershipLifecycleEngine {
  private static allowedTransitions: Record<MembershipLifecycle, MembershipLifecycle[]> = {
    PENDING: ["ACTIVE", "ARCHIVED"],
    ACTIVE: ["SUSPENDED", "DISABLED", "ARCHIVED"],
    SUSPENDED: ["ACTIVE", "ARCHIVED"],
    DISABLED: ["ACTIVE", "ARCHIVED"],
    ARCHIVED: [], // Terminal state
  };

  static canTransition(from: MembershipLifecycle, to: MembershipLifecycle): boolean {
    return this.allowedTransitions[from].includes(to);
  }
}
