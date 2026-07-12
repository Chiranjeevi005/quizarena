export interface IRetryableJob {
  retry(jobId: string): Promise<void>;
}
