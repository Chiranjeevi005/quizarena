export type QuizReviewAction =
  | { type: "SET_STATE"; payload: any }
  | { type: "SET_LAYOUT"; payload: any }
  | { type: "SET_FILTER"; payload: any }
  | { type: "SELECT_QUESTION"; payload: string | null }
  | { type: "TOGGLE_INSPECTOR" }
  | { type: "INITIATE_SUBMISSION" }
  | { type: "CANCEL_SUBMISSION" };
