import React from "react";
import { useDeploymentStore } from "../stores/deployment.store";
import { DeploymentStatus } from "@/generated/prisma";

export function DeploymentTimeline() {
  const { status, currentStage, completedStages } = useDeploymentStore();

  const states: DeploymentStatus[] = [
    DeploymentStatus.PLANNED,
    DeploymentStatus.VALIDATING,
    DeploymentStatus.EXECUTING,
    DeploymentStatus.VERIFYING,
    DeploymentStatus.ACTIVATING,
    DeploymentStatus.COMPLETED,
  ];

  const currentIndex = status ? states.indexOf(status) : -1;

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Deployment Timeline
      </h3>

      <div className="relative border-l border-gray-300 dark:border-gray-700 ml-3 mt-2">
        {states.map((state, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={state} className="mb-6 ml-6 relative">
              <span
                className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-[35px] ring-4 ring-white dark:ring-gray-900 
                ${isCompleted ? "bg-green-500" : isCurrent ? "bg-blue-500 animate-pulse" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                {isCompleted && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <h4
                className={`text-sm font-semibold tracking-wide ${isCurrent ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-400"}`}
              >
                {state.replace("_", " ")}
              </h4>

              {isCurrent && state === DeploymentStatus.EXECUTING && currentStage && (
                <p className="text-xs text-gray-500 mt-1">
                  Executing Stage:{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {currentStage}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
