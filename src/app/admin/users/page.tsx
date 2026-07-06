import React from "react";

export default function AdminUsersPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">User & Role Management</h2>
        <p className="text-gray-400 text-sm">
          Manage users, assign roles, and configure granular permissions.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium rounded transition-colors">
            Invite User
          </button>
        </div>

        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {/* Mock User 1 */}
            <tr className="hover:bg-gray-800/30 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-200">Alice Smith</td>
              <td className="px-6 py-4">alice@quizarena.com</td>
              <td className="px-6 py-4">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-semibold">
                  ADMIN
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">
                  ACTIVE
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">
                  Edit
                </button>
              </td>
            </tr>
            {/* Mock User 2 */}
            <tr className="hover:bg-gray-800/30 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-200">Bob Jones</td>
              <td className="px-6 py-4">bob@quizarena.com</td>
              <td className="px-6 py-4">
                <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs font-semibold">
                  USER
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">
                  ACTIVE
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
