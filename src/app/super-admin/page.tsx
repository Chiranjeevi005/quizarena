import React from "react";
import { DashboardKernel } from "../../super-admin/dashboard/DashboardKernel";

export const metadata = {
  title: "Super Admin Dashboard | QuizArena",
  description: "Central governance console for QuizArena",
};

export default function SuperAdminDashboardPage() {
  return (
    <div className="h-full">
      <DashboardKernel />
    </div>
  );
}
