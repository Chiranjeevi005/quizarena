export class QuizReviewRegistry {
  private static instance: QuizReviewRegistry;
  private components: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): QuizReviewRegistry {
    if (!QuizReviewRegistry.instance) {
      QuizReviewRegistry.instance = new QuizReviewRegistry();
    }
    return QuizReviewRegistry.instance;
  }

  public register(id: string, component: any): void {
    this.components.set(id, component);
  }

  public get(id: string): any {
    return this.components.get(id);
  }
}
