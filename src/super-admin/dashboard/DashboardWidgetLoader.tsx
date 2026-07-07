import React from "react";
import { useAdmin } from "../context/AdminContext";
import { WidgetRegistry } from "../registry/WidgetRegistry";
import { DashboardReadModel } from "./DashboardReadModel";

export const DashboardWidgetLoader = ({ data }: { data: DashboardReadModel }) => {
  const { permissions } = useAdmin();

  const widgets = WidgetRegistry.getAll().filter((w) => {
    if (w.permission && !permissions.includes(w.permission)) return false;
    return true;
  });

  return (
    <>
      {widgets.map((w) => {
        const WidgetComponent = w.provider;
        return <WidgetComponent key={w.id} data={data} />;
      })}
    </>
  );
};
