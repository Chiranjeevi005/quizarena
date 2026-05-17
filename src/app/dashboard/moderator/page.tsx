import { redirect } from "next/navigation";
import { requireModerator } from "@/lib/rbac/guards";

export default async function ModeratorDashboardPage() {
  try {
    await requireModerator("/dashboard");
  } catch {
    redirect("/dashboard");
  }

  redirect("/dashboard/home");
}
