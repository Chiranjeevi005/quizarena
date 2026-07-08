import { IdentityEventStore } from "../events/IdentityEventStore";

export type IdentityNotificationType =
  | "InvitationSent"
  | "RoleAssigned"
  | "PermissionRevoked"
  | "WorkspaceActivated"
  | "Suspended";

/**
 * Ensures NO UI component emits notifications directly.
 * Converts Identity Events into external platform notifications/emails.
 */
class IdentityNotificationServiceClass {
  notify(type: IdentityNotificationType, targetIdentityId: string, payload: any) {
    console.log(`[NotificationEngine] Emitting ${type} to identity ${targetIdentityId}`);

    // 1. Log to Audit
    IdentityEventStore.append({
      type: `Notification:${type}`,
      payload,
      identityId: targetIdentityId,
    });

    // 2. Platform Event (Would push to a real event bus)
    // EventBus.publish(type, payload);

    // 3. Email Delivery (Mocked)
    // EmailService.send(targetIdentityId, type, payload);
  }
}

export const IdentityNotificationService = new IdentityNotificationServiceClass();
