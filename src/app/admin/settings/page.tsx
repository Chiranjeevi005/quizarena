import React from 'react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Platform Settings & Data Lifecycle</h2>
        <p className="text-gray-400 text-sm">Configure system parameters, retention policies, and automated cleanup jobs.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 bg-gray-950">
          <h3 className="font-semibold text-gray-200">Data Lifecycle Policies</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-300">Archive Stale Competitions</p>
              <p className="text-sm text-gray-500">Automatically archive competitions that ended more than 30 days ago.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-300">Soft Delete Expired Certificates</p>
              <p className="text-sm text-gray-500">Remove access to certificates beyond their validity period.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-300">Purge Audit Logs (90 Days)</p>
              <p className="text-sm text-gray-500">Permanently delete audit logs older than 90 days to save space.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>
        <div className="bg-gray-950 p-4 border-t border-gray-800 flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium rounded transition-colors">
            Save Policies
          </button>
        </div>
      </div>
    </div>
  );
}
