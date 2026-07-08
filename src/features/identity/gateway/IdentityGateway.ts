export interface IdentityGatewayOptions {
  enableCache?: boolean;
  telemetryEnabled?: boolean;
}

/**
 * The IdentityGateway acts as the primary entrance to the Identity Domain.
 * It strictly separates Authentication (Who are you?) from Identity (What can you do?).
 */
class IdentityGatewayClass {
  private options: IdentityGatewayOptions = { enableCache: true, telemetryEnabled: true };

  configure(options: IdentityGatewayOptions) {
    this.options = { ...this.options, ...options };
  }

  // Gateway initializes the kernel boundary
  async initialize() {
    console.log("[IdentityGateway] Initializing Identity Domain...");
  }
}

export const IdentityGateway = new IdentityGatewayClass();
