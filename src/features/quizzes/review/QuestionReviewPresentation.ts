export interface QuestionReviewPresentation {
  id: string;
  order: number;
  title: string;
  isAnswered: boolean;
  isFlagged: boolean;
  isBookmarked: boolean;
  isVisited: boolean;
  type: string;
  points: number;
}
