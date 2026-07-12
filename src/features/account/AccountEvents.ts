export type AccountEventType = "ACCOUNT_UPDATED" | "PREFERENCES_UPDATED";
export interface AccountEvent {
  type: AccountEventType;
  payload?: any;
}
