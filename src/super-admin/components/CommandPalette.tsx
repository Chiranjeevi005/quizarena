"use client";
import React, { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { CommandRegistry, CommandManifest } from "../registry/CommandRegistry";
import { useAdmin } from "../context/AdminContext";
import { useRouter } from "next/navigation";
import { NavigationRegistry } from "../registry/NavigationRegistry";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { permissions } = useAdmin();
  const router = useRouter();

  // Register default navigation commands on mount
  useEffect(() => {
    const navItems = NavigationRegistry.getAll();
    navItems.forEach((item) => {
      CommandRegistry.register({
        id: `nav-${item.id}`,
        title: `Navigate to ${item.title}`,
        description: item.category,
        permission: item.permission,
        action: () => {
          router.push(item.path);
          setIsOpen(false);
        },
      });
    });
  }, [router]);

  const availableCommands = CommandRegistry.getCommands(permissions);
  const filteredCommands = query
    ? availableCommands.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
    : availableCommands;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-start pt-[20vh] p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="flex items-center px-4 py-3 border-b border-gray-800">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
            placeholder="Search commands or navigation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {filteredCommands.length > 0 ? (
            <div className="p-2 space-y-1">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full text-left block p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-200">{cmd.title}</p>
                      {cmd.description && (
                        <p className="text-sm text-gray-500">{cmd.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No results found</div>
          )}
        </div>

        <div className="bg-gray-950 px-4 py-2 border-t border-gray-800 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Navigate with <kbd className="font-mono bg-gray-800 px-1 rounded">↑</kbd>{" "}
            <kbd className="font-mono bg-gray-800 px-1 rounded">↓</kbd>
          </div>
          <div className="text-xs text-gray-500">
            Close with <kbd className="font-mono bg-gray-800 px-1 rounded">ESC</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
