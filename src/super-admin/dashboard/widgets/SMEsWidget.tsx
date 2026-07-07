import React from "react";
import { MetricCard } from "../../../shared/components/MetricCard";
import { Users } from "lucide-react";
import { DashboardReadModel } from "../DashboardReadModel";
import { WidgetRegistry } from "../../registry/WidgetRegistry";

export const SMEsWidget = ({ data }: { data: DashboardReadModel }) => {
  return (
    <MetricCard
      title="Active SMEs"
      value={data.smes.active}
      icon={Users}
      trend={{ value: 0, isPositive: true, label: `out of ${data.smes.total} total` }}
    />
  );
};

WidgetRegistry.register({
  id: "active-smes",
  title: "Active SMEs",
  description: "Shows currently active subject matter experts",
  priority: 40,
  refreshInterval: 300000,
  category: "core",
  provider: SMEsWidget,
  permission: "view:people",
});
