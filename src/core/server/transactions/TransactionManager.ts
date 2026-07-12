import { Prisma, PrismaClient } from "@/generated/prisma";

export type TransactionClient = Prisma.TransactionClient;

export interface ITransactionManager {
  execute<T>(fn: (tx: TransactionClient) => Promise<T>): Promise<T>;
}

export class TransactionManager implements ITransactionManager {
  private readonly client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  public async execute<T>(fn: (tx: TransactionClient) => Promise<T>): Promise<T> {
    // Pass the transaction client context to the callback
    return this.client.$transaction(async (tx) => {
      return fn(tx);
    });
  }
}
