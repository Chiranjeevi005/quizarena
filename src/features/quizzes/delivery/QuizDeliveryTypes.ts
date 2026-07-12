import { QuizDeliveryStage } from "./QuizDeliveryStage";
import { QuizDeliveryLayout } from "./QuizDeliveryLayout";
import { QuizDeliveryState } from "./QuizDeliveryState";
import { DeliveryStagePresentation } from "./DeliveryStagePresentation";

export type QuizDeliveryAction =
  | { type: "SET_STAGE"; payload: QuizDeliveryStage }
  | { type: "SET_LAYOUT"; payload: QuizDeliveryLayout }
  | { type: "SET_STATE"; payload: QuizDeliveryState }
  | { type: "SET_STAGE_PRESENTATION"; payload: DeliveryStagePresentation }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_FULLSCREEN" }
  | { type: "TOGGLE_TIMER" }
  | { type: "TOGGLE_COMPACT_MODE" };
