import { PolicyDecision, ResolvedPermissionSnapshot, Capability } from "../models/PermissionModels";
import { WorkspaceMember } from "../models/TenantModels";

export interface PolicyContext {
  member: WorkspaceMember;
  resourceOwnerId?: string;
  environment: string;
  featureFlags: Record<string, boolean>;
}

export interface PolicyRule {
  evaluate(capability: Capability, context: PolicyContext): PolicyDecision;
}

/**
 * PolicyEngine evaluates policies to produce ALLOW, DENY, or NOT_APPLICABLE decisions.
 */
class PolicyEngineClass {
  private rules: PolicyRule[] = [];

  registerRule(rule: PolicyRule) {
    this.rules.push(rule);
  }

  evaluate(capability: Capability, context: PolicyContext): PolicyDecision {
    // Zero-Trust: Default to DENY if no rule explicitly ALLOWs
    let finalDecision: PolicyDecision = "NOT_APPLICABLE";

    for (const rule of this.rules) {
      const decision = rule.evaluate(capability, context);

      // Explicit DENY immediately overrides any ALLOW
      if (decision === "DENY") {
        return "DENY";
      }

      if (decision === "ALLOW") {
        finalDecision = "ALLOW";
      }
    }

    // If nothing explicitly allowed, default to deny
    return finalDecision === "ALLOW" ? "ALLOW" : "DENY";
  }

  /**
   * Generates a fast-read snapshot for the frontend or middleware to check permissions without
   * running the full policy engine repeatedly.
   */
  generateSnapshot(
    sessionId: string,
    context: PolicyContext,
    capabilities: Capability[]
  ): ResolvedPermissionSnapshot {
    const allowed = new Set<string>();
    const denied = new Set<string>();

    for (const cap of capabilities) {
      const decision = this.evaluate(cap, context);
      if (decision === "ALLOW") allowed.add(cap.id);
      else denied.add(cap.id);
    }

    return {
      sessionId,
      identityId: context.member.identityId,
      workspaceId: context.member.workspaceId,
      allowedCapabilities: allowed,
      deniedCapabilities: denied,
      generatedAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 15, // 15 minute cache TTL
    };
  }
}

export const PolicyEngine = new PolicyEngineClass();
