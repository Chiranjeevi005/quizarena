export interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  actionLabel: string;
  actionLink: string;
}

export interface PlatformSetupManifest {
  version: string;
  completed: boolean;
  progress: number;
  steps: SetupStep[];
}

class PlatformSetupEngineClass {
  private manifest: PlatformSetupManifest = {
    version: "1.0.0",
    completed: false,
    progress: 0,
    steps: [
      {
        id: "invite-sme",
        title: "Invite Subject Matter Experts",
        description: "Add your first SME to start creating competition content.",
        status: "pending",
        actionLabel: "Invite SME",
        actionLink: "/super-admin/people/invite",
      },
      {
        id: "configure-branding",
        title: "Configure Platform Branding",
        description: "Set up logos, colors, and tenant themes.",
        status: "pending",
        actionLabel: "Settings",
        actionLink: "/super-admin/settings",
      },
      {
        id: "create-competition",
        title: "Create First Competition",
        description: "Draft your first competition instance.",
        status: "pending",
        actionLabel: "Create",
        actionLink: "/super-admin/competitions/new",
      },
    ],
  };

  getManifest(): PlatformSetupManifest {
    return this.manifest;
  }

  updateStepStatus(id: string, status: SetupStep["status"]) {
    const step = this.manifest.steps.find((s) => s.id === id);
    if (step) {
      step.status = status;
      this.recalculateProgress();
    }
  }

  private recalculateProgress() {
    const total = this.manifest.steps.length;
    const completed = this.manifest.steps.filter((s) => s.status === "completed").length;
    this.manifest.progress = Math.round((completed / total) * 100);
    this.manifest.completed = completed === total;
  }
}

export const PlatformSetupEngine = new PlatformSetupEngineClass();
