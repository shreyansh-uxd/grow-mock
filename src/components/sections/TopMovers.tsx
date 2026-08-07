"use client";

import React, { useState } from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import LivePriceTag from "@/components/animations/LivePriceTag";
import { ChevronDown } from "lucide-react";

interface TopMoversProps {
  onSelectStock: (stock: Stock) => void;
}

export default function TopMovers({ onSelectStock }: TopMoversProps) {
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");
  const [capFilter, setCapFilter] = useState("Large Cap");

  const { topGainers, topLosers } = useStocks();

  const currentStocks = tab === "gainers" ? topGainers : topLosers;

  return (
    <section className="py-3.5 px-4">
      {/* Title & Dropdown Filter Header */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-slate-800">Top Movers</h2>

        <div className="relative">
          <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[11px] font-medium flex items-center gap-1 transition-colors">
            <span>{capFilter}</span>
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Segmented Control Pill Toggle */}
      <div className="flex p-1 bg-slate-100/80 rounded-2xl mb-3">
        <button
          onClick={() => setTab("gainers")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            tab === "gainers"
              ? "bg-emerald-800 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Gainers
        </button>
        <button
          onClick={() => setTab("losers")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            tab === "losers"
              ? "bg-rose-700 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Losers
        </button>
      </div>

      {/* Refined Stock Grid */}
      <div className="grid grid-cols-2 gap-3">
        {currentStocks.map((stock) => (
          <div
            key={stock.id}
            onClick={() => onSelectStock(stock)}
            className="groww-card p-3.5 flex flex-col justify-between h-32 cursor-pointer hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <CompanyLogo symbol={stock.symbol} className="h-9 w-9" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block truncate">
                  {stock.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">NSE</span>
              </div>
            </div>

            <div>
              <LivePriceTag stock={stock} size="normal" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
