export interface IBackgroundJob<TPayload, TResult> {
  execute(jobId: string, payload: TPayload): Promise<TResult>;
}
