import { DeploymentStrategy, DeploymentEnvironment, DeploymentStageType } from '@/generated/prisma';
import { DeploymentPlan, DeploymentStagePlan } from '../types/deployment.types';
import { StageRegistry } from './StageRegistry';

export class DeploymentPlanner {
  
  /**
   * Generates a deterministic deployment plan based on the environment,
   * strategy, and the registered stages in the StageRegistry.
   */
  public async generatePlan(
    versionId: string,
    environment: DeploymentEnvironment,
    strategy: DeploymentStrategy
  ): Promise<DeploymentPlan> {
    
    const sortedStages = StageRegistry.getSortedStages();
    const stagePlans: DeploymentStagePlan[] = sortedStages.map(stage => {
      const config = StageRegistry.getConfig(stage);
      return {
        stage: config.stage,
        order: config.order,
        isMandatory: config.isMandatory
      };
    });

    return {
      deploymentId: `DPL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      versionId,
      strategy,
      environment,
      stages: stagePlans,
      rollbackStrategy: strategy === DeploymentStrategy.BLUE_GREEN ? 'SWAP_ROUTER' : 'REVERT_STATE'
    };
  }
}
