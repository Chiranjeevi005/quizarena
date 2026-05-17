import { redirect } from "next/navigation";
import { requireModerator } from "@/lib/rbac/guards";
import { ROUTES } from "@/lib/routes";

export default async function ModeratorDashboardPage() {
  try {
    await requireModerator("/dashboard");
  } catch {
    redirect("/dashboard");
  }

  redirect(ROUTES.MODERATOR.CHALLENGES);
}
