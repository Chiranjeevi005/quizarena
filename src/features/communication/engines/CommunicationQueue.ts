export type QueueState =
  | "PENDING"
  | "QUEUED"
  | "PROCESSING"
  | "DELIVERED"
  | "FAILED"
  | "RETRYING"
  | "DEAD_LETTER"
  | "ARCHIVED";

export class CommunicationQueue {
  public async enqueue(job: any): Promise<string> {
    const jobId = `MSG-${Date.now()}`;
    // Insert into persistence
    return jobId;
  }

  public async markDelivered(jobId: string): Promise<void> {
    // Update state to DELIVERED
  }

  public async markFailed(jobId: string): Promise<void> {
    // Update state to FAILED
  }
}
