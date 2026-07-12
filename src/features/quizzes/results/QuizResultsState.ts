import { QuizResultsLayout } from "./QuizResultsLayout";
import { QuizResultsDensity } from "./QuizResultsDensity";
import { QuizResultsView } from "./QuizResultsView";

export interface QuizResultsState {
  activeView: QuizResultsView;
  layout: QuizResultsLayout;
  density: QuizResultsDensity;
  compactMode: boolean;
  fullscreenMode: boolean;
  selectedInsight: string | null;
  selectedGuidance: string | null;
  selectedBreakdown: string | null;
  selectedChart: string | null;
  comparisonVisible: boolean;
}
