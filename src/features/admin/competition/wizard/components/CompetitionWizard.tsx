"use client";

import { useState, useEffect } from "react";
import { useWizardStore } from "../context/useWizardStore";
import { CompetitionWizardLayout } from "./CompetitionWizardLayout";
import { WizardProgress } from "./WizardProgress";
import { CompetitionBasicsStep } from "../steps/CompetitionBasicsStep";
import { CompetitionTemplateStep } from "../steps/CompetitionTemplateStep";
import { CompetitionComposerStep } from "../steps/CompetitionComposerStep";
import { CompetitionAccessScheduleStep } from "../steps/CompetitionAccessScheduleStep";
import { CompetitionCertificatesStep } from "../steps/CompetitionCertificatesStep";
import { CompetitionReviewStep } from "../steps/CompetitionReviewStep";
import { CompetitionFreezeStep } from "../steps/CompetitionFreezeStep";
import { CompetitionPublishStep } from "../steps/CompetitionPublishStep";

export function CompetitionWizard() {
  const { currentStep, draftData } = useWizardStore();
  const [validSteps, setValidSteps] = useState<Record<number, boolean>>({
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false,
  });

  useEffect(() => {
    // Dynamic validation
    // In a real app we'd import the Zod schemas and validate draftData.
    // For now we assume if a step is visited or has basic data it's "valid enough" to proceed for testing the flow,
    // or we can strictly enforce it. Let's strictly enforce Basics.
    const isBasicsValid = draftData.basics?.title && draftData.basics?.competitionType ? true : false;
    
    setValidSteps({
      1: !!isBasicsValid,
      2: true, // Template optional
      3: true, // Composer can be empty initially
      4: true, 
      5: true, 
      6: true, 
      7: true, 
      8: true, 
    });
  }, [draftData]);

  return (
    <CompetitionWizardLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <WizardProgress validSteps={validSteps} />
        
        <div className="mt-8">
          {currentStep === 1 && <CompetitionBasicsStep onValidationChange={() => {}} />}
          {currentStep === 2 && <CompetitionTemplateStep />}
          {currentStep === 3 && <CompetitionComposerStep />}
          {currentStep === 4 && <CompetitionAccessScheduleStep onValidationChange={() => {}} />}
          {currentStep === 5 && <CompetitionCertificatesStep />}
          {currentStep === 6 && <CompetitionReviewStep />}
          {currentStep === 7 && <CompetitionFreezeStep />}
          {currentStep === 8 && <CompetitionPublishStep />}
        </div>
      </div>
    </CompetitionWizardLayout>
  );
}
