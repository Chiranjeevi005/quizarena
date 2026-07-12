export interface QuizTimerEvents {
  onTimeWarning?: (remainingMs: number) => void;
  onTimeCritical?: (remainingMs: number) => void;
  onTimeExpired?: () => void;
}
