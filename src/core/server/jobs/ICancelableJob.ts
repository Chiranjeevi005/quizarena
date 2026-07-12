export interface ICancelableJob {
  cancel(jobId: string, reason?: string): Promise<void>;
}
