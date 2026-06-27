import {
  CompetitionType,
  ExamCategory,
  ChallengeDifficulty,
  CompetitionVisibility,
} from "@/generated/prisma";
import { z } from "zod";
import {
  competitionBasicsSchema,
  competitionConfigSchema,
  competitionParticipationSchema,
} from "../validators/wizard.validators";

export type CompetitionBasicsData = z.infer<typeof competitionBasicsSchema>;
export type CompetitionConfigData = z.infer<typeof competitionConfigSchema>;
export type CompetitionParticipationData = z.infer<typeof competitionParticipationSchema>;

export interface WizardDraftData {
  basics: Partial<CompetitionBasicsData>;
  config: Partial<CompetitionConfigData>;
  participation: Partial<CompetitionParticipationData>;
}

export type WizardStep = 1 | 2 | 3 | 4;
export type SavingState = "idle" | "saving" | "saved" | "error";

export interface WizardState {
  sessionId: string;
  sessionVersion: number;
  currentStep: WizardStep;
  draftData: WizardDraftData;
  savingState: SavingState;
  lastSavedAt: number | null;

  // Actions
  setStep: (step: WizardStep) => void;
  updateBasics: (data: Partial<CompetitionBasicsData>) => void;
  updateConfig: (data: Partial<CompetitionConfigData>) => void;
  updateParticipation: (data: Partial<CompetitionParticipationData>) => void;
  setSavingState: (state: SavingState) => void;
  incrementVersion: () => void;
  resetWizard: () => void;
}
