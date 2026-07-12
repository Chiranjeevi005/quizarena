export type AuthenticationEventType =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "LOGOUT"
  | "SESSION_RESTORED"
  | "SESSION_REVOKED"
  | "PROFILE_UPDATED"
  | "PROFILE_COMPLETED"
  | "AVATAR_UPLOADED"
  | "AVATAR_REMOVED"
  | "PASSWORD_CHANGED"
  | "PASSWORD_RESET_REQUESTED"
  | "PASSWORD_RESET_COMPLETED"
  | "VERIFICATION_EMAIL_SENT"
  | "VERIFICATION_EMAIL_RESENT"
  | "EMAIL_VERIFIED";

export interface AuthenticationEvent {
  type: AuthenticationEventType;
  payload?: any;
}
