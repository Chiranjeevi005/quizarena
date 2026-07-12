export interface ValidationReport {
  validRows: number;
  invalidRows: number;
  warnings: number;
  duplicates: number;
  missingTaxonomy: number;
  unsupportedTypes: number;
  missingAssets: number;
  statistics: Record<string, number | string>;
}

export interface ImportMapper<TRawRow, TNormalized> {
  mapRow(row: TRawRow): TNormalized;
}

export interface ImportProfile<TRawRow, TNormalized> {
  sourceType: string; // e.g. "CSV", "EXCEL"
  getMapper(): ImportMapper<TRawRow, TNormalized>;
  validateRaw(data: TRawRow[]): ValidationReport;
}
