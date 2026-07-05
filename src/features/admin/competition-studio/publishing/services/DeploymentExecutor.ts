import { PrismaClient, DeploymentStatus, StageStatus } from "@/generated/prisma";
import { DeploymentStateMachine } from "./DeploymentStateMachine";
import { StageRegistry } from "./StageRegistry";

const prisma = new PrismaClient();

export class DeploymentExecutor {
  /**
   * Executes the deployment stages iteratively.
   */
  public async execute(deploymentId: string) {
    const deployment = await prisma.publishDeployment.findUnique({
      where: { id: deploymentId },
      include: { stages: true },
    });

    if (!deployment) throw new Error("Deployment not found");

    // State validation
    DeploymentStateMachine.requireValidTransition(deployment.status, DeploymentStatus.EXECUTING);

    await prisma.publishDeployment.update({
      where: { id: deploymentId },
      data: { status: DeploymentStatus.EXECUTING },
    });

    const sortedStages = deployment.stages.sort((a, b) => {
      const configA = StageRegistry.getConfig(a.stage);
      const configB = StageRegistry.getConfig(b.stage);
      return configA.order - configB.order;
    });

    for (const stage of sortedStages) {
      if (stage.status === "COMPLETED" || stage.status === "SKIPPED") {
        continue; // Already done
      }

      const executor = StageRegistry.getExecutor(stage.stage);

      await prisma.deploymentStage.update({
        where: { id: stage.id },
        data: { status: "IN_PROGRESS" },
      });

      try {
        await executor.execute(deploymentId, {});

        await prisma.deploymentStage.update({
          where: { id: stage.id },
          data: { status: "COMPLETED" },
        });
      } catch (error) {
        await prisma.deploymentStage.update({
          where: { id: stage.id },
          data: {
            status: "FAILED",
            logs: { error: error instanceof Error ? error.message : "Unknown error" },
          },
        });

        // Fail deployment
        await prisma.publishDeployment.update({
          where: { id: deploymentId },
          data: { status: DeploymentStatus.FAILED },
        });

        throw error;
      }
    }

    // All stages complete, transition to verifying
    DeploymentStateMachine.requireValidTransition(
      DeploymentStatus.EXECUTING,
      DeploymentStatus.VERIFYING
    );

    await prisma.publishDeployment.update({
      where: { id: deploymentId },
      data: { status: DeploymentStatus.VERIFYING },
    });
  }
}
