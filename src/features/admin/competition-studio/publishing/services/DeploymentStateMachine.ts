import { DeploymentStatus } from "@/generated/prisma";

export type DeploymentStateTransition = {
  from: DeploymentStatus;
  to: DeploymentStatus;
};

export class DeploymentStateMachine {
  private static readonly VALID_TRANSITIONS: DeploymentStateTransition[] = [
    { from: DeploymentStatus.PLANNED, to: DeploymentStatus.VALIDATING },
    { from: DeploymentStatus.PLANNED, to: DeploymentStatus.CANCELLED },

    { from: DeploymentStatus.VALIDATING, to: DeploymentStatus.EXECUTING },
    { from: DeploymentStatus.VALIDATING, to: DeploymentStatus.FAILED },
    { from: DeploymentStatus.VALIDATING, to: DeploymentStatus.CANCELLED },

    { from: DeploymentStatus.EXECUTING, to: DeploymentStatus.VERIFYING },
    { from: DeploymentStatus.EXECUTING, to: DeploymentStatus.FAILED },
    { from: DeploymentStatus.EXECUTING, to: DeploymentStatus.CANCELLED },

    { from: DeploymentStatus.VERIFYING, to: DeploymentStatus.ACTIVATING },
    { from: DeploymentStatus.VERIFYING, to: DeploymentStatus.FAILED },

    { from: DeploymentStatus.ACTIVATING, to: DeploymentStatus.COMPLETED },
    { from: DeploymentStatus.ACTIVATING, to: DeploymentStatus.FAILED },

    // Failure Recovery
    { from: DeploymentStatus.FAILED, to: DeploymentStatus.EXECUTING }, // Resume/Retry
    { from: DeploymentStatus.FAILED, to: DeploymentStatus.ROLLED_BACK },
  ];

  public static canTransition(current: DeploymentStatus, next: DeploymentStatus): boolean {
    return this.VALID_TRANSITIONS.some((t) => t.from === current && t.to === next);
  }

  public static requireValidTransition(current: DeploymentStatus, next: DeploymentStatus): void {
    if (!this.canTransition(current, next)) {
      throw new Error(`Invalid deployment state transition from ${current} to ${next}`);
    }
  }

  public static isTerminal(status: DeploymentStatus): boolean {
    return (
      [
        DeploymentStatus.COMPLETED,
        DeploymentStatus.FAILED,
        DeploymentStatus.ROLLED_BACK,
        DeploymentStatus.CANCELLED,
      ] as DeploymentStatus[]
    ).includes(status);
  }
}
