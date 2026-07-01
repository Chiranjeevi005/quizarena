import React from 'react';
import { DeploymentStageType } from '@/generated/prisma';

interface DeploymentChecklistProps {
  stages: DeploymentStageType[];
  completedStages: DeploymentStageType[];
  currentStage: DeploymentStageType | null;
}

export function DeploymentChecklist({ stages, completedStages, currentStage }: DeploymentChecklistProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Deployment Matrix</h3>
      <div className="grid grid-cols-2 gap-4">
        {stages.map((stage) => {
          const isCompleted = completedStages.includes(stage);
          const isCurrent = currentStage === stage;
          const isPending = !isCompleted && !isCurrent;

          return (
            <div 
              key={stage} 
              className={`flex items-center p-3 rounded-md border 
                ${isCompleted ? 'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20' : 
                  isCurrent ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30 ring-1 ring-blue-500 animate-pulse' : 
                  'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'}`}
            >
              <div className="mr-3">
                {isCompleted && (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {isCurrent && (
                  <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {isPending && (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                )}
              </div>
              <div>
                <span className={`text-sm font-medium ${
                  isCompleted ? 'text-green-800 dark:text-green-300' : 
                  isCurrent ? 'text-blue-800 dark:text-blue-300' : 
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stage.replace('_', ' ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
