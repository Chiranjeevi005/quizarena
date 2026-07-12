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
} from "lucide-react";

export default function QuestionAuthoringPlayground() {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string>("");
  const [draftId, setDraftId] = useState<string>("");

  const addLog = (msg: string) => setLogs((prev) => [msg, ...prev]);

  const handleCreateDraft = async () => {
    addLog("Creating draft...");
    try {
      const res = await fetch("/api/questions/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: activeQuestionId, userId: "dev-user-1" }),
      });
      const data = await res.json();
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);
      if (data.data) setDraftId(data.data);
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
    }
  };

  const handlePublishDraft = async () => {
    addLog(`Publishing draft ${draftId}...`);
    try {
      const res = await fetch("/api/questions/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: activeQuestionId,
          draftId,
          userId: "dev-user-1",
          reason: "Initial publish",
        }),
      });
      const data = await res.json();
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
    }
  };

  const handleArchive = async () => {
    addLog("Archiving question...");
    try {
      const res = await fetch("/api/questions/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: activeQuestionId, userId: "dev-user-1" }),
      });
      const data = await res.json();
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
    }
  };

  const handleDuplicate = async () => {
    addLog("Duplicating question...");
    try {
      const res = await fetch("/api/questions/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalQuestionId: activeQuestionId, userId: "dev-user-1" }),
      });
      const data = await res.json();
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col gap-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileEditIcon className="w-8 h-8 text-blue-600" />
          Enterprise Question Authoring Platform
        </h1>
        <p className="text-gray-500 mt-2">
          Debug Question lifecycle, revisions, draft management, and publishing workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  onClick={handleCreateDraft}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-blue-700 transition"
                >
                  <FileEditIcon className="w-4 h-4" /> Create Draft
                </button>
                <button
                  onClick={handlePublishDraft}
                  className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-green-700 transition"
                >
                  <SaveIcon className="w-4 h-4" /> Publish Draft
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleArchive}
                  className="bg-gray-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-gray-700 transition"
                >
                  <ArchiveIcon className="w-4 h-4" /> Archive
                </button>
                <button
                  onClick={handleDuplicate}
                  className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-indigo-700 transition"
                >
                  <CopyIcon className="w-4 h-4" /> Duplicate
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Visual Timeline</h2>

            <div className="flex flex-col gap-4 relative border-l-2 border-gray-200 ml-4 pl-4">
              <div className="relative">
                <div className="absolute -left-[23px] bg-white p-1 rounded-full border">
                  <CornerDownRightIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="bg-gray-50 border p-3 rounded text-sm">
                  <strong className="text-gray-700">v1 (SUPERSEDED)</strong>
                  <p className="text-xs text-gray-500">Initial Import</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] bg-white p-1 rounded-full border border-green-500">
                  <ActivityIcon className="w-4 h-4 text-green-500" />
                </div>
                <div className="bg-green-50 border border-green-200 p-3 rounded text-sm">
                  <strong className="text-green-800">v2 (PUBLISHED)</strong>
                  <p className="text-xs text-green-600">Fixed grammar in option B.</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] bg-white p-1 rounded-full border border-blue-500">
                  <FileEditIcon className="w-4 h-4 text-blue-500" />
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm">
                  <strong className="text-blue-800">v3 (DRAFT)</strong>
                  <p className="text-xs text-blue-600">Active editable draft...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-300 p-4 rounded-xl shadow-inner font-mono text-xs overflow-auto h-[600px]">
          <h3 className="text-slate-100 font-bold mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
            <SearchIcon className="w-4 h-4" /> Workflow Logs
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
