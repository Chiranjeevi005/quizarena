export interface QuizDeliveryManifest {
  version: string;
  capabilities: string[];
}

export const QUIZ_DELIVERY_MANIFEST: QuizDeliveryManifest = {
  version: "1.0.0",
  capabilities: ["orchestration", "composition", "layout"],
};
