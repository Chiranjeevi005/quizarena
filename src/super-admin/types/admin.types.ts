export enum DashboardState {
  INITIALIZING = "INITIALIZING",
  LOADING = "LOADING",
  READY = "READY",
  PARTIAL = "PARTIAL",
  ERROR = "ERROR",
  REFRESHING = "REFRESHING",
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}
