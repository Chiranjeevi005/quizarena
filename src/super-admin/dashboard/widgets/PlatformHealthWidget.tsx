import React from "react";
import { MetricCard } from "../../../shared/components/MetricCard";
import { Activity } from "lucide-react";
import { DashboardReadModel } from "../DashboardReadModel";
import { WidgetRegistry } from "../../registry/WidgetRegistry";

export const PlatformHealthWidget = ({ data }: { data: DashboardReadModel }) => {
  return (
    <MetricCard
      title="Platform Health"
      value={data.health.uptime + "%"}
      icon={Activity}
      trend={{
        value: 0,
        isPositive: true,
        label: data.health.status === "healthy" ? "All systems operational" : "System degraded",
      }}
    />
  );
};

WidgetRegistry.register({
  id: "platform-health",
  title: "Platform Health",
  description: "Shows system uptime and health status",
  priority: 10,
  refreshInterval: 60000,
  category: "system",
  provider: PlatformHealthWidget,
  permission: "view:operations",
});
