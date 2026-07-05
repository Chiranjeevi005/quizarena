"use client";

import {
  useRuntimeState,
  useRuntimeCommand,
} from "@/features/competitions/runtime/providers/CompetitionRuntimeProvider";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export function OverlayRegion() {
  const status = useRuntimeState((s: any) => s.status);
  const { dispatch } = useRuntimeCommand();

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // We can listen to a custom event or state for showing the modal,
  // but usually a global state manager or context handles overlay toggles.
  // For MVP, we expose a global window method to trigger it from TopRegion.
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.defineProperty(window, "triggerSubmitModal", {
        value: () => setShowSubmitConfirm(true),
        writable: true,
        configurable: true,
      });
    }
  }, []);

  const isSubmitting = status === "SUBMITTING";

  const questions = useRuntimeState((s: any) => s.questions);
  const answers = useRuntimeState((s: any) => s.answers);
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  if (!showSubmitConfirm && status !== "SUBMITTING") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-sm w-full">
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Submitting...</h3>
            <p className="text-slate-400 text-sm text-center">
              Please wait while we secure your answers.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-white mb-3">Submit Assessment?</h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">Total Questions</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">Answered</span>
                <span className="font-bold text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Unanswered</span>
                <span className={`font-bold ${unansweredCount > 0 ? "text-red-400" : "text-slate-500"}`}>
                  {unansweredCount}
                </span>
              </div>
            </div>
            
            {unansweredCount > 0 && (
              <p className="text-red-400 text-sm mb-6 flex items-start gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <span className="font-bold mt-0.5">⚠️</span>
                You have {unansweredCount} unanswered question{unansweredCount > 1 ? "s" : ""}. Are you sure you want to submit?
              </p>
            )}

            <p className="text-slate-400 text-xs mb-6">
              You cannot change your answers after submission.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  dispatch("SubmitCompetition");
                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 font-bold transition-colors shadow-lg shadow-blue-900/20"
              >
                Confirm Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
