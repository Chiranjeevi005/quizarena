export interface QuizSessionProgress {
  activeQuestionId: string | null;
  activeQuestionIndex: number;
  totalQuestions: number;
  answeredCount: number;
  bookmarkedCount: number;
  flaggedCount: number;
  completedPercentage: number;
}
