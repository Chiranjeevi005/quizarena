export interface ActivityEvent {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  description: string;
  timestamp: Date;
  user?: { name: string; avatar?: string };
}
