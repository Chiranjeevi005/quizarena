import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { validateSuperAdminAccess, requireSuperAdmin } from "@/lib/rbac/super-admin";
import Link from "next/link";

export default async function SuperAdminHomePage() {
  await requireSuperAdmin(ROUTES.PROTECTED.DASHBOARD);

  return (
    <div className="super-admin-dashboard">
      <div className="page-header">
        <h1>Super Admin Dashboard</h1>
        <p className="subtitle">Platform Authority — Highest Privilege Level</p>
      </div>

      <div className="security-status">
        <div className="status-badge active">
          <span className="indicator"></span>
          Session Verified
        </div>
        <div className="status-badge isolated">
          <span className="indicator"></span>
          Security Layer Active
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card critical">
          <div className="card-header">
            <h2>Financial Systems</h2>
            <span className="access-level">SUPER_ADMIN ONLY</span>
          </div>
          <div className="card-content">
            <p>Access to revenue analytics, payouts, subscriptions, and payment operations.</p>
            <div className="action-links">
              <Link href="/dashboard/financials" className="action-link">
                Revenue Analytics
              </Link>
              <Link href="/dashboard/payouts" className="action-link">
                Payout Management
              </Link>
              <Link href="/dashboard/subscriptions" className="action-link">
                Subscription Diagnostics
              </Link>
            </div>
          </div>
        </section>

        <section className="dashboard-card critical">
          <div className="card-header">
            <h2>Role Management</h2>
            <span className="access-level">SUPER_ADMIN ONLY</span>
          </div>
          <div className="card-content">
            <p>Promote, demote, and manage privileged roles across the platform.</p>
            <div className="action-links">
              <Link href="/dashboard/roles" className="action-link">
                Role Administration
              </Link>
              <Link href="/dashboard/admin-management" className="action-link">
                Admin Management
              </Link>
              <Link href="/dashboard/user-roles" className="action-link">
                User Role Assignment
              </Link>
            </div>
          </div>
        </section>

        <section className="dashboard-card infrastructure">
          <div className="card-header">
            <h2>Infrastructure Control</h2>
            <span className="access-level">SUPER_ADMIN ONLY</span>
          </div>
          <div className="card-content">
            <p>Platform settings, feature flags, environment controls, and maintenance systems.</p>
            <div className="action-links">
              <Link href="/dashboard/platform-settings" className="action-link">
                Platform Settings
              </Link>
              <Link href="/dashboard/feature-flags" className="action-link">
                Feature Flags
              </Link>
              <Link href="/dashboard/infrastructure" className="action-link">
                Infrastructure Overview
              </Link>
            </div>
          </div>
        </section>

        <section className="dashboard-card">
          <div className="card-header">
            <h2>Platform Analytics</h2>
            <span className="access-level">SUPER_ADMIN ONLY</span>
          </div>
          <div className="card-content">
            <p>Comprehensive platform-wide analytics and reporting.</p>
            <div className="action-links">
              <Link href="/dashboard/platform/analytics" className="action-link">
                Platform Analytics
              </Link>
              <Link href="/dashboard/platform/reports" className="action-link">
                Reports
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="security-notice-footer">
        <p>
          <strong>Security Notice:</strong> All actions on this dashboard are logged and audited.
          Elevated actions may require additional verification.
        </p>
      </div>
    </div>
  );
}