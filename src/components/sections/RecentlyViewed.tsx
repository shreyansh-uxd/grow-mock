"use client";

import React, { useRef } from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import RollingNumber from "@/components/animations/RollingNumber";
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";

interface RecentlyViewedProps {
  onSelectStock: (stock: Stock) => void;
}

export default function RecentlyViewed({ onSelectStock }: RecentlyViewedProps) {
  const { recentlyViewed } = useStocks();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -200 : 200;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-4 border-b border-slate-100 bg-white">
      {/* Header with Slider Navigation Controls */}
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">Recently Viewed</h2>
          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Updates
          </span>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous Stock"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next Stock"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Smooth Carousel Track with Rolling Count Change Animations */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 overflow-x-auto px-4 pb-2 no-scrollbar scroll-smooth"
      >
        {recentlyViewed.map((stock, idx) => {
          const pctString = stock.changePercent > 0 ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`;
          
          return (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group relative p-2.5 rounded-2xl border border-slate-100/80 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 w-28"
            >
              {/* View Rank Badge */}
              <span className="absolute top-1.5 right-1.5 text-[9px] font-mono font-bold text-slate-400">
                #{idx + 1}
              </span>

              {/* Logo Avatar Container */}
              <div className="relative mt-1">
                <CompanyLogo
                  symbol={stock.symbol}
                  className="h-13 w-13 group-hover:scale-105 transition-all duration-200"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>

              {/* Company Name */}
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight group-hover:text-emerald-600 transition-colors truncate max-w-full">
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
      </div>
    </section>
  );
}
