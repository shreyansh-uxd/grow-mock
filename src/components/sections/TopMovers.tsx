"use client";

import React, { useState, useRef } from "react";
import { Stock } from "@/lib/stocks-data";
import { useStocks } from "@/context/StockContext";
import CompanyLogo from "@/components/ui/CompanyLogo";
import LivePriceTag from "@/components/animations/LivePriceTag";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TopMoversProps {
  onSelectStock: (stock: Stock) => void;
}

export default function TopMovers({ onSelectStock }: TopMoversProps) {
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");
  const [capFilter, setCapFilter] = useState("Large Cap");
  const gridRef = useRef<HTMLDivElement>(null);

  const { topGainers, topLosers } = useStocks();

  const currentStocks = tab === "gainers" ? topGainers : topLosers;

  // Stagger animate cards on tab switch
  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = Array.from(gridRef.current.children);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 14, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: gridRef, dependencies: [tab] }
  );

  return (
    <section className="py-3.5 px-4">
      {/* Title & Dropdown Filter Header */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-semibold text-slate-500">Top Movers</h2>

        <div className="relative">
          <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer">
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
              ? "bg-emerald-600 text-white shadow-xs shadow-emerald-600/20"
              : "text-slate-600 hover:text-slate-700"
          }`}
        >
          Gainers
        </button>
        <button
          onClick={() => setTab("losers")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            tab === "losers"
              ? "bg-rose-700 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-700"
          }`}
        >
          Losers
        </button>
      </div>

      {/* Refined Stock Grid */}
      <div ref={gridRef} className="grid grid-cols-2 gap-3">
        {currentStocks.map((stock) => (
          <div
            key={stock.id}
            onClick={() => onSelectStock(stock)}
            className="groww-card p-3.5 flex flex-col justify-between h-32 cursor-pointer hover:border-emerald-400 transition-all group hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2.5">
              <CompanyLogo symbol={stock.symbol} className="h-9 w-9" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-700 transition-colors block truncate">
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

