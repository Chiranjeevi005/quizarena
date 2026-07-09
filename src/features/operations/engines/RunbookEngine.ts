export interface Runbook {
  issue: string;
  suggestedRecovery: string;
  commands: string[];
  verification: string;
  documentationUrl: string;
}

export class RunbookEngine {
  private runbooks: Record<string, Runbook> = {
    WORKER_FAILURE: {
      issue: "Asynchronous worker stalled or crashed",
      suggestedRecovery: "Restart the specific worker pool and replay DLQ",
      commands: ["npm run worker:restart", "npm run queue:replay"],
      verification: "Check worker health status in Operations Dashboard",
      documentationUrl: "https://docs.quizarena.internal/runbooks/worker-failure",
    },
  };

  public getRunbook(issueKey: string): Runbook | null {
    return this.runbooks[issueKey] || null;
  }
}
