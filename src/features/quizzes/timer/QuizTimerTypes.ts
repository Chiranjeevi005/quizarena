import { QuizTimerState } from "./QuizTimerState";
import { QuizTimerVariant } from "./QuizTimerVariant";
import { QuizTimerLayout } from "./QuizTimerLayout";
import { QuizTimerDensity } from "./QuizTimerDensity";
import { QuizTimerWarningLevel } from "./QuizTimerWarningLevel";
import { QuizTimerSize } from "./QuizTimerSize";
import { QuizTimerDisplay } from "./QuizTimerDisplay";
import { SessionHealth } from "./SessionHealth";
import { QuizTimerFormat } from "./QuizTimerFormat";
import { QuizTimePresentation } from "./QuizTimePresentation";
import { SessionStatusPresentation } from "./SessionStatusPresentation";
import { QuizTimerCapabilities } from "./QuizTimerCapabilities";

export interface QuizTimerConfig {
  variant: QuizTimerVariant;
  layout: QuizTimerLayout;
  density: QuizTimerDensity;
  size: QuizTimerSize;
  displayMode: QuizTimerDisplay;
  format: QuizTimerFormat;
  capabilities: QuizTimerCapabilities;
}
