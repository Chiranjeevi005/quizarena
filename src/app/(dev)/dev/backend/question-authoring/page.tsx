"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  ActivityIcon,
  FileEditIcon,
  SaveIcon,
  CopyIcon,
  ArchiveIcon,
  CornerDownRightIcon,
  UploadCloudIcon,
  DownloadCloudIcon,
  LayersIcon,
  CheckCircleIcon,
  ListIcon,
} from "lucide-react";

type Tab = "AUTHORING" | "IMPORT" | "EXPORT" | "BULK" | "VALIDATION" | "JOBS";

export default function EnterprisePlayground() {
  const [activeTab, setActiveTab] = useState<Tab>("AUTHORING");
  const [logs, setLogs] = useState<string[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string>("");
  const [draftId, setDraftId] = useState<string>("");

  const addLog = (msg: string) => setLogs((prev) => [msg, ...prev]);

  const handleMockAction = (action: string) => {
    addLog(`[${activeTab}] Executing ${action}...`);
    setTimeout(() => {
      addLog(`[${activeTab}] ${action} completed successfully.`);
    }, 500);
  };

  const renderAuthoringTab = () => (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Workflow Actions</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Question ID (e.g., cuid...)"
            className="border p-2 rounded"
            value={activeQuestionId}
            onChange={(e) => setActiveQuestionId(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleMockAction("Create Draft")}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FileEditIcon className="w-4 h-4" /> Create Draft
            </button>
            <button
              onClick={() => handleMockAction("Publish Draft")}
              className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-green-700 transition"
            >
              <SaveIcon className="w-4 h-4" /> Publish
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleMockAction("Archive")}
              className="bg-gray-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-gray-700 transition"
            >
              <ArchiveIcon className="w-4 h-4" /> Archive
            </button>
            <button
              onClick={() => handleMockAction("Duplicate")}
              className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <CopyIcon className="w-4 h-4" /> Duplicate
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImportTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Import Session</h2>
      <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-xl text-gray-500">
        <UploadCloudIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        <p>Drop CSV or ZIP package here to start an Import Session</p>
        <button
          onClick={() => handleMockAction("Upload Mock CSV")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Select File
        </button>
      </div>
    </div>
  );

  const renderExportTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Export Profiles</h2>
      <select className="border p-2 rounded w-full">
        <option>AUTHORING</option>
        <option>PUBLISHING</option>
        <option>MIGRATION</option>
        <option>ANALYTICS</option>
      </select>
      <button
        onClick={() => handleMockAction("Trigger Export")}
        className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center justify-center gap-2"
      >
        <DownloadCloudIcon className="w-4 h-4" /> Build Export Package
      </button>
    </div>
  );

  const renderBulkTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Bulk Operations</h2>
      <textarea
        className="border p-2 rounded w-full h-32"
        placeholder="Paste Question IDs (comma separated)..."
      ></textarea>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleMockAction("Bulk Publish")}
          className="bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          Bulk Publish
        </button>
        <button
          onClick={() => handleMockAction("Bulk Archive")}
          className="bg-gray-600 text-white px-4 py-2 rounded shadow"
        >
          Bulk Archive
        </button>
        <button
          onClick={() => handleMockAction("Bulk Duplicate")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Bulk Duplicate
        </button>
        <button
          onClick={() => handleMockAction("Bulk Delete")}
          className="bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Bulk Delete
        </button>
      </div>
    </div>
  );

  const renderValidationTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Validation Report</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-green-50 text-green-800 rounded text-center border border-green-200">
          <strong className="block text-2xl">450</strong> Valid Rows
        </div>
        <div className="p-4 bg-red-50 text-red-800 rounded text-center border border-red-200">
          <strong className="block text-2xl">12</strong> Errors
        </div>
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded text-center border border-yellow-200">
          <strong className="block text-2xl">34</strong> Warnings
        </div>
        <div className="p-4 bg-blue-50 text-blue-800 rounded text-center border border-blue-200">
          <strong className="block text-2xl">5</strong> Duplicates
        </div>
      </div>
      <button
        onClick={() => handleMockAction("Resolve Conflicts")}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow w-full"
      >
        Proceed to Conflict Resolution
      </button>
    </div>
  );

  const renderJobsTab = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Background Jobs</h2>
      <div className="border p-4 rounded mb-2 flex justify-between items-center bg-gray-50">
        <div>
          <strong className="block">IMPORT-JOB-1029</strong>
          <span className="text-sm text-gray-500">Status: RUNNING</span>
        </div>
        <div className="text-right">
          <strong className="text-blue-600">65%</strong>
          <p className="text-xs text-gray-500">Stage: VALIDATING</p>
        </div>
      </div>
      <div className="border p-4 rounded mb-2 flex justify-between items-center">
        <div>
          <strong className="block">EXPORT-JOB-1028</strong>
          <span className="text-sm text-gray-500">Status: COMPLETED</span>
        </div>
        <div className="text-right">
          <strong className="text-green-600">100%</strong>
          <p className="text-xs text-gray-500">Stage: COMPLETED</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LayersIcon className="w-8 h-8 text-blue-600" />
          Enterprise Bulk Operations Platform
        </h1>
        <p className="text-gray-500 mt-2">
          Simulate Batch Pipelines, Import Sessions, Export Profiles, and Bulk Workflows.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(["AUTHORING", "IMPORT", "EXPORT", "BULK", "VALIDATION", "JOBS"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded shadow-sm text-sm font-medium transition ${activeTab === tab ? "bg-slate-900 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {activeTab === "AUTHORING" && renderAuthoringTab()}
          {activeTab === "IMPORT" && renderImportTab()}
          {activeTab === "EXPORT" && renderExportTab()}
          {activeTab === "BULK" && renderBulkTab()}
          {activeTab === "VALIDATION" && renderValidationTab()}
          {activeTab === "JOBS" && renderJobsTab()}
        </div>

        <div className="bg-slate-900 text-slate-300 p-4 rounded-xl shadow-inner font-mono text-xs overflow-auto h-[600px]">
          <h3 className="text-slate-100 font-bold mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
            <SearchIcon className="w-4 h-4" /> Pipeline Logs
          </h3>
          {logs.length === 0 ? (
            <span className="text-slate-600">
              No events emitted yet. Execute an action to begin.
            </span>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="mb-2 whitespace-pre-wrap">
                <span className="text-green-400">[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
