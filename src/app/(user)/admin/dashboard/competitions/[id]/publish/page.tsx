import { requireAdmin } from "@/features/rbac/constants/authorization";
import { AdminWorkspaceGuard } from "@/components/guards/AdminWorkspaceGuard";
import { CompetitionStudioLayout } from "@/features/admin/competition/components/CompetitionStudioLayout";
import { CompetitionService } from "@/features/admin/competition/services/competition.service";
import { notFound } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default async function CompetitionPublishPage({ params }: { params: { id: string } }) {
  const user = await requireAdmin();
  if (!user || !user.id) return null;
  const competition = await CompetitionService.getCompetitionById(params.id);

  if (!competition) notFound();

  const preconditions = await CompetitionService.checkPublishPreconditions(params.id);

  return (
    <AdminWorkspaceGuard userId={user.id as string} role={user.role as any}>
      <CompetitionStudioLayout competitionId={competition.id} title={competition.title}>
        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Publish Checklist</h2>
          <p className="text-muted-foreground mb-6">
            Review the preconditions below before publishing this competition.
          </p>

          <div className="space-y-3 mb-8">
            {preconditions.checks.map((check) => (
              <div key={check.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
                {check.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                ) : check.severity === "error" ? (
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                )}
                <div>
                  <h4 className="font-medium">{check.label}</h4>
                  {check.message && (
                    <p className="text-sm text-muted-foreground">{check.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              disabled={!preconditions.canPublish}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Publish Competition
            </button>
          </div>
        </div>
      </CompetitionStudioLayout>
    </AdminWorkspaceGuard>
  );
}
