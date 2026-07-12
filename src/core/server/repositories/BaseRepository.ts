import { PrismaClient } from "@/generated/prisma";
import { TransactionClient } from "../transactions/TransactionManager";

/**
 * A generic base repository that holds a reference to the global Prisma client
 * and provides a helper to resolve the appropriate client (global or transaction) for the query.
 */
export abstract class BaseRepository {
  protected readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Resolves the appropriate Prisma client to use for the database operation.
   * If a transaction client is provided, it is used. Otherwise, the global client is used.
   */
  protected getClient(tx?: TransactionClient): TransactionClient | PrismaClient {
    return tx || this.prisma;
  }
}
