import { createContext, useContext } from "react";
import { QuizReviewState } from "./QuizReviewState";
import { QuizReviewLayout } from "./QuizReviewLayout";
import { QuizReviewDensity } from "./QuizReviewDensity";
import { QuizReviewMode } from "./QuizReviewMode";
import { ReviewFilter } from "./ReviewFilter";
import { SubmissionReadinessPresentation } from "./SubmissionReadinessPresentation";
import { ReviewStatisticsPresentation } from "./ReviewStatisticsPresentation";

export interface QuizReviewContextValue {
  state: QuizReviewState;
  layout: QuizReviewLayout;
  density: QuizReviewDensity;
  mode: QuizReviewMode;
  filter: ReviewFilter;
  selectedQuestionId: string | null;
  activeSection: string | null;
  inspectorVisible: boolean;
  summaryVisible: boolean;
  navigationVisible: boolean;
  submissionVisible: boolean;
  compactMode: boolean;
  fullscreenMode: boolean;
  readiness: SubmissionReadinessPresentation | null;
  statistics: ReviewStatisticsPresentation | null;
  dispatch: (action: any) => void;
}

export const QuizReviewContext = createContext<QuizReviewContextValue | null>(null);

export function useQuizReview() {
  const context = useContext(QuizReviewContext);
  if (!context) {
    throw new Error("useQuizReview must be used within a QuizReviewProvider");
  }
  return context;
}
