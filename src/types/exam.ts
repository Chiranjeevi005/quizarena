/**
 * QuizArena — Exam Domain Types
 *
 * Types specific to the live exam interaction layer.
 * Intentionally separate from challenge.ts types:
 * these are the sanitized, client-facing representations.
 */

// ─── Question & Option ──────────────────────────────────────────

export interface ExamOption {
  id: string;
  text: string;
  displayLabel: string; // "A", "B", "C", "D"
}

export interface ExamQuestion {
  questionId: string;
  question: string;
  options: ExamOption[];
  order: number;
}

// ─── Palette States ─────────────────────────────────────────────

export type PaletteState = "CURRENT" | "ANSWERED" | "UNANSWERED" | "NOT_VISITED";

// ─── Exam Initialization Data ───────────────────────────────────

/**
 * Serializable data passed from server component → ExamShell client component.
 * All dates are ISO strings for hydration safety.
 */
export interface ExamInitData {
  attemptId: string;
  challengeSlug: string;
  challengeTitle: string;
  questions: ExamQuestion[];
  initialAnswers: Record<string, string | null>;
  expiresAt: string; // ISO string
  isFlagged: boolean;
  totalViolations: number;
}

// ─── Answer State ───────────────────────────────────────────────

export type ExamAnswerState = Record<string, string | null>;

// ─── Timer Urgency ──────────────────────────────────────────────

export type TimerUrgency = "normal" | "warning" | "danger";

// ─── Save Status ────────────────────────────────────────────────

export type SaveStatus = "idle" | "saving" | "saved" | "error";

// ─── Violation Type (re-export convenience) ─────────────────────

export type ExamViolationType = "TAB_SWITCH" | "WINDOW_BLUR" | "COPY_ATTEMPT" | "RIGHT_CLICK";

// ─── Warning Level ──────────────────────────────────────────────

export type WarningLevel = "none" | "warning" | "critical";
