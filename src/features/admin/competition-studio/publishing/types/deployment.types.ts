import {
  DeploymentStatus,
  DeploymentStrategy,
  DeploymentEnvironment,
  DeploymentStageType,
  StageStatus,
  DeploymentAuditAction,
  DeploymentHealthStatus,
  DeploymentReason,
  DeploymentResult,
} from "@/generated/prisma";

export interface PublishDeploymentOptions {
  competitionId: string;
  versionId: string;
  strategy: DeploymentStrategy;
  environment: DeploymentEnvironment;
  reason: DeploymentReason;
  reasonNote?: string;
  initiatedById: string;
}

export interface DeploymentPlan {
  deploymentId: string;
  versionId: string;
  strategy: DeploymentStrategy;
  stages: DeploymentStagePlan[];
  rollbackStrategy: string;
  environment: DeploymentEnvironment;
}

export interface DeploymentStagePlan {
  stage: DeploymentStageType;
  order: number;
  isMandatory: boolean;
}

export interface DeploymentManifest {
  deploymentId: string;
  artifactId: string;
  stages: DeploymentStageType[];
  environment: DeploymentEnvironment;
  dependencies: Record<string, string>;
  rollbackDeploymentId?: string;
  builderVersion: string;
  pipelineVersion: string;
  timestamp: string;
}

export interface DeploymentStateContext {
  deploymentId: string;
  status: DeploymentStatus;
  currentStage?: DeploymentStageType;
  errors: string[];
}
