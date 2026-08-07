"use client";

import React, { useState, useRef } from "react";
import { Stock } from "@/lib/stocks-data";
import CompanyLogo from "@/components/ui/CompanyLogo";
import StockChart from "@/components/charts/StockChart";
import { X, Bookmark, BookmarkCheck, Search, Bell, Calendar, ChevronRight, Maximize2, BarChart2, CheckCircle2, Info, ThumbsUp, PieChart, TrendingUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface StockDetailModalProps {
  stock: Stock | null;
  onClose: () => void;
}

const TIMELINES = ["1D", "1W", "1M", "1Y", "5Y", "ALL"];
const SUB_TABS = ["Overview", "News", "Events"];

export default function StockDetailModal({ stock, onClose }: StockDetailModalProps) {
  const [activeTimeline, setActiveTimeline] = useState("1D");
  const [activeSubTab, setActiveSubTab] = useState("Overview");
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [financialTab, setFinancialTab] = useState<"revenue" | "profit">("revenue");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [orderToast, setOrderToast] = useState<{ type: "BUY" | "SELL"; name: string } | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stock || !drawerRef.current) return;
      gsap.fromTo(
        drawerRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    },
    { scope: drawerRef, dependencies: [stock] }
  );

  if (!stock) return null;

  const handleOrder = (type: "BUY" | "SELL") => {
    setOrderToast({ type, name: stock.name });
    setTimeout(() => {
      setOrderToast(null);
    }, 2800);
  };

  const isPositive = stock.isPositive ?? stock.change >= 0;

  const dayLow = (stock.price * 0.96).toFixed(2);
  const dayHigh = (stock.price * 1.04).toFixed(2);
  const low52w = (stock.low52w || stock.price * 0.6).toFixed(2);
  const high52w = (stock.high52w || stock.price * 1.15).toFixed(2);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Groww Style Bottom Sheet Drawer */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-white rounded-t-[32px] shadow-2xl border-t border-slate-100 z-[10000] flex flex-col max-h-[94vh] overflow-hidden"
      >
        {/* Top Drag Handle Indicator */}
        <div className="pt-3 pb-1 shrink-0 bg-white">
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto" />
        </div>

        {/* Header: Company Logo, Name, & Top Action Icons */}
        <div className="px-5 py-2.5 flex items-center justify-between bg-white shrink-0 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <CompanyLogo symbol={stock.symbol} className="h-10 w-10" />
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">{stock.name}</h2>
              <span className="text-[10px] text-slate-400 font-mono">NASDAQ • {stock.symbol}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Bookmark Stock"
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-emerald-600" /> : <Bookmark className="h-4 w-4" />}
            </button>
            <button className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
              <Bell className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 no-scrollbar bg-white">
          
          {/* Price Header & Category Tag */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight block">
                ${stock.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-mono text-xs font-semibold">
                <span className={isPositive ? "text-emerald-600" : "text-rose-500"}>
                  {isPositive ? `+${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)` : `${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`}
                </span>
                <span className="text-slate-400 font-normal">{activeTimeline}</span>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              Equities
            </span>
          </div>

          {/* Interactive Third-Party Recharts Chart */}
          <div className="relative pt-1">
            {chartType === "line" ? (
              <StockChart
                timeline={activeTimeline}
                isPositive={isPositive}
                basePrice={stock.price}
              />
            ) : (
              /* Candlestick Mode */
              <div className="h-48 w-full flex items-end justify-between px-2 pt-4 border-b border-dashed border-slate-200">
                {[60, 45, 75, 90, 65, 80, 110, 95, 70, 85, 100, 120, 105, 90, 115].map((h, i) => {
                  const candleGreen = i % 3 !== 0;
                  return (
                    <div key={i} className="flex flex-col items-center justify-end h-full w-2">
                      <div className={`w-0.5 ${candleGreen ? "bg-emerald-500" : "bg-rose-500"}`} style={{ height: `${h + 10}px` }} />
                      <div className={`w-2.5 rounded-xs ${candleGreen ? "bg-emerald-500" : "bg-rose-500"}`} style={{ height: `${h * 0.6}px` }} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Timeline Selector Bar + Chart Toggle */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-emerald-600 mr-1.5 font-mono">NASDAQ</span>
                {TIMELINES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTimeline(t)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeTimeline === t
                        ? "bg-slate-200 text-slate-900"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setChartType(chartType === "line" ? "candlestick" : "line")}
                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Toggle Candlestick / Line"
              >
                {chartType === "line" ? <BarChart2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Create Stock SIP Banner Card */}
          <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Create Stock SIP</h4>
                <p className="text-[10px] text-slate-400">Automate your investments in this stock</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>

          {/* Sub Tabs: Overview / News / Events */}
          <div>
            <div className="flex items-center border-b border-slate-200 gap-6">
              {SUB_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`py-2 text-xs font-bold relative transition-colors cursor-pointer ${
                    activeSubTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                  {activeSubTab === tab && (
                    <div className="h-0.5 bg-emerald-500 w-full absolute bottom-0 left-0 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Comprehensive Groww Real Overview Data Section */}
            {activeSubTab === "Overview" && (
              <div className="pt-4 space-y-5">
                
                {/* 1. Performance Ranges */}
                <div className="space-y-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Performance</span>
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </h4>

                  {/* Today's Low / High Range */}
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Today&apos;s Low <strong className="text-slate-800">${dayLow}</strong></span>
                      <span className="text-slate-400">Today&apos;s High <strong className="text-slate-800">${dayHigh}</strong></span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 relative overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>

                  {/* 52W Low / High Range */}
                  <div className="space-y-1.5 font-mono pt-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">52W Low <strong className="text-rose-500">${low52w}</strong></span>
                      <span className="text-slate-400">52W High <strong className="text-emerald-600">${high52w}</strong></span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 relative overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  {/* Open & Prev Close Data Row */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/60 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Open</span>
                      <span className="font-bold text-slate-800">${(stock.price * 0.985).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Prev. Close</span>
                      <span className="font-bold text-slate-800">${(stock.price * 0.975).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume</span>
                      <span className="font-bold text-slate-800">4.25M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lower Circuit</span>
                      <span className="font-bold text-rose-500">${(stock.price * 0.90).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Fundamentals Key-Value Table */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Fundamentals
                  </h4>

                  <div className="divide-y divide-slate-200/60 font-mono text-[11px]">
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="flex justify-between pr-2 border-r border-slate-200/60">
                        <span className="text-slate-400">Market Cap</span>
                        <span className="font-bold text-slate-900">{stock.marketCap || "$14.25B"}</span>
                      </div>
                      <div className="flex justify-between pl-2">
                        <span className="text-slate-400">P/E Ratio</span>
                        <span className="font-bold text-slate-900">{stock.peRatio || 18.4}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="flex justify-between pr-2 border-r border-slate-200/60">
                        <span className="text-slate-400">P/B Ratio</span>
                        <span className="font-bold text-slate-900">3.12</span>
                      </div>
                      <div className="flex justify-between pl-2">
                        <span className="text-slate-400">Industry P/E</span>
                        <span className="font-bold text-slate-900">22.10</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="flex justify-between pr-2 border-r border-slate-200/60">
                        <span className="text-slate-400">ROE</span>
                        <span className="font-bold text-emerald-600">22.40%</span>
                      </div>
                      <div className="flex justify-between pl-2">
                        <span className="text-slate-400">EPS (TTM)</span>
                        <span className="font-bold text-slate-900">$19.50</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="flex justify-between pr-2 border-r border-slate-200/60">
                        <span className="text-slate-400">Div. Yield</span>
                        <span className="font-bold text-slate-900">1.85%</span>
                      </div>
                      <div className="flex justify-between pl-2">
                        <span className="text-slate-400">Book Value</span>
                        <span className="font-bold text-slate-900">$115.20</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Analyst Ratings Card */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Analyst Rating</span>
                    </h4>
                    <span className="text-xs font-extrabold text-emerald-600 font-mono">84% BUY</span>
                  </div>

                  <div className="h-2.5 w-full rounded-full flex overflow-hidden gap-1 bg-slate-200">
                    <div className="h-full bg-emerald-500 rounded-l-full w-[84%]" />
                    <div className="h-full bg-amber-400 w-[10%]" />
                    <div className="h-full bg-rose-500 rounded-r-full w-[6%]" />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span className="text-emerald-600 font-bold">84% Buy</span>
                    <span className="text-amber-500 font-bold">10% Hold</span>
                    <span className="text-rose-500 font-bold">6% Sell</span>
                  </div>
                </div>

                {/* 4. Financial Performance Chart - Clean Header & Spacing */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-4">
                  
                  {/* Clean Non-Overlapping Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Financial Performance</span>
                    </h4>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 text-[10px] shadow-2xs">
                      <button
                        onClick={() => setFinancialTab("revenue")}
                        className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                          financialTab === "revenue" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Revenue
                      </button>
                      <button
                        onClick={() => setFinancialTab("profit")}
                        className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                          financialTab === "profit" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Profit
                      </button>
                    </div>
                  </div>

                  {/* Clean Spacious Bar Chart */}
                  <div className="pt-6 pb-2">
                    <div className="h-32 flex items-end justify-around px-2 border-b border-slate-200 relative">
                      {[
                        { quarter: "Q1 '25", rev: 800, profit: 120 },
                        { quarter: "Q2 '25", rev: 950, profit: 150 },
                        { quarter: "Q3 '25", rev: 1100, profit: 180 },
                        { quarter: "Q4 '25", rev: 1300, profit: 210 },
                      ].map((item, idx) => {
                        const val = financialTab === "revenue" ? item.rev : item.profit;
                        const heightPct = financialTab === "revenue" ? (val / 1400) * 100 : (val / 250) * 100;

                        return (
                          <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group relative">
                            {/* Value Label Neatly Above Bar */}
                            <span className="text-[10px] font-mono font-bold text-slate-600 whitespace-nowrap bg-white px-1.5 py-0.5 rounded-md border border-slate-200/60 shadow-2xs">
                              ${val}M
                            </span>

                            {/* Rounded Bar */}
                            <div
                              className="w-9 rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-110 transition-all duration-300 shadow-xs"
                              style={{ height: `${heightPct}%` }}
                            />

                            {/* Quarter Label */}
                            <span className="text-[10px] font-mono font-bold text-slate-400 pt-1">
                              {item.quarter}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 5. Shareholding Pattern */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <PieChart className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Shareholding Pattern</span>
                  </h4>

                  <div className="space-y-2.5 font-mono text-[11px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Institutional Investors</span>
                        <span className="font-bold text-slate-900">54.20%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "54.2%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Mutual Funds & ETFs</span>
                        <span className="font-bold text-slate-900">22.80%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-700 rounded-full" style={{ width: "22.8%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Retail Investors</span>
                        <span className="font-bold text-slate-900">23.00%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full" style={{ width: "23%" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* News Content */}
            {activeSubTab === "News" && (
              <div className="pt-3 space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <h5 className="font-bold text-slate-800">{stock.name} Reports Strong Quarter Growth</h5>
                  <span className="text-[10px] text-slate-400 font-mono">2 hours ago • MarketWatch</span>
                </div>
              </div>
            )}

            {/* Events Content */}
            {activeSubTab === "Events" && (
              <div className="pt-3 space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-800">Q2 Earnings Call</h5>
                    <span className="text-[10px] text-slate-400 font-mono">18 Aug 2026</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">Upcoming</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Order Toast Notification */}
        {orderToast && (
          <div className="absolute top-14 left-4 right-4 z-30 p-3 rounded-2xl bg-slate-900 text-white font-mono text-xs shadow-xl border border-slate-700 flex items-center justify-between animate-bounce">
            <span className="font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {orderToast.type} Order Executed for {orderToast.name}!
            </span>
            <span className="text-emerald-400 font-bold">1 Qty</span>
          </div>
        )}

        {/* Clean Sell & Buy Action Bar */}
        <div className="p-4 bg-white border-t border-slate-100 grid grid-cols-2 gap-3 shrink-0 z-20">
          <button
            onClick={() => handleOrder("SELL")}
            className="py-3 rounded-2xl bg-[#ef5350] hover:bg-rose-600 text-white font-bold text-sm tracking-wide shadow-md active:scale-95 transition-all cursor-pointer text-center"
          >
            Sell
          </button>

          <button
            onClick={() => handleOrder("BUY")}
            className="py-3 rounded-2xl bg-[#00b386] hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-md active:scale-95 transition-all cursor-pointer text-center"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
