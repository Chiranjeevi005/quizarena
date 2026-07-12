import { SessionHealth } from "./SessionHealth";

export interface SessionStatusPresentation {
  health: SessionHealth;
  phase: string; // e.g., 'Draft', 'Active', 'Review'
  isLocked: boolean;
  message?: string;
  lastSyncTime?: number;
}
