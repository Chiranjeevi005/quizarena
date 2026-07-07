"use client";
import React, { useState } from "react";
import { Bell, X, Check } from "lucide-react";

export const NotificationCenter = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h3 className="text-white font-semibold flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 text-center text-gray-500 text-sm">
        <p>No new notifications</p>
      </div>
      <div className="p-3 bg-gray-950 border-t border-gray-800 flex justify-center">
        <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
};
