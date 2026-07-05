import { DeploymentStageType } from "@/generated/prisma";

export interface StageExecutionConfig {
  stage: DeploymentStageType;
  isMandatory: boolean;
  order: number;
}

export interface IStageExecutor {
  getStageType(): DeploymentStageType;
  execute(deploymentId: string, context: any): Promise<void>;
  verify(deploymentId: string, context: any): Promise<boolean>;
  rollback(deploymentId: string, context: any): Promise<void>;
}

export class StageRegistry {
  private static executors: Map<DeploymentStageType, IStageExecutor> = new Map();
  private static configs: Map<DeploymentStageType, StageExecutionConfig> = new Map();

  public static register(config: StageExecutionConfig, executor: IStageExecutor): void {
    this.configs.set(config.stage, config);
    this.executors.set(config.stage, executor);
  }

  public static getExecutor(stage: DeploymentStageType): IStageExecutor {
    const executor = this.executors.get(stage);
    if (!executor) {
      throw new Error(`No executor registered for stage: ${stage}`);
    }
    return executor;
  }

  public static getConfig(stage: DeploymentStageType): StageExecutionConfig {
    const config = this.configs.get(stage);
    if (!config) {
      throw new Error(`No config registered for stage: ${stage}`);
    }
    return config;
  }

  public static getAllStages(): DeploymentStageType[] {
    return Array.from(this.configs.keys());
  }

  public static getSortedStages(filter?: DeploymentStageType[]): DeploymentStageType[] {
    const stagesToSort = filter ? filter : this.getAllStages();

    return stagesToSort.sort((a, b) => {
      const configA = this.getConfig(a);
      const configB = this.getConfig(b);
      return configA.order - configB.order;
    });
  }
}
