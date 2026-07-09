import { AnalyticsManifest } from "./AnalyticsManifest";

export class AnalyticsSnapshot {
  constructor(
    public readonly snapshotId: string,
    public readonly type: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY",
    public readonly manifest: AnalyticsManifest,
    public readonly data: any
  ) {}
}
