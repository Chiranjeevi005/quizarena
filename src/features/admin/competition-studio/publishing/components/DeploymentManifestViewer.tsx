import React from 'react';
import { DeploymentManifest } from '../types/deployment.types';

interface DeploymentManifestViewerProps {
  manifest: DeploymentManifest;
}

export function DeploymentManifestViewer({ manifest }: DeploymentManifestViewerProps) {
  return (
    <div className="bg-gray-900 text-green-400 p-5 rounded-lg border border-gray-700 shadow-inner font-mono text-xs overflow-x-auto">
      <h3 className="text-gray-100 font-bold mb-3 uppercase tracking-wider text-sm border-b border-gray-700 pb-2">
        Deployment Manifest
      </h3>
      
      <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2 mb-4">
        <span className="text-gray-500">Deployment ID</span>
        <span>{manifest.deploymentId}</span>
        
        <span className="text-gray-500">Artifact ID</span>
        <span className="text-blue-300">{manifest.artifactId}</span>
        
        <span className="text-gray-500">Environment</span>
        <span className="text-yellow-300">{manifest.environment}</span>
        
        <span className="text-gray-500">Builder Version</span>
        <span>{manifest.builderVersion}</span>
        
        <span className="text-gray-500">Pipeline Ver.</span>
        <span>{manifest.pipelineVersion}</span>
        
        <span className="text-gray-500">Timestamp</span>
        <span>{new Date(manifest.timestamp).toLocaleString()}</span>
      </div>

      <div className="mt-4">
        <span className="text-gray-500 block mb-1">Dependencies:</span>
        <pre className="text-gray-300 bg-black/30 p-2 rounded">
          {JSON.stringify(manifest.dependencies, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <span className="text-gray-500 block mb-1">Stages:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {manifest.stages.map(stage => (
            <span key={stage} className="bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
              {stage}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
