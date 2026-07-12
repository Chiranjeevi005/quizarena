import { BasePipeline } from "@/core/server/pipelines/BasePipeline";
import { BatchContext } from "@/core/server/context/BatchContext";
import { OperationResult } from "@/core/server/utils/OperationResult";
import { ImportProfile, ValidationReport } from "../importers/contracts";
import { TransactionManager } from "@/core/server/transactions/TransactionManager";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionRevisionRepository } from "../repositories/QuestionRevisionRepository";

export class ImportPipeline<TRawRow, TNormalized> extends BasePipeline<TRawRow[], void> {
  constructor(
    private profile: ImportProfile<TRawRow, TNormalized>,
    private transactionManager: TransactionManager,
    private questionRepo: QuestionRepository,
    private revisionRepo: QuestionRevisionRepository
  ) {
    super();
  }

  public async execute(rawRows: TRawRow[], context: BatchContext): Promise<OperationResult<void>> {
    // 1. Parse (usually handled upstream, assume rawRows are parsed)

    // 2. Validate
    const validationReport = this.profile.validateRaw(rawRows);

    // 3. Normalize
    const mapper = this.profile.getMapper();
    const normalizedData = rawRows.map((row) => mapper.mapRow(row));

    // 4. Preview / Resolve Conflicts (stubbed here, typically involves returning payload for UI)

    // 5. Import (Create Draft -> Publish -> Workflow)
    let imported = 0;
    let failed = 0;

    for (const data of normalizedData) {
      try {
        await this.transactionManager.execute(async (tx) => {
          // Emulate workflow calls
          // const draftId = await createDraftWorkflow.execute(...)
          // await publishWorkflow.execute(...)
        });
        imported++;
      } catch (e) {
        failed++;
      }
    }

    // 6. Audit & Events (handled inside workflows or here)

    return OperationResult.ok(undefined, {
      affectedItems: imported,
      statistics: {
        validRows: validationReport.validRows,
        invalidRows: validationReport.invalidRows,
        warnings: validationReport.warnings,
        duplicates: validationReport.duplicates,
        missingTaxonomy: validationReport.missingTaxonomy,
        unsupportedTypes: validationReport.unsupportedTypes,
        missingAssets: validationReport.missingAssets,
        imported,
        failed,
      },
    });
  }
}
