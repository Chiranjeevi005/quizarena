import { TransactionClient } from "../transactions/TransactionManager";

export interface IReadRepository<TEntity, TQuery = any> {
  findById(id: string, tx?: TransactionClient): Promise<TEntity | null>;
  findMany(query: TQuery, tx?: TransactionClient): Promise<TEntity[]>;
  count(query: TQuery, tx?: TransactionClient): Promise<number>;
}

export interface IWriteRepository<TEntity, TCreateInput, TUpdateInput> {
  create(data: TCreateInput, tx?: TransactionClient): Promise<TEntity>;
  update(id: string, data: TUpdateInput, tx?: TransactionClient): Promise<TEntity>;
  delete(id: string, tx?: TransactionClient): Promise<TEntity>;
}

export interface ICrudRepository<TEntity, TCreateInput, TUpdateInput, TQuery = any>
  extends IReadRepository<TEntity, TQuery>, IWriteRepository<TEntity, TCreateInput, TUpdateInput> {}
