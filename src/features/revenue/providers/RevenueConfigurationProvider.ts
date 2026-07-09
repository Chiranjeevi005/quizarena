import { GstConfiguration, PaymentPolicy, PricingPolicyType } from "../../../generated/prisma";

export interface GstConfigResolution {
  version: number;
  enabled: boolean;
  percentage: number;
  invoicePrefix: string;
  businessName: string;
  panNumber: string;
  gstin: string;
}

export interface RevenueConfigurationProvider {
  /**
   * Resolve the active GST configuration for new invoices.
   */
  getActiveGstConfiguration(): Promise<GstConfigResolution>;

  /**
   * Resolve a specific historical GST configuration version tied to an invoice.
   */
  getGstConfigurationByVersion(version: number): Promise<GstConfigResolution>;

  /**
   * Resolve active payment policy (timeouts, retries).
   */
  getActivePaymentPolicy(): Promise<PaymentPolicy>;

  /**
   * Resolve pricing policy by version
   */
  getPricingPolicyVersion(competitionId: string, version: number): Promise<any>;
}

export class DefaultRevenueConfigurationProvider implements RevenueConfigurationProvider {
  // Database client injected here (e.g. PrismaClient)
  constructor(private readonly db: any) {}

  public async getActiveGstConfiguration(): Promise<GstConfigResolution> {
    const config = await this.db.gstConfiguration.findFirst({
      where: { isActive: true },
      orderBy: { version: "desc" },
    });

    if (!config) {
      throw new Error("No active GST configuration found.");
    }

    return this.mapToResolution(config);
  }

  public async getGstConfigurationByVersion(version: number): Promise<GstConfigResolution> {
    const config = await this.db.gstConfiguration.findFirst({
      where: { version },
    });

    if (!config) {
      throw new Error(`GST configuration version ${version} not found.`);
    }

    return this.mapToResolution(config);
  }

  public async getActivePaymentPolicy(): Promise<PaymentPolicy> {
    const policy = await this.db.paymentPolicy.findFirst({
      where: { isActive: true },
      orderBy: { version: "desc" },
    });

    if (!policy) {
      throw new Error("No active Payment Policy found.");
    }
    return policy;
  }

  public async getPricingPolicyVersion(competitionId: string, version: number): Promise<any> {
    const policy = await this.db.competitionPricingPolicy.findUnique({
      where: {
        competitionId_version: {
          competitionId,
          version,
        },
      },
    });

    if (!policy) {
      throw new Error(
        `Pricing policy version ${version} for competition ${competitionId} not found.`
      );
    }
    return policy;
  }

  private mapToResolution(config: any): GstConfigResolution {
    return {
      version: config.version,
      enabled: config.gstEnabled,
      percentage: config.gstPercentage,
      invoicePrefix: config.invoicePrefix,
      businessName: config.businessName || "",
      panNumber: config.panNumber || "",
      gstin: config.gstin || "",
    };
  }
}
