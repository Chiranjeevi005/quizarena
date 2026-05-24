/**
 * QuizArena — Security Center Hub
 *
 * Threat monitoring, security events, access anomalies.
 * Access: SUPER_ADMIN ONLY.
 *
 * Phase 7.1: Foundation stub.
 */

import { redirect } from "next/navigation";
import { validateSuperAdmin } from "@/lib/super-admin/governance";
import { logSuperAdminAudit } from "@/lib/super-admin/audit";
import { ROUTES } from "@/lib/routes";
import { ShieldAlert, AlertTriangle, Eye, Zap, ArrowRight, Lock, Shield } from "lucide-react";

export const metadata = {
  title: "Security Center — QuizArena Sovereign",
  description: "Threat monitoring and security intelligence for Super Admin.",
};

export default async function SuperAdminSecurityPage() {
  const result = await validateSuperAdmin();

  if (!result.authorized || !result.context) {
    redirect(ROUTES.PROTECTED.DASHBOARD);
  }

  await logSuperAdminAudit({
    actorId: result.context.userId,
    actorRole: result.context.role,
    actorEmail: result.context.email,
    action: "SECURITY_CENTER_ACCESS",
    category: "SECURITY",
    riskSeverity: "MEDIUM",
    infrastructureImpact: "Security center accessed — monitoring only",
    timestamp: new Date(),
  });

  const features = [
    {
      icon: Eye,
      label: "Threat Monitoring",
      description: "Real-time threat detection, anomaly alerts, and security event feeds.",
      color: "text-red-400",
      bg: "bg-red-950/40",
      border: "border-red-900/30",
    },
    {
      icon: AlertTriangle,
      label: "Access Anomalies",
      description:
        "Unauthorized access attempts, privilege escalation events, and session anomalies.",
      color: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-900/30",
    },
    {
      icon: Zap,
      label: "Incident Response",
      description: "Security incident logging, response workflows, and remediation tracking.",
      color: "text-purple-400",
      bg: "bg-purple-950/40",
      border: "border-purple-900/30",
    },
    {
      icon: Shield,
      label: "RBAC Audit",
      description: "Role-based access control integrity verification and escalation detection.",
      color: "text-blue-400",
      bg: "bg-blue-950/40",
      border: "border-blue-900/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-950/40 border border-red-800/40 rounded-full">
            <Lock className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">
              Security Center
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Security Center</h1>
        <p className="text-slate-500 text-sm">
          Threat monitoring, security intelligence, and incident response.
        </p>
      </div>

      {/* Foundation Notice */}
      <div className="flex items-start gap-3 p-5 bg-blue-950/20 border border-blue-800/30 rounded-xl">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-300">Phase 7.1 — Foundation Architecture</p>
          <p className="text-xs text-blue-600 mt-1 leading-relaxed">
            Security Center boundary is established. Full threat monitoring, anomaly detection, and
            incident response systems will be built in Phase 7.x Security Intelligence.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`p-5 rounded-xl bg-slate-900/60 border ${item.border} opacity-75`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg shrink-0 ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-200 mb-1">{item.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2.5">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-800 rounded-full px-2.5 py-1">
                    <ArrowRight className="w-3 h-3" />
                    Coming Phase 7.x
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
