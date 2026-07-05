import { Layer, Domain } from "../config/architecture.types";

export class ResponsibilityResolver {
  static resolve(layer: Layer, feature: string, domain: Domain): string {
    if (layer === Layer.Page) return `Renders the ${feature} page for ${domain}`;
    if (layer === Layer.Component) return `UI Component for ${feature} in ${domain}`;
    if (layer === Layer.Service) return `Business logic for ${feature} in ${domain}`;
    if (layer === Layer.Store) return `State management for ${feature} in ${domain}`;
    if (layer === Layer.Action) return `Server action for ${feature} in ${domain}`;
    if (layer === Layer.Type) return `Type definitions for ${feature} in ${domain}`;
    if (layer === Layer.Configuration) return `Configuration for ${domain}`;
    return `Provides ${layer} capabilities for ${feature} within ${domain}`;
  }
}
