import { createContext, useContext } from "react";
import { QuizDeliveryState } from "./QuizDeliveryState";
import { QuizDeliveryLayout } from "./QuizDeliveryLayout";
import { QuizDeliveryVariant } from "./QuizDeliveryVariant";
import { QuizDeliveryStage } from "./QuizDeliveryStage";
import { QuizDeliveryMode } from "./QuizDeliveryMode";
import { QuizDeliveryAction } from "./QuizDeliveryTypes";
import { DeliveryPresentation } from "./DeliveryPresentation";
import { DeliveryWorkspacePresentation } from "./DeliveryWorkspacePresentation";
import { DeliveryStagePresentation } from "./DeliveryStagePresentation";

export interface QuizDeliveryContextValue {
  state: QuizDeliveryState;
  deliveryStage: QuizDeliveryStage;
  layout: QuizDeliveryLayout;
  variant: QuizDeliveryVariant;
  mode: QuizDeliveryMode;
  compactMode: boolean;
  fullscreenMode: boolean;
  sidebarVisible: boolean;
  navigationVisible: boolean;
  timerVisible: boolean;
  inspectorVisible: boolean;
  toolbarVisible: boolean;
  activeWorkspace: string | null;
  presentation: DeliveryPresentation | null;
  workspacePresentation: DeliveryWorkspacePresentation | null;
  stagePresentation: DeliveryStagePresentation | null;
  dispatch: (action: QuizDeliveryAction) => void;
}

export const QuizDeliveryContext = createContext<QuizDeliveryContextValue | null>(null);

export function useQuizDelivery() {
  const context = useContext(QuizDeliveryContext);
  if (!context) {
    throw new Error("useQuizDelivery must be used within a QuizDeliveryProvider");
  }
  return context;
}
