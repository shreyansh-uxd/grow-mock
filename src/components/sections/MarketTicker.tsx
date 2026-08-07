"use client";

import React from "react";

export default function MarketTicker() {
  return (
    <div className="bg-slate-600 text-white px-4 py-2 text-[11px] font-medium tracking-wide flex items-center gap-4 overflow-x-auto no-scrollbar shadow-inner">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="font-bold tracking-wider uppercase text-slate-300">NIFTY 50</span>
        <span className="font-mono">24,383.60</span>
        <span className="text-[10px] bg-emerald-700/80 text-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold">
          +66.45(0.27%)
        </span>
      </div>

      <span className="text-slate-400 font-light">|</span>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="font-bold tracking-wider uppercase text-slate-300">SENSEX</span>
        <span className="font-mono">78,094.64</span>
        <span className="text-[10px] bg-emerald-700/80 text-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold">
          +186.43(0.24%)
        </span>
      </div>

      <span className="text-slate-400 font-light">|</span>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="font-bold tracking-wider uppercase text-slate-300">BANK NIFTY</span>
        <span className="font-mono">52,410.15</span>
        <span className="text-[10px] bg-emerald-700/80 text-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold">
          +112.30(0.21%)
        </span>
      </div>
    </div>
  );
}
