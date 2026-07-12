import { QuestionPlayerMode } from "./QuestionPlayerMode";
import { QuestionPlayerLayout } from "./QuestionPlayerLayout";
import { QuestionPlayerView } from "./QuestionPlayerView";
import { QuestionAnswerPresentation } from "./QuestionAnswerPresentation";

export interface QuestionPlayerState {
  playerMode: QuestionPlayerMode;
  playerLayout: QuestionPlayerLayout;
  playerView: QuestionPlayerView;
  activeQuestionId: string | null;
  activeQuestionType: string | null;
  answerPresentation: QuestionAnswerPresentation;
  compactMode: boolean;
  fullscreenMode: boolean;
  readonlyMode: boolean;
}
