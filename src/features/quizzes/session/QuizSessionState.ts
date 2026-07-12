import { QuizSessionMode } from "./QuizSessionMode";
import { QuizSessionLifecycle } from "./QuizSessionLifecycle";
import { QuizSessionView } from "./QuizSessionView";
import { QuizSessionVariant } from "./QuizSessionVariant";
import { QuizSessionLayout } from "./QuizSessionLayout";
import { QuizSessionProgress } from "./QuizSessionProgress";

export interface QuizSessionState {
  lifecycle: QuizSessionLifecycle;
  view: QuizSessionView;
  layout: QuizSessionLayout;
  mode: QuizSessionMode;
  activeQuestionId: string | null;
  activeQuestionIndex: number;
  progress: QuizSessionProgress;
  previewMode: boolean;
  compactMode: boolean;
  fullscreenMode: boolean;
}
