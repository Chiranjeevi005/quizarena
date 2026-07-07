import React from "react";
import { MetricCard } from "../../../shared/components/MetricCard";
import { DollarSign } from "lucide-react";
import { DashboardReadModel } from "../DashboardReadModel";
import { WidgetRegistry } from "../../registry/WidgetRegistry";

export const RevenueWidget = ({ data }: { data: DashboardReadModel }) => {
  const trend =
    ((data.revenue.currentMonth - data.revenue.previousMonth) / data.revenue.previousMonth) * 100;

  return (
    <MetricCard
      title="Monthly Revenue"
      value={"$" + (data.revenue.currentMonth / 1000).toFixed(1) + "k"}
      icon={DollarSign}
      trend={{
        value: parseFloat(trend.toFixed(1)),
        isPositive: trend >= 0,
        label: "vs last month",
      }}
    />
  );
};

WidgetRegistry.register({
  id: "monthly-revenue",
  title: "Monthly Revenue",
  description: "Shows current month revenue",
  priority: 30,
  refreshInterval: 3600000,
  category: "finance",
  provider: RevenueWidget,
  permission: "view:finance",
});
