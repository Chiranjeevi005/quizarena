"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function ReadyStage({ className = "" }: { className?: string }) {
  const { stagePresentation } = useQuizDelivery();

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-4xl mb-6">
        {stagePresentation?.icon || "🏁"}
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
        {stagePresentation?.title || "Ready to Begin"}
      </h1>
      <p className="text-lg text-gray-600 max-w-lg mb-8">
        {stagePresentation?.description ||
          "You are about to start the assessment. Ensure you are in a quiet environment."}
      </p>
      <div className="flex gap-4">
        {stagePresentation?.availableActions.map((action) => (
          <button
            key={action}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
