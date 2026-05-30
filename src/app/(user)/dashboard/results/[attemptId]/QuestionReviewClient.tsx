"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, MinusCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionResultDetail } from "@/types/challenge";

export function QuestionReviewClient({ questions }: { questions: QuestionResultDetail[] }) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-2">
      {questions.map((q, idx) => {
        const isExpanded = expandedQuestion === idx;

        return (
          <div key={q.questionId} className="rounded-xl border border-gray-100 overflow-hidden">
            {/* Question Row */}
            <button
              onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
              className={cn(
                "flex items-center justify-between p-3.5 w-full text-left transition-colors",
                isExpanded ? "bg-gray-50" : "hover:bg-gray-50/50"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                    q.isCorrect
                      ? "bg-emerald-100 text-emerald-600"
                      : q.isUnanswered
                        ? "bg-gray-100 text-gray-400"
                        : "bg-red-100 text-red-600"
                  )}
                >
                  {q.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : q.isUnanswered ? (
                    <MinusCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </span>
                <span className="text-sm font-medium text-navy truncate">
                  Q{idx + 1}.{" "}
                  <span className="text-gray-500 font-normal">
                    {q.isCorrect ? "Correct" : q.isUnanswered ? "Unanswered" : "Incorrect"}
                  </span>
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-gray-400 shrink-0 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {/* Expanded Detail */}
            {isExpanded && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50/50 space-y-3">
                {/* Question text */}
                <p className="text-sm text-navy font-medium leading-relaxed">{q.questionText}</p>

                {/* Answer comparison */}
                <div className="space-y-2">
                  {/* User's answer */}
                  {!q.isUnanswered && (
                    <div
                      className={cn(
                        "flex items-start gap-2 p-2.5 rounded-lg text-sm",
                        q.isCorrect
                          ? "bg-emerald-50 border border-emerald-100"
                          : "bg-red-50 border border-red-100"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs font-bold mt-0.5 shrink-0",
                          q.isCorrect ? "text-emerald-600" : "text-red-600"
                        )}
                      >
                        Your answer:
                      </span>
                      <span className={cn(q.isCorrect ? "text-emerald-700" : "text-red-700")}>
                        {q.selectedOptionText}
                      </span>
                    </div>
                  )}

                  {/* Correct answer (shown if wrong or unanswered) */}
                  {!q.isCorrect && (
                    <div className="flex items-start gap-2 p-2.5 rounded-lg text-sm bg-emerald-50 border border-emerald-100">
                      <span className="text-xs font-bold text-emerald-600 mt-0.5 shrink-0">
                        Correct answer:
                      </span>
                      <span className="text-emerald-700">{q.correctOptionText}</span>
                    </div>
                  )}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs font-bold text-blue-600 mb-1">Explanation</p>
                    <p className="text-sm text-blue-800 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
