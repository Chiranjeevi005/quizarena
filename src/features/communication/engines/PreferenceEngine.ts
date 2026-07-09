export class PreferenceEngine {
  public async resolveRouting(userId: string, notificationType: string): Promise<string[]> {
    // Evaluate Email, Push, SMS, Quiet Hours
    // Default to Email and In-App
    return ["EMAIL", "IN_APP"];
  }
}
