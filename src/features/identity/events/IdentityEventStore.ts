export interface IdentityEvent {
  id: string;
  type: string; // e.g. "InvitationSent", "RoleAssigned", "PermissionRevoked", "FirstLogin"
  payload: Record<string, any>;
  identityId?: string;
  workspaceId?: string;
  timestamp: number;
}

/**
 * IdentityEventStore acts as the central timeline for all identity actions.
 * Read models consume this to generate state.
 */
class IdentityEventStoreClass {
  private events: IdentityEvent[] = [];

  append(event: Omit<IdentityEvent, "id" | "timestamp">) {
    const newEvent: IdentityEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
    };
    this.events.push(newEvent);
    console.log(`[IdentityEventStore] Appended event: ${newEvent.type}`, newEvent.payload);
  }

  getEventsForIdentity(identityId: string): IdentityEvent[] {
    return this.events.filter((e) => e.identityId === identityId);
  }

  getEventsForWorkspace(workspaceId: string): IdentityEvent[] {
    return this.events.filter((e) => e.workspaceId === workspaceId);
  }

  getAllEvents(): IdentityEvent[] {
    return this.events;
  }
}

export const IdentityEventStore = new IdentityEventStoreClass();
