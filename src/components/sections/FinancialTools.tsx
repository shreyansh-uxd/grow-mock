"use client";

import React, { useRef, useState } from "react";
import { FINANCIAL_TOOLS } from "@/lib/stocks-data";
import {
  Wallet,
  TrendingUp,
  Calculator,
  Megaphone,
  FileText,
  Calendar,
  Filter,
  Hourglass,
  Folder,
  Crosshair,
  Layers,
  Zap,
  Rocket,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  calculator: Calculator,
  megaphone: Megaphone,
  "file-text": FileText,
  calendar: Calendar,
  filter: Filter,
  hourglass: Hourglass,
  folder: Folder,
  crosshair: Crosshair,
  layers: Layers,
  zap: Zap,
  rocket: Rocket,
  shoppingbag: ShoppingBag,
};

/* Each card gets a unique gradient pairing */
const CARD_THEMES = [
  { gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", iconBg: "bg-emerald-100", ring: "ring-emerald-500/20" },
  { gradient: "from-violet-500 to-purple-600", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200/60", iconBg: "bg-violet-100", ring: "ring-violet-500/20" },
  { gradient: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200/60", iconBg: "bg-amber-100", ring: "ring-amber-500/20" },
  { gradient: "from-sky-500 to-blue-600", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200/60", iconBg: "bg-sky-100", ring: "ring-sky-500/20" },
  { gradient: "from-rose-500 to-pink-600", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200/60", iconBg: "bg-rose-100", ring: "ring-rose-500/20" },
  { gradient: "from-cyan-500 to-indigo-600", bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200/60", iconBg: "bg-cyan-100", ring: "ring-cyan-500/20" },
];

export default function FinancialTools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -260 : 260;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-4 bg-white">
      {/* Header with Carousel Controls */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-sm font-bold text-slate-700">Tools</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous Tool"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next Tool"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 overflow-x-auto px-4 pb-2 no-scrollbar scroll-smooth"
      >
        {FINANCIAL_TOOLS.map((tool, idx) => {
          const key =
            tool.icon || tool.iconName?.toLowerCase() || "wallet";
          const IconComponent = ICON_MAP[key] || Wallet;
          const theme = CARD_THEMES[idx % CARD_THEMES.length];

          return (
            <div
              key={tool.id}
              onClick={() => setActiveTool(tool.name)}
              className={`
                relative flex flex-col justify-between shrink-0 w-44
                rounded-2xl border ${theme.border} ${theme.bg}
                p-4 cursor-pointer group
                hover:shadow-lg hover:scale-[1.03] hover:ring-2 ${theme.ring}
                transition-all duration-200 ease-out
              `}
            >
              {/* Gradient Icon Badge */}
              <div>
                <div
                  className={`
                    h-11 w-11 rounded-xl bg-gradient-to-br ${theme.gradient}
                    flex items-center justify-center mb-3
                    shadow-md group-hover:shadow-lg
                    transition-shadow duration-200
                  `}
                >
                  <IconComponent className="h-5 w-5 text-white stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-700 mb-0.5 leading-snug">
                  {tool.name}
                </h3>

                {/* Category Badge */}
                <span
                  className={`inline-block text-[9px] font-bold uppercase tracking-wider ${theme.text} mb-2`}
                >
                  {tool.category}
                </span>

                {/* Description */}
                <p className="text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                  {tool.description}
                </p>
              </div>

              {/* CTA Arrow */}
              <div className="flex items-center justify-end mt-3">
                <div
                  className={`
                    h-7 w-7 rounded-full ${theme.iconBg}
                    flex items-center justify-center
                    group-hover:bg-gradient-to-br group-hover:${theme.gradient}
                    transition-all duration-200
                  `}
                >
                  <ArrowRight
                    className={`h-3.5 w-3.5 ${theme.text} group-hover:text-white transition-colors duration-200`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tool Drawer Modal */}
      {activeTool && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">
                {activeTool} Tool
              </h3>
              <button
                onClick={() => setActiveTool(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore advanced market analytics, margin trading facility
              (MTF), automated SIP calculators, and tax reporting tools
              built directly into Religare.
            </p>
            <button
              onClick={() => setActiveTool(null)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Launch {activeTool}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
