"use client";

import React from "react";
import { TrendingUp, BarChart2, Folder, MoreHorizontal } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "stocks", label: "Stocks", icon: TrendingUp },
    { id: "watchlist", label: "Watchlist", icon: BarChart2 },
    { id: "portfolio", label: "Portfolio", icon: Folder },
    { id: "more", label: "More", icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center gap-1 py-1 px-3 cursor-pointer group"
            >
              {/* Active Indicator Top Line */}
              {isActive && (
                <span className="absolute -top-2 w-8 h-0.5 bg-emerald-600 rounded-full" />
              )}

              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? "text-emerald-600 stroke-[2.2]" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              <span
                className={`text-[10px] font-bold transition-colors ${
                  isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
