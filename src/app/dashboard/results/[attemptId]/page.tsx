"use client";

import { useEffect, useState } from "react";
import { getAttemptById } from "@/actions/challenge";
import type { QuestionResult } from "@/types/challenge";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  BarChart3,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultPageProps {
  params: Promise<{ attemptId: string }>;
}

export default function ResultPage({ params }: ResultPageProps) {
  const [attempt, setAttempt] = useState<{
    id: string;
    challenge: {
      title: string;
      totalQuestions: number;
      questions: { questionId: string; question: { correctOption: string } }[];
    };
    correctAnswers: number;
    wrongAnswers: number;
    score: number;
    timeTakenInSeconds: number | null;
    answers: { questionId: string; selectedOption: string | null; isCorrect: boolean | null }[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      const { attemptId } = await params;
      const result = await getAttemptById(attemptId);

      if (!result) {
        setError("Result not found");
      } else {
        setAttempt(result);
      }

      setIsLoading(false);
    };

    loadResult();
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy mb-2">Result Not Found</h2>
          <p className="text-gray-500 mb-4">We couldn&apos;t find this result.</p>
          <button
            onClick={() => (window.location.href = "/challenges")}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  const accuracy =
    attempt.challenge.totalQuestions > 0
      ? Math.round((attempt.correctAnswers / attempt.challenge.totalQuestions) * 100)
      : 0;

  const timeTaken = attempt.timeTakenInSeconds || 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const getPerformanceMessage = () => {
    if (accuracy >= 80) return "Outstanding Performance";
    if (accuracy >= 60) return "Strong Performance";
    if (accuracy >= 40) return "Moderate Performance";
    return "Keep Practicing";
  };

  const questions: QuestionResult[] = attempt.challenge.questions.map(
    (cq: { questionId: string; question: { correctOption: string } }) => {
      const answer = attempt.answers.find(
        (a: { questionId: string }) => a.questionId === cq.questionId
      );
      return {
        questionId: cq.questionId,
        selectedOption: answer?.selectedOption || null,
        correctOption: cq.question.correctOption,
        isCorrect: answer?.isCorrect || false,
      };
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
              {getPerformanceMessage()}
            </h1>
            <p className="text-gray-500">{attempt.challenge.title}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-navy">{attempt.score}</p>
              <p className="text-xs text-gray-500 mt-1">Score</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">{attempt.correctAnswers}</p>
              <p className="text-xs text-green-600 mt-1">Correct</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <p className="text-3xl font-bold text-red-600">{attempt.wrongAnswers}</p>
              <p className="text-xs text-red-600 mt-1">Wrong</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-navy">{accuracy}%</p>
              <p className="text-xs text-gray-500 mt-1">Accuracy</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Time Taken</p>
                <p className="font-bold text-navy">
                  {minutes}m {seconds}s
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Target className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Questions</p>
                <p className="font-bold text-navy">{attempt.challenge.totalQuestions} total</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-navy" />
            <h2 className="text-lg font-bold text-navy">Attempt Summary</h2>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.questionId}
                onClick={() => setSelectedQuestion(selectedQuestion === idx ? null : idx)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border transition-colors text-left",
                  selectedQuestion === idx
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 hover:border-gray-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-6 h-6 rounded flex items-center justify-center",
                      q.isCorrect
                        ? "bg-green-100 text-green-600"
                        : q.selectedOption
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {q.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : q.selectedOption ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">—</span>
                    )}
                  </span>
                  <span className="text-sm text-navy font-medium">Question {idx + 1}</span>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    q.isCorrect
                      ? "text-green-600"
                      : q.selectedOption
                        ? "text-red-600"
                        : "text-gray-400"
                  )}
                >
                  {q.isCorrect
                    ? "Correct"
                    : q.selectedOption
                      ? `Selected: ${q.selectedOption}`
                      : "Unanswered"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/challenges"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Attempt Another Challenge
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-navy font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
