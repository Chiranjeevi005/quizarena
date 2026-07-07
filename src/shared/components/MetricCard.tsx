import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  isLoading?: boolean;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  isLoading,
  className = "",
}: MetricCardProps) => {
  if (isLoading) {
    return (
      <div
        className={`bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse ${className}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 bg-gray-800 rounded w-24"></div>
          <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
        </div>
        <div className="h-8 bg-gray-800 rounded w-16 mb-2"></div>
        <div className="h-3 bg-gray-800 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-gray-800/50 rounded-lg text-gray-400">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline space-x-3">
        <span className="text-2xl font-bold text-white">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${trend.isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      {trend?.label && <p className="text-gray-500 text-xs mt-2">{trend.label}</p>}
    </div>
  );
};
