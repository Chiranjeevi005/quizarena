import { redirect } from "next/navigation";
import { requireSuperAdmin } from "@/lib/rbac/super-admin";
import { ROUTES } from "@/lib/routes";

export default async function SuperAdminDashboardPage() {
  try {
    await requireSuperAdmin(ROUTES.PROTECTED.DASHBOARD);
  } catch {
    redirect(ROUTES.PROTECTED.DASHBOARD);
  }

  redirect("/dashboard/home");
}
