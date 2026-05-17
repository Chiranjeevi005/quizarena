import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { validateSuperAdminAccess } from "@/lib/rbac/super-admin";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const validation = await validateSuperAdminAccess();

  if (!validation.authorized) {
    redirect(ROUTES.PROTECTED.DASHBOARD);
  }

  return (
    <div className="super-admin-layout">
      <div className="security-notice">
        <span className="badge">SUPER_ADMIN</span>
        <span className="isolation-indicator">Isolated Security Layer</span>
      </div>
      {children}
    </div>
  );
}