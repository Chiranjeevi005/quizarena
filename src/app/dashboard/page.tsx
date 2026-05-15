/**
 * QuizArena — Dashboard Entry Point
 *
 * Redirects to the default dashboard home view.
 * All dashboard sub-routes are handled by /dashboard/[route]/page.tsx
 */
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/home");
}
