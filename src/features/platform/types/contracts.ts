export interface DomainEvent<T = any> {
  id: string;
  version: number;
  occurredAt: Date;
  aggregateId: string;
  payload: T;
}

export interface DomainCommand<T = any> {
  id: string;
  requestedBy: string;
  timestamp: Date;
  payload: T;
}
