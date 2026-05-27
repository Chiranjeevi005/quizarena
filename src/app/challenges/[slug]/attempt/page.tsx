/**
 * QuizArena — Legacy Attempt Route Redirect
 *
 * This route is deprecated. All exam functionality has moved
 * to /dashboard/challenges/[slug].
 *
 * Redirects to the canonical exam route.
 */

import { redirect } from "next/navigation";

interface AttemptPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AttemptPage({ params }: AttemptPageProps) {
  const { slug } = await params;
  redirect(`/dashboard/challenges/${slug}`);
}
