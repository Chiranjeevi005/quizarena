export class QuizDeliveryRegistry {
  private static instance: QuizDeliveryRegistry;
  private components: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): QuizDeliveryRegistry {
    if (!QuizDeliveryRegistry.instance) {
      QuizDeliveryRegistry.instance = new QuizDeliveryRegistry();
    }
    return QuizDeliveryRegistry.instance;
  }

  public register(id: string, component: any): void {
    this.components.set(id, component);
  }

  public get(id: string): any {
    return this.components.get(id);
  }
}
