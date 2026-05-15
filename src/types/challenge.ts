import type { Challenge, Question, ChallengeAttempt, UserAnswer } from "@/generated/prisma";

export type ChallengeWithQuestions = Challenge & {
  questions: (ChallengeQuestionWithQuestion & { question: Question })[];
};

export type ChallengeQuestionWithQuestion = {
  id: string;
  challengeId: string;
  questionId: string;
  order: number;
  question: Question;
};

export type ChallengeQuestionWithAnswer = {
  id: string;
  questionId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  order: number;
};

export type ChallengeWithQuestionsForAttempt = Challenge & {
  questions: ChallengeQuestionWithAnswer[];
};

export type AttemptWithDetails = ChallengeAttempt & {
  challenge: Challenge;
  answers: UserAnswer[];
};

export interface AnswerSubmission {
  questionId: string;
  selectedOption: string | null;
}

export interface ChallengeStartResult {
  success: boolean;
  attemptId?: string;
  challenge?: ChallengeWithQuestionsForAttempt;
  existingAttempt?: ChallengeAttempt;
  error?: string;
}

export interface ChallengeSubmitResult {
  success: boolean;
  attempt?: AttemptWithDetails;
  error?: string;
}

export interface QuestionResult {
  questionId: string;
  selectedOption: string | null;
  correctOption: string;
  isCorrect: boolean;
}

export interface ChallengeResult {
  attemptId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  accuracy: number;
  timeTaken: number;
  questions: QuestionResult[];
}

export type QuizAnswerState = Record<string, string | null>;

export interface TimerState {
  remainingSeconds: number;
  startedAt: Date;
  expiresAt: Date;
}
