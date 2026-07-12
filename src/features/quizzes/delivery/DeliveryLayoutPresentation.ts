import { QuizDeliveryLayout } from "./QuizDeliveryLayout";

export interface DeliveryLayoutPresentation {
  layoutType: QuizDeliveryLayout;
  sidebarVisible: boolean;
  timerVisible: boolean;
  navigationVisible: boolean;
  toolbarVisible: boolean;
  inspectorVisible: boolean;
  compactMode: boolean;
  fullscreenMode: boolean;
}
