import { QuizDeliveryStage } from "./QuizDeliveryStage";

export interface DeliveryStagePresentation {
  stage: QuizDeliveryStage;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  illustration?: string;
  availableActions: string[];
}
