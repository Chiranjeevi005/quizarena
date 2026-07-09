import { ComponentMetadata } from "./component";

export interface Registry<T> {
  register(item: T): void;
  get(id: string): T | undefined;
  getAll(): T[];
}

export interface IComponentRegistry extends Registry<ComponentMetadata> {
  getByCategory(category: string): ComponentMetadata[];
  getDeprecated(): ComponentMetadata[];
}
