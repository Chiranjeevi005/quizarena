export interface PlatformHealthReadModel {
  status: "HEALTHY" | "DEGRADED" | "DOWN";
  components: Record<string, string>;
  lastUpdated: Date;
}

export interface IncidentReadModel {
  id: string;
  severity: string;
  state: string;
  rootCause: string;
  owner: string;
}

export interface StatusReadModel {
  isOperational: boolean;
  activeMaintenance: boolean;
  message: string;
}
