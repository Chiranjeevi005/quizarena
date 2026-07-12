"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function InstructionsStage({ className = "" }: { className?: string }) {
  const { stagePresentation } = useQuizDelivery();

  return (
    <div
      className={`flex flex-col h-full w-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 ${className}`}
    >
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        {stagePresentation?.title || "Instructions"}
      </h1>
      <p className="text-gray-500 mb-8 pb-4 border-b border-gray-100">
        {stagePresentation?.subtitle || "Please read carefully before proceeding."}
      </p>

      <div className="flex-1 overflow-y-auto prose prose-indigo">
        <p>{stagePresentation?.description || "Assessment instructions will appear here."}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
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
