import { CompetitionWizard } from "@/features/admin/competition/wizard/components/CompetitionWizard";

export const metadata = {
  title: "Create Competition | Admin Dashboard",
  description: "Create a new competition in the Competition Studio.",
};

export default function CompetitionWizardPage() {
  return <CompetitionWizard />;
}
