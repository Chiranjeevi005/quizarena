export enum ExportProfileType {
  AUTHORING = "AUTHORING",
  PUBLISHING = "PUBLISHING",
  MIGRATION = "MIGRATION",
  ANALYTICS = "ANALYTICS",
  BACKUP = "BACKUP",
  PUBLIC_API = "PUBLIC_API",
}

export interface ExportMapper<TEntity, TFormatted> {
  mapEntity(entity: TEntity): TFormatted;
}

export interface ExportProfile<TEntity, TFormatted> {
  profileType: ExportProfileType;
  getMapper(): ExportMapper<TEntity, TFormatted>;
  buildExport(data: TFormatted[]): Buffer;
}
