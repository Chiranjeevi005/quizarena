/**
 * Represents a discrete, versioned capability that can be granted.
 * Example: "Competition.Publish.v2"
 */
export interface Capability {
  id: string; // e.g. "Competition.Publish"
  version: string; // e.g. "v2"
  description: string;
  deprecated: boolean;
  replacement?: string; // ID of the capability that replaces this if deprecated
}

export type PolicyDecision = "ALLOW" | "DENY" | "NOT_APPLICABLE";

/**
 * A Permission binds a Capability to a Policy.
 */
export interface Permission {
  id: string;
  capabilityId: string;
  policyId: string; // The policy that determines if this capability is ALLOW/DENY
  isTemporary: boolean;
  expiresAt?: number;
}

/**
 * A Role aggregates multiple Permissions and can be assigned to a WorkspaceMember.
 */
export interface Role {
  id: string;
  name: string; // e.g. "Finance SME"
  description: string;
  permissions: string[]; // Permission IDs
}

/**
 * Highly optimized snapshot of a user's permissions, cached per session.
 * Replaces the need to recalculate roles/policies on every request.
 */
export interface ResolvedPermissionSnapshot {
  sessionId: string;
  identityId: string;
  workspaceId: string;
  allowedCapabilities: Set<string>;
  deniedCapabilities: Set<string>;
  generatedAt: number;
  expiresAt: number;
}
