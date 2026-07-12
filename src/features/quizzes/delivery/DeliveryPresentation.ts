import { QuizDeliveryState } from "./QuizDeliveryState";
import { QuizDeliveryStage } from "./QuizDeliveryStage";

export interface DeliveryPresentation {
  id: string;
  title: string;
  state: QuizDeliveryState;
  currentStage: QuizDeliveryStage;
}
