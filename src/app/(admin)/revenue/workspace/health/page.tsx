import React from "react";
import { RevenueHealthReadModel } from "../../../../../features/revenue/models/read-models/RevenueReadModels";

// Mock data to demonstrate the strictly-typed ReadModel consumption
const mockHealthData: RevenueHealthReadModel = {
  currentGateway: "Razorpay",
  gatewayMode: "LIVE",
  paymentSuccessRate: 98.2,
  webhookDelayMs: 450,
  lastSuccessfulPaymentAt: new Date().toISOString(),
  lastSuccessfulRefundAt: new Date(Date.now() - 3600000).toISOString(),
  lastSettlementAt: new Date(Date.now() - 86400000).toISOString(),
  webhookStatus: "HEALTHY",
  databaseSyncStatus: "SYNCED",
};

export default function RevenueHealthDashboard() {
  const data = mockHealthData; // In real app, fetch from trpc/api

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Revenue Health Operations</h2>
          <p className="text-muted-foreground text-gray-500">
            Real-time operational metrics and system alerts.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 text-sm font-medium">
          Run Certification Check
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Gateway Widget */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
          <h3 className="tracking-tight text-sm font-medium text-gray-500">Payment Gateway</h3>
          <div className="text-2xl font-bold mt-2">{data.currentGateway}</div>
          <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
            {data.gatewayMode} MODE
          </p>
        </div>

        {/* Success Rate Widget */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
          <h3 className="tracking-tight text-sm font-medium text-gray-500">Success Rate</h3>
          <div className="text-2xl font-bold mt-2">{data.paymentSuccessRate}%</div>
          <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
        </div>

        {/* Webhook Status Widget */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
          <h3 className="tracking-tight text-sm font-medium text-gray-500">Webhook Status</h3>
          <div className="text-2xl font-bold mt-2">{data.webhookStatus}</div>
          <p className="text-xs text-gray-500 mt-1">Avg delay: {data.webhookDelayMs}ms</p>
        </div>

        {/* Database Sync Widget */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
          <h3 className="tracking-tight text-sm font-medium text-gray-500">Database Sync</h3>
          <div className="text-2xl font-bold mt-2">{data.databaseSyncStatus}</div>
          <p className="text-xs text-gray-500 mt-1">Reconciliation Engine</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Last Operations</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Successful Payment</span>
              <span className="font-medium">
                {new Date(data.lastSuccessfulPaymentAt).toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Successful Refund</span>
              <span className="font-medium">
                {data.lastSuccessfulRefundAt
                  ? new Date(data.lastSuccessfulRefundAt).toLocaleString()
                  : "N/A"}
              </span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Settlement Synced</span>
              <span className="font-medium">
                {data.lastSettlementAt ? new Date(data.lastSettlementAt).toLocaleString() : "N/A"}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border bg-white text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 border-2 border-dashed border-gray-100 rounded-lg">
            <span className="text-green-500 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <p className="text-sm">No active alerts from the Alert Engine.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
