"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function SubmittingStage({ className = "" }: { className?: string }) {
  const { stagePresentation } = useQuizDelivery();

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center ${className}`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        {stagePresentation?.title || "Submitting..."}
      </h1>
      <p className="text-lg text-gray-500 max-w-lg">
        {stagePresentation?.description ||
          "Please do not close your browser. We are securely saving your answers."}
      </p>
    </div>
  );
}
