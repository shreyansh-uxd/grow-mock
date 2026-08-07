"use client";

import React, { useState, useEffect } from "react";
import { Stock, MOST_TRADED, TOP_GAINERS, TOP_LOSERS } from "@/lib/stocks-data";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (stock: Stock) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectStock }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const allStocks = [...MOST_TRADED, ...TOP_GAINERS, ...TOP_LOSERS];

  const filtered = query
    ? allStocks.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.symbol.toLowerCase().includes(query.toLowerCase())
      )
    : allStocks;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-10 p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search stocks, ETFs, mutual funds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base outline-none text-slate-900 placeholder:text-slate-400 font-medium"
          />
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No stocks found matching &quot;{query}&quot;</div>
          ) : (
            filtered.map((stock) => (
              <div
                key={stock.id}
                onClick={() => {
                  onSelectStock(stock);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: stock.logoBg || "#00b386" }}
                  >
                    {stock.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{stock.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">NSE • {stock.symbol}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 block">₹{stock.price.toFixed(2)}</span>
                  <span
                    className={`text-xs font-semibold ${
                      stock.isPositive ? "text-emerald-600" : "text-rose-500"
                    }`}
                  >
                    +{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
