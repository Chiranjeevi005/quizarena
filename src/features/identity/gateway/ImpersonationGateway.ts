export interface ImpersonationSession {
  sessionId: string;
  superAdminId: string;
  targetIdentityId: string;
  startedAt: number;
  reason: string;
}

/**
 * ImpersonationGateway handles read-only impersonation strictly for Super Admins.
 * Everything must be logged.
 */
class ImpersonationGatewayClass {
  private activeSessions: Map<string, ImpersonationSession> = new Map();

  startImpersonation(
    superAdminId: string,
    targetIdentityId: string,
    reason: string
  ): ImpersonationSession {
    // Audit log
    console.log(
      `[Impersonation Audit] SuperAdmin ${superAdminId} impersonating ${targetIdentityId}. Reason: ${reason}`
    );

    const session: ImpersonationSession = {
      sessionId: `imp-${Date.now()}`,
      superAdminId,
      targetIdentityId,
      startedAt: Date.now(),
      reason,
    };

    this.activeSessions.set(session.sessionId, session);
    return session;
  }

  endImpersonation(sessionId: string) {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      console.log(`[Impersonation Audit] Session ${sessionId} ended.`);
      this.activeSessions.delete(sessionId);
    }
  }

  isImpersonating(sessionId: string): boolean {
    return this.activeSessions.has(sessionId);
  }
}

export const ImpersonationGateway = new ImpersonationGatewayClass();
