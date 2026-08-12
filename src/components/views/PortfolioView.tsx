"use client";

import React, { useState } from "react";
import { PORTFOLIO_HOLDINGS, ACTIVE_SIPS, Stock } from "@/lib/stocks-data";
import CompanyLogo from "@/components/ui/CompanyLogo";
import CountUpNumber from "@/components/animations/CountUpNumber";
import { Calendar, ArrowUpRight, ShieldCheck } from "lucide-react";

interface PortfolioViewProps {
  onSelectStock: (stock: Stock) => void;
}

export default function PortfolioView({ onSelectStock }: PortfolioViewProps) {
  const [activeTab, setActiveTab] = useState<"holdings" | "sips">("holdings");

  const totalInvested = PORTFOLIO_HOLDINGS.reduce((acc, h) => acc + h.investedValue, 0);
  const totalCurrent = PORTFOLIO_HOLDINGS.reduce((acc, h) => acc + h.currentValue, 0);
  const totalReturns = totalCurrent - totalInvested;
  const totalReturnsPercent = (totalReturns / totalInvested) * 100;
  const dayReturns = PORTFOLIO_HOLDINGS.reduce((acc, h) => acc + h.dayReturns, 0);

  return (
    <div className="pb-4 bg-white min-h-full">
      
      {/* Sub Header & Tab Selector */}
      <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between">
        <div className="flex p-0.5 bg-slate-100 rounded-xl w-full">
          <button
            onClick={() => setActiveTab("holdings")}
            className={`flex-1 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
              activeTab === "holdings"
                ? "bg-white text-slate-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Holdings ({PORTFOLIO_HOLDINGS.length})
          </button>
          <button
            onClick={() => setActiveTab("sips")}
            className={`flex-1 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
              activeTab === "sips"
                ? "bg-white text-slate-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Active SIPs ({ACTIVE_SIPS.length})
          </button>
        </div>
      </div>

      <div className="p-2.5 space-y-3 bg-white">
        
        {/* Groww Light Mode Net Worth Summary Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="font-bold text-slate-400">TOTAL PORTFOLIO VALUE</span>
          </div>

          <div>
            <CountUpNumber
              value={totalCurrent}
              prefix="₹"
              className="text-[22px] font-black text-slate-700 tracking-tight font-mono block"
            />
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 font-mono">
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                <CountUpNumber
                  value={totalReturns}
                  prefix="+₹"
                  suffix={` (${totalReturnsPercent.toFixed(2)}%)`}
                />
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Total Returns</span>
            </div>
          </div>

          {/* Light Mode Grid Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-mono">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span className="text-slate-400 block text-[8px] uppercase">Invested Amount</span>
              <CountUpNumber
                value={totalInvested}
                prefix="₹"
                className="font-bold text-slate-700 block text-[11px]"
              />
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span className="text-slate-400 block text-[8px] uppercase">1D Returns</span>
              <CountUpNumber
                value={dayReturns}
                prefix="+₹"
                className="font-bold text-emerald-600 block text-[11px]"
              />
            </div>
          </div>

        </div>

        {/* Tab View Switcher */}
        {activeTab === "holdings" ? (
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1 block">Your Stock Holdings</h2>
            {PORTFOLIO_HOLDINGS.map((h) => (
              <div
                key={h.id}
                onClick={() =>
                  onSelectStock({
                    id: h.id,
                    name: h.name,
                    symbol: h.symbol,
                    logo: "",
                    logoBg: h.logoBg,
                    price: h.currentPrice,
                    change: 26.2,
                    changePercent: 8.15,
                    isPositive: true,
                  })
                }
                className="groww-card py-2 px-2.5 cursor-pointer hover:border-emerald-500 transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <CompanyLogo symbol={h.symbol} className="h-8 w-8 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-slate-700 truncate">{h.name}</h3>
                      <span className="text-[9px] text-slate-400 font-mono block truncate">
                        {h.quantity} Qty • Avg ₹{h.avgPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0">
                    <span className="text-[12px] font-bold text-slate-700 block">
                      ₹{h.currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`text-[10px] font-semibold block ${h.totalReturns >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                      {h.totalReturns >= 0 ? `+₹${h.totalReturns.toFixed(2)}` : `-₹${Math.abs(h.totalReturns).toFixed(2)}`} ({h.totalReturnsPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Active SIP Mandates</h2>

            {ACTIVE_SIPS.map((sip) => (
              <div key={sip.id} className="groww-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-700">{sip.fundName}</h3>
                    <span className="text-xs text-slate-400 font-mono">Monthly SIP</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    {sip.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-mono">
                  <span className="text-slate-500">Monthly Amount</span>
                  <span className="font-bold text-slate-700">₹{sip.monthlyAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Next Deduction</span>
                  <span className="font-bold text-indigo-600 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {sip.nextDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
