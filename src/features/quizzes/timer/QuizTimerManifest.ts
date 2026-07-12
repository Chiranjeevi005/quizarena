import { ComponentRegistry } from "@/registry";
import { QuizTimerConfig } from "./QuizTimerTypes";

export const QuizTimerManifest = {
  id: "quiz-timer-manifest",
  version: "1.0.0",
  initialize() {
    ComponentRegistry.register({
      id: "quiz-timer-platform",
      name: "QuizTimerPlatform",
      category: "quiz",
      subtype: "timer",
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  },
};
