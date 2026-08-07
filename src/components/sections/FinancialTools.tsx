"use client";

import React, { useState } from "react";
import { FINANCIAL_TOOLS } from "@/lib/stocks-data";
import { Wallet, TrendingUp, Calculator, Megaphone, FileText, Calendar, Filter, Hourglass, Folder, Crosshair, X } from "lucide-react";

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
};

export default function FinancialTools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <section className="py-4 px-4">
      <h2 className="text-base font-bold text-slate-800 mb-4">Tools</h2>

      <div className="grid grid-cols-5 gap-y-5 gap-x-2 text-center">
        {FINANCIAL_TOOLS.map((tool) => {
          const key = tool.icon || tool.iconName?.toLowerCase() || "wallet";
          const IconComponent = ICON_MAP[key] || Wallet;
          return (

            <div
              key={tool.id}
              onClick={() => setActiveTool(tool.name)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all duration-200">
                <IconComponent className="h-5 w-5 stroke-[1.75]" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 tracking-tight group-hover:text-emerald-700 transition-colors">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tool Drawer Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">{activeTool} Tool</h3>
              <button onClick={() => setActiveTool(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore advanced market analytics, margin trading facility (MTF), automated SIP calculators, and tax reporting tools built directly into Groww.
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
