"use client";

import React, { useState, useEffect, useRef } from "react";
import { Stock, MOST_TRADED, TOP_GAINERS, TOP_LOSERS, RECENTLY_VIEWED } from "@/lib/stocks-data";
import { Search, X, ArrowLeft, TrendingUp, Clock, Flame, ChevronRight, Zap } from "lucide-react";
import CompanyLogo from "@/components/ui/CompanyLogo";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (stock: Stock) => void;
}

const TRENDING_KEYWORDS = [
  { label: "Tata Motors", symbol: "TATAMOTORS" },
  { label: "Reliance", symbol: "RELIANCE" },
  { label: "Redington", symbol: "REDINGTON" },
  { label: "BlueStone", symbol: "BLUESTONE" },
  { label: "Ather Energy", symbol: "ATHER" },
  { label: "Pine Labs", symbol: "PINELABS" },
  { label: "Union Bank", symbol: "UNIONBANK" },
  { label: "Physics Wallah", symbol: "PW" },
  { label: "HDFC Bank", symbol: "HDFCBANK" },
];

const CATEGORIES = ["All", "Stocks", "F&O", "ETFs", "Mutual Funds"];

export default function SearchModal({ isOpen, onClose, onSelectStock }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Tata Motors",
    "Reliance",
    "BlueStone",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Combine unique stocks
  const allStocksMap = new Map<string, Stock>();
  [...MOST_TRADED, ...TOP_GAINERS, ...TOP_LOSERS, ...RECENTLY_VIEWED].forEach((s) => {
    if (!allStocksMap.has(s.id)) {
      allStocksMap.set(s.id, s);
    }
  });
  const allStocks = Array.from(allStocksMap.values());

  const filtered = query
    ? allStocks.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.symbol.toLowerCase().includes(query.toLowerCase())
      )
    : allStocks;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (stock: Stock) => {
    if (!recentSearches.includes(stock.name)) {
      setRecentSearches((prev) => [stock.name, ...prev.slice(0, 4)]);
    }
    onSelectStock(stock);
    onClose();
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col w-full h-full overflow-hidden select-none animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Top Header Bar */}
      <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors shrink-0 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 relative flex items-center">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search stocks, ETFs, mutual funds..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-100/80 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 border border-transparent transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2 rounded-full cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-xs shadow-emerald-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {!query ? (
          <>
            {/* Trending Searches Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Trending Searches</span>
                </h3>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                  Live
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {TRENDING_KEYWORDS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleKeywordClick(item.label)}
                    className="px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200/70 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer group active:scale-95"
                  >
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Recent Searches</span>
                  </h3>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="text-xs font-medium text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-1">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      onClick={() => handleKeywordClick(term)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{term}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Most Traded / Recommended List */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span>Most Traded Today</span>
              </h3>

              <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
                {MOST_TRADED.slice(0, 6).map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => handleSelect(stock)}
                    className="flex items-center justify-between p-3.5 hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CompanyLogo symbol={stock.symbol} className="h-9 w-9" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{stock.name}</h4>
                        <span className="text-xs text-slate-400 font-mono">NSE • {stock.symbol}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 block">
                        ₹{stock.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          stock.isPositive ? "text-emerald-600" : "text-rose-500"
                        }`}
                      >
                        {stock.isPositive ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Real-time Search Results */
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                {filtered.length} Results Found
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Search className="h-10 w-10 text-slate-300 mx-auto" />
                <p className="text-sm font-medium text-slate-600">No stocks found matching &quot;{query}&quot;</p>
                <p className="text-xs text-slate-400">Try searching for Tata, Reliance, or Redington</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
                {filtered.map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => handleSelect(stock)}
                    className="flex items-center justify-between p-3.5 hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CompanyLogo symbol={stock.symbol} className="h-9 w-9" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{stock.name}</h4>
                        <span className="text-xs text-slate-400 font-mono">NSE • {stock.symbol}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 block">
                        ₹{stock.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          stock.isPositive ? "text-emerald-600" : "text-rose-500"
                        }`}
                      >
                        {stock.isPositive ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

