export interface SessionContext {
  deviceType: "desktop" | "mobile" | "tablet" | "unknown";
  ipAddress: string;
  countryCode: string;
  isVpn: boolean;
  timeSinceLastActivityMs: number;
}

export interface RiskAnalysis {
  score: number; // 0-100
  factors: string[];
}

export class SessionRiskEngine {
  static analyze(session: SessionContext): RiskAnalysis {
    let score = 0;
    const factors: string[] = [];

    if (session.isVpn) {
      score += 20;
      factors.push("VPN or Proxy detected");
    }

    if (session.deviceType === "unknown") {
      score += 15;
      factors.push("Unknown device fingerprint");
    }

    // e.g. If inactivity > 7 days
    if (session.timeSinceLastActivityMs > 7 * 24 * 60 * 60 * 1000) {
      score += 30;
      factors.push("Prolonged inactivity");
    }

    // Hardcode some risky countries for MVP simulation
    const highRiskCountries = ["XX", "YY"];
    if (highRiskCountries.includes(session.countryCode)) {
      score += 40;
      factors.push("Login from flagged region");
    }

    return {
      score: Math.min(score, 100),
      factors,
    };
  }
}
