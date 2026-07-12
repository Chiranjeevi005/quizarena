import { QuizBuilderMode } from "./QuizBuilderMode";
import { QuizItemPresentation } from "./QuizItemPresentation";
export interface QuizBuilderState {
  mode: QuizBuilderMode;
  selectedItems: QuizItemPresentation[];
  activeSection: string;
  previewVisible: boolean;
  browserVisible: boolean;
  outlineVisible: boolean;
  inspectorVisible: boolean;
  compactMode: boolean;
}
