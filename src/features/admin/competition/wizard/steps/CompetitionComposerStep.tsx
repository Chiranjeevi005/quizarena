"use client";

import React, { useState } from "react";
import { useWizardStore } from "../context/useWizardStore";
import { ComposerBuilder } from "../components/composer/ComposerBuilder";
import { AssessmentIntelligenceKernel } from "../components/intelligence/AssessmentIntelligenceKernel";
import { QuestionExplorerKernel } from "../../../competition-studio/explorer/kernel/QuestionExplorerKernel";
import { CompetitionStudioProvider } from "../../../competition-studio/studio/context/CompetitionStudioProvider";

export function CompetitionComposerStep() {
  const { currentStep, setStep } = useWizardStore();
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy">Assessment Composer</h2>
          <p className="text-gray-500 mt-2">
            Design the structure of your competition and add questions.
          </p>
        </div>
        <button
          onClick={() => setIsExplorerOpen(true)}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Open Explorer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white">
          <ComposerBuilder />
        </div>
        <div className="lg:col-span-1">
          <AssessmentIntelligenceKernel />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-6 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep(4)}
          className="px-6 py-2 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
        >
          Next: Access & Schedule
        </button>
      </div>

      {/* Explorer Modal */}
      {isExplorerOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div 
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsExplorerOpen(false)} 
          />
          <div className="relative w-full h-full bg-white flex flex-col pt-14 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <button 
              onClick={() => setIsExplorerOpen(false)} 
              className="absolute top-4 right-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-700 transition-colors z-50 flex items-center gap-2 font-bold shadow-sm"
            >
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Close Explorer
            </button>
            <div className="flex-1 overflow-hidden relative">
              <CompetitionStudioProvider competitionId="wizard-draft">
                <QuestionExplorerKernel onReviewSelection={() => setIsExplorerOpen(false)} />
              </CompetitionStudioProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
