import { BasePipeline } from "@/core/server/pipelines/BasePipeline";
import { BatchContext } from "@/core/server/context/BatchContext";
import { OperationResult } from "@/core/server/utils/OperationResult";
import { ExportProfile } from "../exporters/contracts";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { IStorageProvider } from "@/core/server/storage/IStorageProvider";

export class ExportPipeline<TEntity, TFormatted> extends BasePipeline<string[], string> {
  constructor(
    private profile: ExportProfile<TEntity, TFormatted>,
    private questionRepo: QuestionRepository,
    private storageProvider: IStorageProvider
  ) {
    super();
  }

  public async execute(
    questionIds: string[],
    context: BatchContext
  ): Promise<OperationResult<string>> {
    const startTime = Date.now();

    // 1. Query Data
    // Mock: const entities = await this.questionRepo.findByIds(questionIds);
    const entities: TEntity[] = [];

    // 2. Map/Format
    const mapper = this.profile.getMapper();
    const formattedData = entities.map((e) => mapper.mapEntity(e));

    // 3. Build/Package
    const buffer = this.profile.buildExport(formattedData);

    // 4. Upload
    const fileName = `export-${context.jobId}-${Date.now()}.zip`;
    const url = await this.storageProvider.uploadFile("exports", fileName, buffer);

    // 5. Return result
    return OperationResult.ok(url, {
      affectedItems: formattedData.length,
      durationMs: Date.now() - startTime,
    });
  }
}
