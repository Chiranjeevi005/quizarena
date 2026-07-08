/**
 * Prevents invalid capability assignments based on prerequisites.
 */
export class PermissionDependencyEngine {
  // Map of Capability ID -> Array of Required Capability IDs
  private static dependencies: Record<string, string[]> = {
    "Competition.Publish": ["Competition.Read", "Competition.Edit"],
    "Competition.Freeze": ["Competition.Read"],
    "Finance.Refund": ["Finance.Read", "Finance.Write"],
  };

  /**
   * Validates if adding a capability is allowed given the current set of capabilities.
   */
  static validateAssignment(
    capabilityId: string,
    currentCapabilities: Set<string>
  ): { valid: boolean; missing: string[] } {
    const required = this.dependencies[capabilityId] || [];
    const missing = required.filter((req) => !currentCapabilities.has(req));

    return {
      valid: missing.length === 0,
      missing,
    };
  }

  /**
   * Returns capabilities that would implicitly be revoked if the given capability is removed.
   */
  static getDependentCapabilities(
    capabilityToRemove: string,
    currentCapabilities: Set<string>
  ): string[] {
    const dependent: string[] = [];

    for (const [cap, reqs] of Object.entries(this.dependencies)) {
      if (currentCapabilities.has(cap) && reqs.includes(capabilityToRemove)) {
        dependent.push(cap);
      }
    }

    return dependent;
  }
}
