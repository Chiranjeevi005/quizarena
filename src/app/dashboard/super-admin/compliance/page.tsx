/**
 * QuizArena — Compliance Hub
 *
 * Audit systems, regulatory controls, activity logs.
 * Access: SUPER_ADMIN ONLY.
 *
 * Phase 7.1: Foundation stub.
 */

import { redirect } from "next/navigation";
import { validateSuperAdmin } from "@/lib/super-admin/governance";
import { logSuperAdminAudit } from "@/lib/super-admin/audit";
import { ROUTES } from "@/lib/routes";
import {
  ClipboardCheck,
  FileText,
  Scale,
  BarChart3,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Compliance — QuizArena Sovereign",
  description: "Audit systems and compliance governance for Super Admin.",
};

export default async function SuperAdminCompliancePage() {
  const result = await validateSuperAdmin();

  if (!result.authorized || !result.context) {
    redirect(ROUTES.PROTECTED.DASHBOARD);
  }

  await logSuperAdminAudit({
    actorId: result.context.userId,
    actorRole: result.context.role,
    actorEmail: result.context.email,
    action: "COMPLIANCE_HUB_ACCESS",
    category: "COMPLIANCE",
    riskSeverity: "LOW",
    infrastructureImpact: "Compliance section accessed — read only",
    timestamp: new Date(),
  });

  const systems = [
    {
      icon: FileText,
      label: "Audit Logs",
      description:
        "Complete audit trail of all Super Admin operations with risk severity classification.",
      color: "text-blue-400",
      bg: "bg-blue-950/40",
      border: "border-blue-900/30",
    },
    {
      icon: Scale,
      label: "Regulatory Controls",
      description: "Data governance, privacy compliance, and regulatory requirement tracking.",
      color: "text-emerald-400",
      bg: "bg-emerald-950/40",
      border: "border-emerald-900/30",
    },
    {
      icon: BarChart3,
      label: "Governance Reports",
      description:
        "Platform governance reports, access frequency analytics, and compliance metrics.",
      color: "text-purple-400",
      bg: "bg-purple-950/40",
      border: "border-purple-900/30",
    },
    {
      icon: ClipboardCheck,
      label: "RBAC Audit System",
      description:
        "Role hierarchy integrity checks, privilege escalation audits, and security validation.",
      color: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-900/30",
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
              Compliance
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Compliance</h1>
        <p className="text-slate-500 text-sm">
          Audit systems, regulatory controls, and governance reporting.
        </p>
      </div>

      {/* Audit Enforcement Status */}
      <div className="flex items-start gap-3 p-5 bg-emerald-950/20 border border-emerald-800/30 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-emerald-300">Audit Enforcement Active</p>
          <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
            All Super Admin operations are automatically generating structured audit events with
            actor identity, action classification, risk severity, and infrastructure impact
            metadata. The audit enforcement layer is operational in Phase 7.1.
          </p>
        </div>
      </div>

      {/* Foundation Notice */}
      <div className="flex items-start gap-3 p-5 bg-blue-950/20 border border-blue-800/30 rounded-xl">
        <ClipboardCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-300">Phase 7.1 — Foundation Architecture</p>
          <p className="text-xs text-blue-600 mt-1 leading-relaxed">
            Compliance infrastructure is established. Audit logs are being captured server-side.
            Full persistent audit log UI, regulatory controls, and compliance reports will be built
            in Phase 7.x Compliance.
          </p>
        </div>
      </div>

      {/* Compliance Systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((item) => {
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
