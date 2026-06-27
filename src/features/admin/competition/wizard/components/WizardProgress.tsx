"use client";

import { useWizardStore } from "../context/useWizardStore";
import { Check } from "lucide-react";
import { WizardStep } from "../types/wizard.types";

const STEPS = [
  { id: 1, label: "Basics" },
  { id: 2, label: "Configuration" },
  { id: 3, label: "Participation" },
  { id: 4, label: "Review" },
];

export function WizardProgress({ validSteps }: { validSteps: Record<WizardStep, boolean> }) {
  const { currentStep, setStep } = useWizardStore();

  return (
    <div className="flex items-center justify-between relative max-w-3xl mx-auto mb-10 mt-4">
      {/* Background Line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0" />

      {/* Active Line */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 rounded-full z-0 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
      />

      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        // Navigation is allowed backwards, or forwards if previous steps are valid
        // For simplicity, we can let the parent intercept or just disable clicks for future steps if they aren't reachable.
        // The prompt says: "Prevent navigation to future steps until current step validation passes."
        const isClickable =
          step.id <= currentStep ||
          (step.id === currentStep + 1 && validSteps[currentStep as WizardStep]);

        return (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 px-2"
          >
            <button
              onClick={() => {
                if (isClickable) setStep(step.id as WizardStep);
              }}
              disabled={!isClickable}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                ${
                  isCurrent
                    ? "bg-orange-500 text-white ring-4 ring-orange-100"
                    : isCompleted
                      ? "bg-orange-500 text-white"
                      : "bg-white border-2 border-gray-200 text-gray-400"
                }
                ${isClickable && !isCurrent ? "hover:border-orange-500 hover:text-orange-500 cursor-pointer" : ""}
                ${!isClickable ? "cursor-not-allowed opacity-60" : ""}
              `}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : step.id}
            </button>
            <span
              className={`text-xs font-bold ${isCurrent ? "text-orange-600" : isCompleted ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
