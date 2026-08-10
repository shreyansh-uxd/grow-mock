"use client";

import React from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import RollingNumber from "@/components/animations/RollingNumber";
import GsapCarousel from "@/components/animations/GsapCarousel";

interface RecentlyViewedProps {
  onSelectStock: (stock: Stock) => void;
}

export default function RecentlyViewed({ onSelectStock }: RecentlyViewedProps) {
  const { recentlyViewed } = useStocks();

  return (
    <section className="py-4 border-b border-slate-100 bg-white">
      <GsapCarousel
        title="Recently Viewed"
        scrollAmount={220}
        enableScaleEffect={true}
        showProgress={false}
      >
        {recentlyViewed.map((stock, idx) => {
          const pctString =
            stock.changePercent > 0
              ? `+${stock.changePercent.toFixed(2)}%`
              : `${stock.changePercent.toFixed(2)}%`;

          return (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group relative p-3 rounded-2xl border border-slate-100/90 bg-white hover:border-emerald-300 hover:shadow-lg transition-all duration-200 w-28"
            >
              {/* View Rank Badge */}
              <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold text-slate-400">
                #{idx + 1}
              </span>

              {/* Logo Avatar Container */}
              <div className="relative mt-1">
                <CompanyLogo
                  symbol={stock.symbol}
                  className="h-12 w-12 group-hover:scale-105 transition-all duration-200"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>

              {/* Company Name */}
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-tight group-hover:text-emerald-600 transition-colors truncate max-w-full">
                {stock.name}
              </span>

              {/* Slot Machine Rolling Digit Percentage Change */}
              <RollingNumber
                value={pctString}
                isPositive={stock.isPositive}
                tickTime={stock.tickTime}
              />
            </div>
          );
        })}
      </GsapCarousel>
    </section>
  );
}

