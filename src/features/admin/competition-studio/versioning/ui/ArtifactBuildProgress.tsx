import React from "react";

export const ArtifactBuildProgress: React.FC<{ status: string; progress: number }> = ({
  status,
  progress,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Artifact Build Progress</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-gray-600">{status}</p>
    </div>
  );
};
