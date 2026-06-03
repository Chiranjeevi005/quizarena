export type NotificationType = "SUCCESS" | "INFORMATION" | "WARNING" | "ERROR" | "LOADING";

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  description?: string;
  action?: NotificationAction;
  id?: string;
}

export interface ActiveNotification extends NotificationPayload {
  id: string;
  duration: number;
}
