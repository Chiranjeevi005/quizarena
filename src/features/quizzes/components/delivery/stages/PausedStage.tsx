"use client";
import React from "react";
import { useQuizDelivery } from "../../../delivery";

export function PausedStage({ className = "" }: { className?: string }) {
  const { stagePresentation } = useQuizDelivery();

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full bg-gray-900 text-white p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center text-4xl mb-6 border border-gray-700">
        {stagePresentation?.icon || "⏸️"}
      </div>
      <h1 className="text-3xl font-extrabold mb-4">
        {stagePresentation?.title || "Session Paused"}
      </h1>
      <p className="text-lg text-gray-400 max-w-lg mb-8">
        {stagePresentation?.description || "Your timer is stopped and your screen is locked."}
      </p>
      <div className="flex gap-4">
        {stagePresentation?.availableActions.map((action) => (
          <button
            key={action}
            className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 shadow-sm transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
