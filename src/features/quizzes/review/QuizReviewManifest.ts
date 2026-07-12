export interface QuizReviewManifest {
  version: string;
  capabilities: string[];
}

export const QUIZ_REVIEW_MANIFEST: QuizReviewManifest = {
  version: "1.0.0",
  capabilities: ["review", "submission", "navigation"],
};
