import { ComponentRegistry } from "@/registry";

export class QuizTimerRegistry {
  static registerComponent(
    id: string,
    name: string,
    subtype:
      | "timer"
      | "timer-layout"
      | "timer-status"
      | "timer-progress"
      | "timer-warning"
      | "session-status"
  ) {
    ComponentRegistry.register({
      id,
      name,
      category: "quiz",
      subtype,
      version: "1.0.0",
      status: "stable",
      owner: "QuizArena",
    });
  }
}
