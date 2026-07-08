import React from "react";

export interface RoleDifference {
  addedPermissions: string[];
  removedPermissions: string[];
  impactedUsers: number;
}

export const RoleDifferenceViewer = ({ diff }: { diff: RoleDifference }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold border-b border-gray-800 pb-2">Impact Analysis</h3>

      <div className="text-sm">
        <span className="text-gray-400">Affected Users: </span>
        <span className="font-bold text-white">{diff.impactedUsers}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold text-green-500 mb-2 uppercase tracking-wider">
            Added
          </div>
          <ul className="space-y-1">
            {diff.addedPermissions.length === 0 && <li className="text-xs text-gray-600">None</li>}
            {diff.addedPermissions.map((p) => (
              <li
                key={p}
                className="text-xs text-gray-300 bg-green-500/10 px-2 py-1 rounded border border-green-500/20"
              >
                + {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold text-red-500 mb-2 uppercase tracking-wider">
            Removed
          </div>
          <ul className="space-y-1">
            {diff.removedPermissions.length === 0 && (
              <li className="text-xs text-gray-600">None</li>
            )}
            {diff.removedPermissions.map((p) => (
              <li
                key={p}
                className="text-xs text-gray-300 bg-red-500/10 px-2 py-1 rounded border border-red-500/20"
              >
                - {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
