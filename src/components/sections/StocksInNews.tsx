"use client";

import React from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import LivePriceTag from "@/components/animations/LivePriceTag";

interface StocksInNewsProps {
  onSelectStock: (stock: Stock) => void;
}

export default function StocksInNews({ onSelectStock }: StocksInNewsProps) {
  const { stocksInNews } = useStocks();

  return (
    <section className="py-3.5 px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-700">Stocks in News</h2>
        <span className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer">
          News &gt;
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stocksInNews.map((stock) => (
          <div
            key={stock.id}
            onClick={() => onSelectStock(stock)}
            className="groww-card p-3.5 flex flex-col justify-between h-32 cursor-pointer hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <CompanyLogo symbol={stock.symbol} className="h-9 w-9" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700 transition-colors block truncate">
                  {stock.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">NEWS</span>
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
