"use client";

import React from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import LivePriceTag from "@/components/animations/LivePriceTag";

interface MostTradedProps {
  onSelectStock: (stock: Stock) => void;
}

export default function MostTraded({ onSelectStock }: MostTradedProps) {
  const { mostTraded } = useStocks();

  // Show top 6 stocks in Most Traded section
  const displayedStocks = mostTraded.slice(0, 6);

  return (
    <section className="py-3.5 px-4">
      <h2 className="text-sm font-semibold text-slate-500 mb-3">Most Traded Today</h2>

      {/* Refined Card Grid with Spacious Padding & Room */}
      <div className="grid grid-cols-2 gap-3.5">
        {displayedStocks.map((stock) => (
          <div
            key={stock.id}
            onClick={() => onSelectStock(stock)}
            className="groww-card p-4 flex flex-col justify-between h-34 cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all group space-y-3"
          >
            {/* Header: Real Logo & Name */}
            <div className="flex items-center gap-3">
              <CompanyLogo symbol={stock.symbol} className="h-10 w-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-700 transition-colors block truncate">
                  {stock.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">NSE</span>
              </div>
            </div>

            {/* Live Fluctuation Price Tag */}
            <div>
              <LivePriceTag stock={stock} size="normal" />
            </div>
          </div>
        ))}

        {/* View More Card */}
        <div className="groww-card p-4 flex flex-col justify-between h-34 cursor-pointer hover:border-emerald-400 transition-colors bg-gradient-to-br from-white to-emerald-50/20 space-y-3">
          <div className="flex items-center gap-2">
            <CompanyLogo symbol="ATHER" className="h-8 w-8" />
            <CompanyLogo symbol="PW" className="h-8 w-8 -ml-3" />
            <CompanyLogo symbol="PINELABS" className="h-8 w-8 -ml-3" />
          </div>

          <div>
            <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase tracking-wider mb-0.5">
              +150 More Stocks
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
              View All Market &gt;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
