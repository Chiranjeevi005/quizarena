"use client";

import { useWizardStore } from "../context/useWizardStore";

export function CompetitionCertificatesStep() {
  const { currentStep, setStep } = useWizardStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-navy">Certificates</h2>
        <p className="text-gray-500 mt-2">Configure certificates for your competition participants.</p>
      </div>
      
      <div className="flex gap-4">
        <p className="text-gray-500 italic">Certificate Designer coming soon...</p>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setStep(4)}
          className="px-6 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep(6)}
          className="px-6 py-2 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
        >
          Next: Review
        </button>
      </div>
    </div>
  );
}
