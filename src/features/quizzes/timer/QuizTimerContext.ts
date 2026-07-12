import { createContext, useContext } from "react";
import { QuizTimePresentation } from "./QuizTimePresentation";
import { SessionStatusPresentation } from "./SessionStatusPresentation";
import { QuizTimerConfig } from "./QuizTimerTypes";

export interface QuizTimerContextValue {
  time: QuizTimePresentation;
  session: SessionStatusPresentation;
  config: QuizTimerConfig;
}

export const QuizTimerContext = createContext<QuizTimerContextValue | undefined>(undefined);

export function useQuizTimer() {
  const context = useContext(QuizTimerContext);
  if (!context) {
    throw new Error("useQuizTimer must be used within a QuizTimerProvider");
  }
  return context;
}
