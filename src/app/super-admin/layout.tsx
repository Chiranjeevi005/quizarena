"use client";
import { SuperAdminShellKernel } from "../../super-admin/kernel/SuperAdminShellKernel";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return <SuperAdminShellKernel>{children}</SuperAdminShellKernel>;
}
