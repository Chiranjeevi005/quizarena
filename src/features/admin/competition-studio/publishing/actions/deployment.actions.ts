'use server';

import { DeploymentPipeline } from '../services/DeploymentPipeline';
import { DeploymentExecutor } from '../services/DeploymentExecutor';
import { DeploymentVerificationService } from '../services/DeploymentVerificationService';
import { PublishDeploymentOptions } from '../types/deployment.types';

const pipeline = new DeploymentPipeline();
const executor = new DeploymentExecutor();
const verifier = new DeploymentVerificationService();

export async function planDeploymentAction(options: PublishDeploymentOptions) {
  try {
    const deployment = await pipeline.planDeployment(options);
    return { success: true, deploymentId: deployment.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function executeDeploymentAction(deploymentId: string) {
  try {
    await executor.execute(deploymentId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function verifyDeploymentAction(deploymentId: string) {
  try {
    const isVerified = await verifier.verify(deploymentId);
    return { success: isVerified };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
