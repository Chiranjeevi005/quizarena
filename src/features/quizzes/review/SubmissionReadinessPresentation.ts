import { SubmissionState } from "./SubmissionState";
import { SubmissionSeverity } from "./SubmissionSeverity";

export interface SubmissionReadinessPresentation {
  completionPercentage: number;
  answeredCount: number;
  unansweredCount: number;
  flaggedCount: number;
  bookmarkedCount: number;
  warningCount: number;
  state: SubmissionState;
  severity: SubmissionSeverity;
  checklistItems: Array<{
    id: string;
    label: string;
    isComplete: boolean;
    isRequired: boolean;
  }>;
}
