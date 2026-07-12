import { QuizTimerWarningLevel } from "./QuizTimerWarningLevel";
import { QuizTimerState } from "./QuizTimerState";

export interface QuizTimePresentation {
  displayTime: string;
  remainingTimeMs: number;
  elapsedTimeMs: number;
  totalTimeMs: number;
  percentageComplete: number;
  warningLevel: QuizTimerWarningLevel;
  state: QuizTimerState;
}
