"use client";

import { useState, useEffect, useRef, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  startChallenge,
  saveAnswer,
  submitChallenge,
  getAttemptAnswers,
} from "@/actions/challenge";
import type { ChallengeWithQuestionsForAttempt, QuizAnswerState } from "@/types/challenge";
import { Clock, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

interface TimerState {
  remainingSeconds: number;
  isExpired: boolean;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = use(params);
  const router = useRouter();

  const [challenge, setChallenge] = useState<ChallengeWithQuestionsForAttempt | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<TimerState>({ remainingSeconds: 0, isExpired: false });
  const [initialized, setInitialized] = useState(false);
  const submitRef = useRef<() => Promise<void> | undefined>(undefined);

  const handleSubmit = useCallback(async () => {
    if (!attemptId || isSubmitting) return;

    setIsSubmitting(true);

    const result = await submitChallenge(attemptId);

    if (result.success && result.attempt) {
      router.push(`/dashboard/results/${result.attempt.id}`);
    } else {
      setError(result.error || "Failed to submit challenge");
      setIsSubmitting(false);
    }
  }, [attemptId, isSubmitting, router]);

  useEffect(() => {
    submitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    if (!initialized || timer.isExpired || isLoading) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.remainingSeconds <= 1) {
          clearInterval(interval);
          if (submitRef.current) {
            submitRef.current();
          }
          return { ...prev, remainingSeconds: 0, isExpired: true };
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialized, timer.isExpired, isLoading]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (cancelled) return;

      setIsLoading(true);
      setError(null);

      const result = await startChallenge(slug);

      if (cancelled) return;

      if (!result.success) {
        setError(result.error || "Failed to load challenge");
        setIsLoading(false);
        return;
      }

      if (result.existingAttempt && result.existingAttempt.submittedAt) {
        router.push(`/dashboard/results/${result.existingAttempt.id}`);
        return;
      }

      if (result.challenge && result.attemptId) {
        setChallenge(result.challenge);
        setAttemptId(result.attemptId);

        const duration = result.challenge.durationInMinutes * 60;

        if (result.existingAttempt && result.existingAttempt.startedAt) {
          const startTime = new Date(result.existingAttempt.startedAt).getTime();
          const currentTime = Date.now();
          const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
          const remainingSeconds = Math.max(0, duration - elapsedSeconds);

          setTimer({ remainingSeconds, isExpired: remainingSeconds <= 0 });

          if (remainingSeconds <= 0) {
            const submitResult = await submitChallenge(result.attemptId);
            if (submitResult.success && submitResult.attempt) {
              router.push(`/dashboard/results/${submitResult.attempt.id}`);
              return;
            }
          }

          const existingAnswers = await getAttemptAnswers(result.attemptId);
          if (Object.keys(existingAnswers).length > 0) {
            setAnswers(existingAnswers);
          }
        } else {
          setTimer({ remainingSeconds: duration, isExpired: false });
        }
      }

      setIsLoading(false);
      setInitialized(true);
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [slug, router]);

  const handleSelectAnswer = async (option: string) => {
    if (!attemptId || !challenge) return;

    const question = challenge.questions[currentQuestionIndex];
    const newAnswers = { ...answers, [question.questionId]: option };
    setAnswers(newAnswers);

    await saveAnswer(attemptId, question.questionId, option);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy mb-2">Error</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/challenges")}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  if (!challenge || !attemptId) {
    return null;
  }

  const currentQuestion = challenge.questions[currentQuestionIndex];
  const totalQuestions = challenge.questions.length;
  const answeredCount = Object.values(answers).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-navy">{challenge.title}</h1>
              <p className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold",
                timer.remainingSeconds <= 60 ? "bg-red-50 text-red-600" : "bg-navy text-white"
              )}
            >
              <Clock className="w-5 h-5" />
              {formatTime(timer.remainingSeconds)}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{answeredCount} answered</span>
              <span>{totalQuestions - answeredCount} remaining</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="mb-6">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-3">
              Question {currentQuestionIndex + 1}
            </span>
            <p className="text-base sm:text-lg text-navy font-medium leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          <div className="space-y-3">
            {["A", "B", "C", "D"].map((option) => {
              const isSelected = answers[currentQuestion.questionId] === option;
              const optionKey = `option${option}` as keyof typeof currentQuestion;
              const optionText = currentQuestion[optionKey] as string;

              return (
                <button
                  key={option}
                  onClick={() => handleSelectAnswer(option)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 text-navy"
                      : "border-gray-200 hover:border-gray-300 text-navy"
                  )}
                >
                  <span
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {option}
                  </span>
                  <span className="text-sm sm:text-base">{optionText}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-navy font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {challenge.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                  idx === currentQuestionIndex
                    ? "bg-primary text-white"
                    : answers[challenge.questions[idx].questionId]
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((i) => Math.min(totalQuestions - 1, i + 1))}
              className="flex items-center gap-2 px-4 py-2 text-navy font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Challenge"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
