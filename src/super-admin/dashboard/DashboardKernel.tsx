"use client";
import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { DashboardState } from "../types/admin.types";
import { DashboardFacade } from "./DashboardFacade";
import { DashboardReadModel } from "./DashboardReadModel";
import { DashboardLayoutEngine } from "./DashboardLayoutEngine";
import { DashboardWidgetLoader } from "./DashboardWidgetLoader";
import { EmptyDashboard } from "../components/dashboard/EmptyDashboard";
import { Loader2 } from "lucide-react";
import "./widgets";

export const DashboardKernel = () => {
  const { state, setState } = useAdmin();
  const [data, setData] = useState<DashboardReadModel | null>(null);

  useEffect(() => {
    let mounted = true;
    setState(DashboardState.LOADING);

    DashboardFacade.getDashboardData()
      .then((res) => {
        if (!mounted) return;
        setData(res);
        setState(DashboardState.READY);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setState(DashboardState.ERROR);
      });

    return () => {
      mounted = false;
    };
  }, [setState]);

  if (state === DashboardState.INITIALIZING || state === DashboardState.LOADING) {
    return (
      <div className="flex h-full items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (state === DashboardState.ERROR) {
    return (
      <div className="p-6 text-red-500 border border-red-500/20 bg-red-500/10 rounded-xl m-6">
        <h2 className="text-lg font-bold">Failed to load dashboard</h2>
        <p>There was an error communicating with the kernel.</p>
      </div>
    );
  }

  if (!data) return null;

  if (data.isEmpty) {
    return <EmptyDashboard />;
  }

  return (
    <DashboardLayoutEngine>
      <DashboardWidgetLoader data={data} />
    </DashboardLayoutEngine>
  );
};
