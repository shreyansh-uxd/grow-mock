"use client";

import React, { useState, useRef } from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import LivePriceTag from "@/components/animations/LivePriceTag";
import { Plus, Bell, FolderPlus, X, CheckCircle2, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface WatchlistViewProps {
  onSelectStock: (stock: Stock) => void;
  onOpenSearch: () => void;
}

const PRESET_TAGS = ["EV & Auto", "Bank Nifty", "High Growth", "Penny Stocks", "IT Sector"];

export default function WatchlistView({ onSelectStock, onOpenSearch }: WatchlistViewProps) {
  const [activeTab, setActiveTab] = useState("My Watchlist");
  const [watchlists, setWatchlists] = useState(["My Watchlist", "Tech Giants", "Dividends"]);
  const [alerts, setAlerts] = useState<Record<string, boolean>>({ redington: true });
  
  // Create Watchlist Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const { stocksMap } = useStocks();

  useGSAP(
    () => {
      if (!isDrawerOpen || !drawerRef.current) return;
      gsap.fromTo(
        drawerRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.3, ease: "power3.out" }
      );
    },
    { scope: drawerRef, dependencies: [isDrawerOpen] }
  );

  // Distinct stock datasets for each tab
  const getTabStocks = (tab: string) => {
    const allStocks = Object.values(stocksMap);
    if (allStocks.length === 0) return [];

    switch (tab) {
      case "Tech Giants":
        return allStocks.filter((s) => ["pinelabs", "ather", "pw", "redington"].includes(s.id));

      case "Dividends":
        return allStocks.filter((s) => ["unionbank", "tatamotors", "reliance", "axisbank"].includes(s.id));

      case "EV & Auto":
        return allStocks.filter((s) => ["ather", "tatamotors"].includes(s.id));

      case "Bank Nifty":
        return allStocks.filter((s) => ["unionbank", "axisbank"].includes(s.id));

      case "My Watchlist":
        return allStocks;

      default:
        return allStocks.slice(0, 4);
    }
  };

  const currentStockList = getTabStocks(activeTab);

  const toggleAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWatchlistName.trim()) return;

    const cleanName = newWatchlistName.trim();
    if (!watchlists.includes(cleanName)) {
      setWatchlists([...watchlists, cleanName]);
      setActiveTab(cleanName);
      setToastMessage(`Watchlist "${cleanName}" created successfully!`);
      setTimeout(() => setToastMessage(null), 3000);
    }

    setNewWatchlistName("");
    setIsDrawerOpen(false);
  };

  return (
    <div className="pb-4 bg-white min-h-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-4 right-4 z-40 p-3.5 rounded-2xl bg-white text-slate-900 font-mono text-xs shadow-2xl border border-emerald-200 flex items-center justify-between animate-bounce">
          <span className="font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {toastMessage}
          </span>
          <span className="text-emerald-600 font-bold">Active</span>
        </div>
      )}

      {/* Watchlist Sub-Header & Dynamic Working Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 pr-2">
            {watchlists.map((wl) => (
              <button
                key={wl}
                onClick={() => setActiveTab(wl)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === wl
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {wl}
              </button>
            ))}
          </div>

          {/* Functional + New Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold rounded-full text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0 border border-emerald-200/80 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Stock Items List for Active Tab */}
      <div className="p-4 space-y-3 bg-white">
        {currentStockList.length > 0 ? (
          currentStockList.map((stock) => (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="groww-card p-3.5 flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all group"
            >
              {/* Left Stock Info */}
              <div className="flex items-center gap-3">
                <CompanyLogo symbol={stock.symbol} className="h-10 w-10" />
                <div>
                  <h3 className="text-xs font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">
                    {stock.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">NSE • {stock.symbol}</span>
                </div>
              </div>

              {/* Right Price & Actions */}
              <div className="flex items-center gap-3 text-right">
                <LivePriceTag stock={stock} size="normal" />

                <button
                  onClick={(e) => toggleAlert(stock.id, e)}
                  className={`p-1.5 rounded-xl border transition-colors ${
                    alerts[stock.id]
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "border-slate-200 text-slate-400 hover:text-slate-600"
                  }`}
                  title="Toggle Price Alert"
                >
                  <Bell className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <FolderPlus className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-slate-600">No stocks in &quot;{activeTab}&quot; yet</p>
            <button
              onClick={onOpenSearch}
              className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition-colors shadow-sm"
            >
              + Add Stocks to Watchlist
            </button>
          </div>
        )}
      </div>

      {/* Groww Style Create Watchlist Bottom Sheet Drawer */}
      {isDrawerOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-xs">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

          <div
            ref={drawerRef}
            className="relative w-full max-w-md bg-white rounded-t-[32px] p-6 shadow-2xl border-t border-slate-100 z-[10000] space-y-5"
          >

            {/* Top Drag Handle Indicator */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-2 mb-2" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <FolderPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Create New Watchlist</h3>
                  <p className="text-[11px] text-slate-400">Group your favorite stocks into a custom list</p>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Watchlist Name
                </label>
                <input
                  type="text"
                  autoFocus
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  placeholder="e.g. EV & Auto, Top 2026 Picks..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              {/* Quick Preset Categories */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" /> Suggested Categories
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setNewWatchlistName(tag)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="py-3.5 px-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors flex-1 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newWatchlistName.trim()}
                  className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 flex-1 cursor-pointer"
                >
                  Create Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
