export class AnalyticsManifest {
  constructor(
    public readonly schemaVersion: string,
    public readonly aggregationVersion: string,
    public readonly forecastVersion: string,
    public readonly recommendationVersion: string,
    public readonly generatedAt: Date,
    public readonly dataWindowStart: Date,
    public readonly dataWindowEnd: Date
  ) {}

  public static generateCurrent(dataWindowStart: Date, dataWindowEnd: Date): AnalyticsManifest {
    return new AnalyticsManifest(
      "1.0.0",
      "1.1.0",
      "1.0.0",
      "1.0.0",
      new Date(),
      dataWindowStart,
      dataWindowEnd
    );
  }
}
