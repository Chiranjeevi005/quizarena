import { create } from "zustand";
import { DeploymentStatus, DeploymentStageType, DeploymentResult } from "@/generated/prisma";

interface DeploymentState {
  isDeploying: boolean;
  deploymentId: string | null;
  status: DeploymentStatus | null;
  currentStage: DeploymentStageType | null;
  completedStages: DeploymentStageType[];
  result: DeploymentResult | null;

  setDeploying: (isDeploying: boolean, deploymentId?: string) => void;
  updateStatus: (status: DeploymentStatus) => void;
  updateStage: (stage: DeploymentStageType, completed: boolean) => void;
  setResult: (result: DeploymentResult) => void;
  reset: () => void;
}

export const useDeploymentStore = create<DeploymentState>((set) => ({
  isDeploying: false,
  deploymentId: null,
  status: null,
  currentStage: null,
  completedStages: [],
  result: null,

  setDeploying: (isDeploying, deploymentId) =>
    set((state) => ({
      isDeploying,
      deploymentId: deploymentId || state.deploymentId,
    })),

  updateStatus: (status) => set({ status }),

  updateStage: (stage, completed) =>
    set((state) => {
      if (completed) {
        return {
          currentStage: null,
          completedStages: [...state.completedStages, stage],
        };
      } else {
        return { currentStage: stage };
      }
    }),

  setResult: (result) => set({ result }),

  reset: () =>
    set({
      isDeploying: false,
      deploymentId: null,
      status: null,
      currentStage: null,
      completedStages: [],
      result: null,
    }),
}));
