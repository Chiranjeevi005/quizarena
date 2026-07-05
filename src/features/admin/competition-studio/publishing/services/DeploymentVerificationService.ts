import { PrismaClient, DeploymentStatus } from "@/generated/prisma";
import { DeploymentStateMachine } from "./DeploymentStateMachine";
import { StageRegistry } from "./StageRegistry";

const prisma = new PrismaClient();

export class DeploymentVerificationService {
  /**
   * Runs verification on all completed stages to ensure the deployment was successful.
   * If verification passes, promotes the deployment to ACTIVATING.
   */
  public async verify(deploymentId: string): Promise<boolean> {
    const deployment = await prisma.publishDeployment.findUnique({
      where: { id: deploymentId },
      include: { stages: true },
    });

    if (!deployment) throw new Error("Deployment not found");

    DeploymentStateMachine.requireValidTransition(deployment.status, DeploymentStatus.ACTIVATING);

    let allVerified = true;

    for (const stage of deployment.stages) {
      if (stage.status !== "COMPLETED" && stage.status !== "SKIPPED") {
        allVerified = false;
        break;
      }

      if (stage.status === "COMPLETED") {
        const executor = StageRegistry.getExecutor(stage.stage);
        const isVerified = await executor.verify(deploymentId, {});

        if (!isVerified) {
          allVerified = false;
          // Mark stage as failed verification
          await prisma.deploymentStage.update({
            where: { id: stage.id },
            data: { status: "FAILED", logs: { error: "Verification failed" } },
          });
        }
      }
    }

    if (allVerified) {
      await prisma.publishDeployment.update({
        where: { id: deploymentId },
        data: { status: DeploymentStatus.ACTIVATING },
      });
      return true;
    } else {
      await prisma.publishDeployment.update({
        where: { id: deploymentId },
        data: { status: DeploymentStatus.FAILED },
      });
      return false;
    }
  }
}
