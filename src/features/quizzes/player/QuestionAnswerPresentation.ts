export interface QuestionAnswerPresentation {
  selectedOptionIds: string[];
  highlightedOptionId: string | null;
  focusedOptionId: string | null;
  hoveredOptionId: string | null;
  disabled: boolean;
  readonly: boolean;
}
