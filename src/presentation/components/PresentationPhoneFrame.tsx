"use client";

import React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface PresentationPhoneFrameProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
}

export default function PresentationPhoneFrame({
  header,
  children,
  bottomNav,
}: PresentationPhoneFrameProps) {
  return (
    <div className="w-[300px] sm:w-[320px] md:w-[340px] h-[580px] sm:h-[620px] md:h-[660px] max-h-[76vh] bg-slate-200/90 border border-slate-300/80 rounded-[44px] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-white relative flex flex-col shrink-0 select-none">
      {/* Metallic Side Buttons */}
      <div className="absolute -left-[8px] top-24 w-[3px] h-8 bg-slate-300 border-l border-slate-400/60 rounded-l-sm shadow-2xs" />
      <div className="absolute -left-[8px] top-36 w-[3px] h-10 bg-slate-300 border-l border-slate-400/60 rounded-l-sm shadow-2xs" />
      <div className="absolute -left-[8px] top-48 w-[3px] h-10 bg-slate-300 border-l border-slate-400/60 rounded-l-sm shadow-2xs" />
      <div className="absolute -right-[8px] top-32 w-[3px] h-14 bg-slate-300 border-r border-slate-400/60 rounded-r-sm shadow-2xs" />

      {/* Inner Phone Screen Container */}
      <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative flex flex-col shadow-xs border border-slate-200/60">
        
        {/* iOS Top Bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 bg-white shrink-0 z-40 text-slate-900 font-semibold border-b border-slate-50">
          <span className="text-[11px] font-mono font-bold tracking-tight text-slate-800">
            09:41
          </span>

          {/* Dynamic Island Camera Notch */}
          <div className="w-20 h-3.5 bg-slate-900 rounded-full flex items-center justify-end px-1.5 gap-1 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="h-1 w-1 rounded-full bg-slate-700" />
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1 text-slate-700">
            <Signal className="h-2.5 w-2.5 stroke-[2.5]" />
            <Wifi className="h-2.5 w-2.5 stroke-[2.5]" />
            <Battery className="h-3 w-3 stroke-[2.2] fill-slate-800" />
          </div>
        </div>

        {/* Optional Header (Navbar / Ticker) */}
        {header && (
          <div className="shrink-0 z-30 bg-white border-b border-slate-100">
            {header}
          </div>
        )}

        {/* Scrollable View Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-white relative">
          {children}
        </div>

        {/* Bottom Navigation */}
        {bottomNav && (
          <div className="shrink-0 z-30 bg-white border-t border-slate-100">
            {bottomNav}
          </div>
        )}

        {/* Bottom Home Indicator Bar */}
        <div className="pt-1 pb-1.5 bg-white shrink-0 z-40">
          <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto opacity-70" />
        </div>

      </div>
    </div>
  );
}
