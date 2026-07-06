"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle?: string;
  url: string;
}

export function GlobalSearchUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [query]);

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
            placeholder="Search competitions, users, questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isSearching ? <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" /> : (
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2 space-y-1">
              {results.map(r => (
                <a key={r.id} href={r.url} className="block p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-200">{r.title}</p>
                      {r.subtitle && <p className="text-sm text-gray-500">{r.subtitle}</p>}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-gray-800 text-gray-400 rounded">
                      {r.type}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : query.length >= 2 && !isSearching ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
        
        <div className="bg-gray-950 px-4 py-2 border-t border-gray-800 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Navigate with <kbd className="font-mono bg-gray-800 px-1 rounded">↑</kbd> <kbd className="font-mono bg-gray-800 px-1 rounded">↓</kbd>
          </div>
          <div className="text-xs text-gray-500">
            Close with <kbd className="font-mono bg-gray-800 px-1 rounded">ESC</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
