"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, Trash2, ChevronDown, ChevronUp, X, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { deleteAccountAction, logOutAction } from "@/actions/account";

export function DangerZone() {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isPending, startTransition] = useTransition();

  const expectedConfirmText = session?.user?.username ? `${session.user.username}/delete` : "DELETE";

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== expectedConfirmText) {
      toast.error(`Please type ${expectedConfirmText} to confirm`);
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteAccountAction(confirmText);
        if (result.success) {
          toast.success("Account deleted successfully");
          signOut({ callbackUrl: "/" });
        } else {
          toast.error(result.error || "Failed to delete account");
        }
      } catch (err) {
        toast.error("Failed to delete account");
      }
    });
  };

  const handleLogOut = () => {
    startTransition(async () => {
      try {
        await logOutAction();
      } catch (err) {
        // proceed to sign out even if logging fails
      } finally {
        signOut({ callbackUrl: "/" });
      }
    });
  };

  return (
    <>
      <div
        className={`bg-white rounded-3xl border ${isExpanded ? "border-red-200 shadow-md shadow-red-50" : "border-gray-100 shadow-sm"} transition-all duration-300 overflow-hidden`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isExpanded ? "bg-red-100" : "bg-gray-100"}`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${isExpanded ? "text-red-500" : "text-gray-500"}`}
              />
            </div>
            <div className="text-left">
              <h3 className={`text-lg font-bold ${isExpanded ? "text-red-600" : "text-navy"}`}>
                Danger Zone
              </h3>
              <p className="text-xs text-gray-500">Irreversible account actions</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 pt-2 border-t border-red-100 animate-in slide-in-from-top-4 duration-300 space-y-4">
            {/* Log Out Section */}
            <div className="bg-orange-50 p-4 rounded-2xl flex items-center justify-between border border-orange-100">
              <div>
                <p className="text-sm font-bold text-orange-900">Log Out</p>
                <p className="text-xs text-orange-700 mt-1">
                  Securely log out of your account on this device.
                </p>
              </div>
              <button
                onClick={() => setIsLogOutModalOpen(true)}
                className="ml-4 shrink-0 px-4 py-2 bg-white text-orange-700 border border-orange-200 text-sm font-bold rounded-xl hover:bg-orange-100 transition-colors shadow-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>

            {/* Delete Account Section */}
            <div className="bg-red-50 p-4 rounded-2xl flex items-center justify-between border border-red-100">
              <div>
                <p className="text-sm font-bold text-red-900">Delete Account</p>
                <p className="text-xs text-red-700 mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="ml-4 shrink-0 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 border-2 border-red-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-red-50/50">
              <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Are you absolutely sure?
              </h3>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setConfirmText("");
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                This action <span className="font-bold text-red-600">cannot</span> be undone. This
                will permanently delete your account, subscriptions, and all associated data from
                our servers.
              </p>

              <form onSubmit={handleDelete} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please type{" "}
                    <strong className="text-red-600 bg-red-50 px-1 py-0.5 rounded select-all font-mono">
                      {expectedConfirmText}
                    </strong>{" "}
                    to confirm.
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-mono"
                    placeholder={expectedConfirmText}
                    required
                  />
                </div>
                <button
                  disabled={isPending || confirmText !== expectedConfirmText}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isPending ? (
                    "Deleting..."
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Permanently Delete Account
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Log Out Modal */}
      {isLogOutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-navy mb-2">Sign Out?</h3>
            <p className="text-sm text-gray-500 mb-6">
              You will need to sign in again to access your account.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsLogOutModalOpen(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogOut}
                disabled={isPending}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
              >
                {isPending ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
