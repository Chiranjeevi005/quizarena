import { IdentityEventStore, IdentityEvent } from "../events/IdentityEventStore";
import { Tenant, Workspace, WorkspaceMember } from "../models/TenantModels";

/**
 * Specialized Read Models to prevent generic DB querying.
 * These act as projections from the IdentityEventStore and primary databases.
 */

export interface IdentityOverview {
  totalUsers: number;
  totalWorkspaces: number;
  activeSessions: number;
  recentEvents: IdentityEvent[];
}

export class IdentityOverviewReadModel {
  static getOverview(workspaceId: string): IdentityOverview {
    const events = IdentityEventStore.getEventsForWorkspace(workspaceId);

    // In reality, this would project from DB/EventStore
    return {
      totalUsers: 1, // Mock
      totalWorkspaces: 1, // Mock
      activeSessions: 1, // Mock
      recentEvents: events.slice(-5), // Last 5 events
    };
  }
}

export class WorkspaceReadModel {
  static getWorkspacesForTenant(tenantId: string): Workspace[] {
    // Mock
    return [];
  }

  static getMembersForWorkspace(workspaceId: string): WorkspaceMember[] {
    // Mock
    return [];
  }
}
