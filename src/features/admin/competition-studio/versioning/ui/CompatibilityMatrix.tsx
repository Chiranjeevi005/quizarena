import React from "react";
import { VersionCompatibilityDTO } from "../types/artifact.types";

export const CompatibilityMatrix: React.FC<{ compatibilities: VersionCompatibilityDTO[] }> = ({
  compatibilities,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-4">Compatibility Matrix</h3>
      <div className="grid grid-cols-2 gap-4">
        {compatibilities.map((c) => (
          <div key={c.system} className="flex justify-between items-center p-2 border-b">
            <span className="font-medium text-gray-700">{c.system}</span>
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${c.status === "COMPATIBLE" ? "bg-green-100 text-green-800" : c.status === "BLOCKED" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
