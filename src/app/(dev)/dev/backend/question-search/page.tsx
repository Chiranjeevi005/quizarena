"use client";

import { useState } from "react";
import { QuestionSearchMode } from "@/features/questions/server/search/profiles/QuestionSearchMode";

export default function QuestionSearchDebugger() {
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState<QuestionSearchMode>(QuestionSearchMode.STANDARD);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/questions/search?q=${encodeURIComponent(keyword)}&mode=${mode}`
      );
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-mono text-sm">
      <h1 className="text-2xl font-bold mb-6">Backend Debugger: Question Search Pipeline</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-8 border border-gray-300">
        <h2 className="text-lg font-semibold mb-4">1. Request Configuration</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Keyword (q)</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. React hooks"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Search Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as QuestionSearchMode)}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            >
              {Object.values(QuestionSearchMode).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Executing..." : "Execute Search"}
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-green-300 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-green-800">2. ApiResponse Envelope</h2>
            <div className="grid grid-cols-4 gap-4 mb-4 text-xs">
              <div className="bg-gray-50 p-3 rounded border">
                <strong>Success:</strong> {String(results.success)}
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <strong>Total Found:</strong> {results.data?.statistics?.totalFound}
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <strong>Page:</strong> {results.data?.pagination?.page}
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <strong>Limit:</strong> {results.data?.pagination?.limit}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-6 rounded-lg shadow-inner overflow-x-auto">
            <h2 className="text-lg font-semibold mb-2 text-white">3. Raw JSON Payload</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
