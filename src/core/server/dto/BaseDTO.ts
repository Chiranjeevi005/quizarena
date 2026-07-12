export interface BaseDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SoftDeletableDTO extends BaseDTO {
  deletedAt: Date | null;
}
