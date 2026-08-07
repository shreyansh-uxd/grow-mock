"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const [currentTime, setCurrentTime] = useState("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50/40 to-slate-200 text-slate-900 flex items-center justify-center p-0 md:p-4 lg:p-6 font-sans relative">
      {/* Light Mode Soft Ambient Glow Orbs (Desktop Only) */}
      <div className="hidden md:block absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* 
        Outer Phone Mockup Frame:
        - On mobile (< md): Native 100% width/height, 0 padding, 0 borders
        - On desktop (>= md): Sleek Light Titanium/Silver Phone Frame (390px x 844px max-h 94vh)
      */}
      <div className="w-full h-full md:w-[400px] md:h-[844px] md:max-h-[94vh] bg-slate-200/90 border border-slate-300/80 md:rounded-[48px] md:p-3 md:shadow-[0_20px_70px_rgba(0,0,0,0.12)] md:ring-1 md:ring-white relative flex flex-col shrink-0">
        
        {/* Metallic Side Buttons (Desktop Only) */}
        <div className="hidden md:block absolute -left-[9px] top-28 w-[3px] h-10 bg-slate-300 border-l border-slate-400/60 rounded-l-sm shadow-2xs" />
        <div className="hidden md:block absolute -left-[9px] top-42 w-[3px] h-12 bg-slate-300 border-l border-slate-400/60 rounded-l-sm shadow-2xs" />
        <div className="hidden md:block absolute -left-[9px] top-58 w-[3px] h-12 bg-slate-300 border-l border-slate-400/60 rounded-l-sm shadow-2xs" />
        <div className="hidden md:block absolute -right-[9px] top-36 w-[3px] h-16 bg-slate-300 border-r border-slate-400/60 rounded-r-sm shadow-2xs" />

        {/* Inner Phone Screen Container */}
        <div className="w-full h-full bg-white md:rounded-[36px] overflow-hidden relative flex flex-col shadow-xs border border-slate-200/60">
          
          {/* iOS Top Bar (Clock, Camera Notch, Status Icons) - Desktop Only */}
          <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1 bg-white shrink-0 z-40 text-slate-900 font-semibold border-b border-slate-50">
            {/* Clock */}
            <span className="text-xs font-mono font-bold tracking-tight text-slate-800">
              {currentTime}
            </span>

            {/* Dynamic Island Camera Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500/80 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="h-3 w-3 stroke-[2.5]" />
              <Wifi className="h-3 w-3 stroke-[2.5]" />
              <Battery className="h-3.5 w-3.5 stroke-[2.2] fill-slate-800" />
            </div>
          </div>

          {/* Smooth Scrollable App Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain no-scrollbar bg-white flex flex-col">
            {children}
          </div>

          {/* Bottom Home Indicator Bar (Desktop Only) */}
          <div className="hidden md:block pt-1 pb-2 bg-white shrink-0 z-40">
            <div className="w-28 h-1 bg-slate-800 rounded-full mx-auto opacity-70" />
          </div>

        </div>
      </div>
    </div>
  );
}
