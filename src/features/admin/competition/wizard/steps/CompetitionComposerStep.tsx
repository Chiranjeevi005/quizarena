"use client";

import { useWizardStore } from "../context/useWizardStore";
import { ComposerBuilder } from "../components/composer/ComposerBuilder";
import { AssessmentIntelligenceKernel } from "../components/intelligence/AssessmentIntelligenceKernel";

export function CompetitionComposerStep() {
  const { currentStep, setStep } = useWizardStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy">Assessment Composer</h2>
          <p className="text-gray-500 mt-2">
            Design the structure of your competition and add questions.
          </p>
        </div>
        <button
          onClick={() => {
            // Trigger Question Explorer Sidebar opening via event bus (implemented via layout/context in real app)
            alert("Open Question Explorer - Integrated via Layout event bus");
          }}
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
    </div>
  );
}
