import React from "react";
import { MetricCard } from "../../../shared/components/MetricCard";
import { Trophy } from "lucide-react";
import { DashboardReadModel } from "../DashboardReadModel";
import { WidgetRegistry } from "../../registry/WidgetRegistry";

export const CompetitionsWidget = ({ data }: { data: DashboardReadModel }) => {
  return (
    <MetricCard
      title="Active Competitions"
      value={data.competitions.active}
      icon={Trophy}
      trend={{ value: data.competitions.newThisWeek, isPositive: true, label: "new this week" }}
    />
  );
};

WidgetRegistry.register({
  id: "active-competitions",
  title: "Active Competitions",
  description: "Shows currently active competitions",
  priority: 20,
  refreshInterval: 300000,
  category: "core",
  provider: CompetitionsWidget,
  permission: "view:competitions",
});
