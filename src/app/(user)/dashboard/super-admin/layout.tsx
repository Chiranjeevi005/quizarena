export const dynamic = "force-dynamic";

/**
 * QuizArena — Super Admin Sovereign Layout
 *
 * SECURITY-CRITICAL: This layout is the gateway to sovereign authority.
 * ALL /dashboard/super-admin/* routes are wrapped by this layout.
 *
 * Architecture:
 * - Server-side DB-authoritative validation (fail-closed)
 * - Isolated visual system (SuperAdminShell — no DashboardShell dependency)
 * - Sovereign session verification before any content renders
 *
 * This layout is LOGICALLY, VISUALLY, and OPERATIONALLY separated from
 * /dashboard/admin/* and all other dashboard routes.
 */

import { redirect } from "next/navigation";
import { validateSuperAdmin } from "@/lib/super-admin/governance";
import { SuperAdminShell } from "@/components/super-admin/SuperAdminShell";
import { ROUTES } from "@/lib/routes";

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  // DB-authoritative sovereignty check — fail-closed
  const result = await validateSuperAdmin();

  if (!result.authorized || !result.context) {
    // Redirect non-authorized users silently — no error exposure
    redirect(ROUTES.PROTECTED.DASHBOARD);
  }

  // context is guaranteed by the guard above
  const context = result.context!;

  return (
    <SuperAdminShell userEmail={context.email} userName="Super Admin" userImage={null}>
      {children}
    </SuperAdminShell>
  );
}
