export interface DomainEvent {
  eventName: string;
  occurredOn: Date;
  aggregateId: string;
  payload: any;
}

export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
  subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void>): void;
}
