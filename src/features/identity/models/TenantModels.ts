/**
 * Tenant represents the highest level in the hierarchy (e.g., QuizArena Cloud, University A).
 * It acts as an isolation boundary.
 */
export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  createdAt: number;
}

/**
 * WorkspaceLifecycle tracks the state of a workspace.
 */
export type WorkspaceLifecycle = "CREATED" | "CONFIGURED" | "ACTIVE" | "LOCKED" | "ARCHIVED";

/**
 * Workspace belongs to a Tenant and holds configuration, branding, and members.
 */
export interface Workspace {
  id: string;
  tenantId: string;
  name: string;
  status: WorkspaceLifecycle;

  // Organization Branding
  branding: {
    logoUrl?: string;
    brandColor?: string;
    timezone: string;
    currency: string;
    language: string;
  };

  createdAt: number;
}

/**
 * MembershipLifecycle tracks the state of an SME's membership in a workspace.
 */
export type MembershipLifecycle = "PENDING" | "ACTIVE" | "SUSPENDED" | "DISABLED" | "ARCHIVED";

/**
 * WorkspaceMember binds an Identity to a Workspace with a specific lifecycle state and roles.
 */
export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  identityId: string; // The authenticated user
  status: MembershipLifecycle;
  roles: string[]; // Role IDs
  joinedAt: number;
}
