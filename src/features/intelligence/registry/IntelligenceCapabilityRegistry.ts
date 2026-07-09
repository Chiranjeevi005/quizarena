export interface IntelligenceProvider {
  name: string;
  analyze(context: string): Promise<string>;
}

export class IntelligenceCapabilityRegistry {
  private providers: Map<string, IntelligenceProvider> = new Map();

  public registerProvider(provider: IntelligenceProvider): void {
    this.providers.set(provider.name, provider);
  }

  public getProvider(name: string): IntelligenceProvider | undefined {
    return this.providers.get(name);
  }

  // Future hook for AI (GPT, Claude, Gemini, Internal AI)
  public async getAIRecommendation(context: string): Promise<string> {
    const provider = this.getProvider("DEFAULT_AI");
    if (provider) {
      return provider.analyze(context);
    }
    return "AI Intelligence not configured yet. Fallback to rule-based recommendation.";
  }
}
