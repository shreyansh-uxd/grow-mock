"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const INITIAL_INDICES: IndexData[] = [
  { name: "NIFTY 50", value: 24320.5, change: 142.3, changePercent: 0.59 },
  { name: "SENSEX", value: 79890.1, change: 410.2, changePercent: 0.52 },
  { name: "BANK NIFTY", value: 52140.8, change: -85.1, changePercent: -0.16 },
  { name: "FINNIFTY", value: 23450.25, change: 68.4, changePercent: 0.29 },
  { name: "MIDCAP 100", value: 56890.4, change: 312.1, changePercent: 0.55 },
  { name: "IT INDEX", value: 41250.7, change: 280.4, changePercent: 0.68 },
];

export default function LightMarketTicker() {
  const [indices, setIndices] = useState<IndexData[]>(INITIAL_INDICES);
  const tickerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Balanced market index tick interval (1400ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((idx) => {
          if (Math.random() > 0.45) return idx;

          const deltaPct = (Math.random() * 0.2 - 0.09) / 100;
          const valDiff = idx.value * deltaPct;
          const newVal = idx.value + valDiff;
          const newChange = idx.change + valDiff;
          const newPct = (newChange / (newVal - newChange)) * 100;

          return {
            ...idx,
            value: Number(newVal.toFixed(2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newPct.toFixed(2)),
          };
        })
      );
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  // GSAP Seamless Marquee Animation Loop
  useGSAP(
    () => {
      if (!tickerRef.current) return;
      
      tweenRef.current = gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      return () => {
        tweenRef.current?.kill();
      };
    },
    { scope: tickerRef }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4, ease: "power2.in" });
    }
  };

  const tickerItems = [...indices, ...indices, ...indices];

  return (
    <div className="bg-slate-50/90 backdrop-blur-sm border-b border-slate-100 px-4 py-2 flex items-center gap-3 overflow-hidden select-none">
      {/* Fixed Indices Badge */}
      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 shrink-0 uppercase tracking-wider bg-slate-50 z-10 pr-1">
        <TrendingUp className="h-3 w-3 text-emerald-600 animate-pulse" />
        <span>INDICES</span>
      </div>
      <div className="h-3 w-px bg-slate-200 shrink-0 z-10" />

      {/* Smooth GSAP Motion Track */}
      <div
        className="overflow-hidden w-full relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={tickerRef} className="flex items-center gap-3 w-max">
          {tickerItems.map((item, idx) => {
            const isPositive = item.change >= 0;

            return (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white border border-slate-200/60 shadow-2xs shrink-0 hover:border-emerald-400 hover:scale-102 transition-all cursor-pointer"
              >
                <span className="text-[11px] font-bold text-slate-700 font-sans tracking-tight whitespace-nowrap">
                  {item.name}
                </span>

                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span className="font-bold text-slate-700 whitespace-nowrap">
                    {item.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>

                  <span
                    className={`font-semibold inline-flex items-center text-[10px] whitespace-nowrap ${
                      isPositive ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

