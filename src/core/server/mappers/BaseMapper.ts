/**
 * A standard interface for all Mappers to prevent drifting conventions.
 */
export abstract class BaseMapper<TPrismaEntity, TResponseDTO, TSummaryDTO = any> {
  // Prisma to Response (Full detail)
  public abstract toDTO(entity: TPrismaEntity): TResponseDTO;

  // Prisma to Summary (List view)
  public abstract toSummaryDTO(entity: TPrismaEntity): TSummaryDTO;
}
