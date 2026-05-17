import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/rbac/guards";

export default async function AdminDashboardPage() {
  try {
    await requireAdmin("/dashboard");
  } catch {
    redirect("/dashboard");
  }

  redirect("/dashboard/home");
}
