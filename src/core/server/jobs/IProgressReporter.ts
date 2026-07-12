import { JobStage } from "@/generated/prisma";

export interface IProgressReporter {
  reportProgress(
    jobId: string,
    processed: number,
    remaining: number,
    failed: number,
    stage: JobStage
  ): Promise<void>;
  reportWarning(jobId: string, message: string): Promise<void>;
}
