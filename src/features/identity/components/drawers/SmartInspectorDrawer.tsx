import React from "react";
import { UserTimelineEngine } from "../timeline/UserTimelineEngine";

export interface SmartInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: "user" | "role" | "session" | "invitation";
  entityId: string;
}

/**
 * Smart Inspector Drawer is exclusively read-only.
 * Any mutations must happen through dedicated dialogs or bulk operations.
 */
export const SmartInspectorDrawer = ({
  isOpen,
  onClose,
  entityType,
  entityId,
}: SmartInspectorDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-950 border-l border-gray-800 shadow-2xl flex flex-col z-50 transform transition-transform duration-300">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-300">
          Inspect {entityType}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-1">ID</div>
          <div className="font-mono text-sm text-gray-300 bg-gray-900 px-2 py-1 rounded">
            {entityId}
          </div>
        </div>

        {/* Dynamic content based on type */}
        {entityType === "user" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 border-b border-gray-800 pb-2">Timeline</h3>
              <UserTimelineEngine identityId={entityId} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-900/50 border-t border-gray-800 text-xs text-center text-gray-500">
        Read-only mode. Use Bulk Engine or Dialogs to mutate.
      </div>
    </div>
  );
};
