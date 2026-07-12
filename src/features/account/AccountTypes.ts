export type ProfileVisibility = "PUBLIC" | "PRIVATE" | "ORGANIZATION";
export type AvatarSource = "GOOGLE" | "UPLOADED" | "INITIALS" | "DEFAULT";
export type ProfileCompletionState = "INCOMPLETE" | "PARTIAL" | "COMPLETE";
export type AccountState = "ACTIVE" | "SUSPENDED" | "PENDING_DELETION";

export interface UserAccountPresentation {
  id: string;
  email: string;
  state: AccountState;
  emailVerified: boolean;
}

export interface UserProfilePresentation {
  fullName: string;
  firstName?: string;
  lastName?: string;
  timezone?: string;
  language?: string;
  visibility: ProfileVisibility;
}

export interface AvatarPresentation {
  url: string | null;
  source: AvatarSource;
  initials: string;
}

export interface ProfileCompletionPresentation {
  state: ProfileCompletionState;
  percentage: number;
  missingFields: string[];
}

export interface AccountStatisticsPresentation {
  memberSince: string;
  lastLogin: string;
}
