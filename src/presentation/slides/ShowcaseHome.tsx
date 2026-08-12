"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import Navbar from "@/components/ui/Navbar";
import LightMarketTicker from "@/components/ui/LightMarketTicker";
import RecentlyViewed from "@/components/sections/RecentlyViewed";
import MostTraded from "@/components/sections/MostTraded";
import FinancialTools from "@/components/sections/FinancialTools";
import TopMovers from "@/components/sections/TopMovers";
import TopIntraday from "@/components/sections/TopIntraday";
import StocksInNews from "@/components/sections/StocksInNews";
import BottomNav from "@/components/ui/BottomNav";
import { Zap, ArrowUpRight, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";

export interface SlideHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: () => gsap.core.Timeline;
}

const ShowcaseHome = forwardRef<SlideHandle>(function ShowcaseHome(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const marker1Ref = useRef<HTMLDivElement>(null);
  const marker2Ref = useRef<HTMLDivElement>(null);
  const marker3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([headerRef.current, headlineRef.current, subRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(mockupRef.current, { opacity: 0, scale: 0.92, x: -40, filter: "blur(10px)" });
    gsap.set([marker1Ref.current, marker2Ref.current, marker3Ref.current], { opacity: 0, x: 30 });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset states
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, headlineRef.current, subRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(mockupRef.current, { opacity: 0, scale: 0.92, x: -40, filter: "blur(10px)" });
      gsap.set([marker1Ref.current, marker2Ref.current, marker3Ref.current], { opacity: 0, x: 30 });

      // Left App Mockup Entrance
      tl.to(mockupRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: "blur(0px)",
        duration: DURATION.slow,
        ease: EASE.dramatic,
      });

      // Right Header
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: EASE.smooth }, "-=0.6");
      tl.to(accentLineRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth }, "-=0.4");
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.dramatic }, "-=0.3");
      tl.to(subRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.gentle }, "-=0.5");

      // Right Feature Markers Staggered
      tl.to(marker1Ref.current, { opacity: 1, x: 0, duration: 0.5, ease: EASE.smooth }, "-=0.3");
      tl.to(marker2Ref.current, { opacity: 1, x: 0, duration: 0.5, ease: EASE.smooth }, "-=0.35");
      tl.to(marker3Ref.current, { opacity: 1, x: 0, duration: 0.5, ease: EASE.smooth }, "-=0.35");

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" });
      return tl;
    },
  }));

  const noop = () => {};

  return (
    <div ref={sceneRef} className="pres-scene justify-center">
      {/* 2-Column Split Layout: Actual App Home UI on Left, Heading & Features on Right */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 px-6 md:px-12">
        
        {/* LEFT COLUMN: Actual Real App Home UI (Full Height Scrollable Frame) */}
        <div ref={mockupRef} className="flex-1 flex justify-center md:justify-start">
          <div className="pres-mockup shadow-2xl" style={{ height: "clamp(480px, 74vh, 680px)", width: "clamp(270px, 34vw, 360px)", maxHeight: "78vh" }}>
            <div className="pres-mockup__inner p-0 flex flex-col bg-white overflow-hidden text-slate-900 font-sans">
              
              {/* Sticky Header with Navbar & LightMarketTicker */}
              <div className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-2xs shrink-0">
                <Navbar activeTab="stocks" onOpenSearch={noop} onOpenProfile={noop} />
                <LightMarketTicker />
              </div>

              {/* Real Home UI Sections Scrollable Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar pb-4 bg-white text-left">
                <RecentlyViewed onSelectStock={noop} />
                <MostTraded onSelectStock={noop} />
                <FinancialTools />
                <TopMovers onSelectStock={noop} />
                <TopIntraday onSelectStock={noop} />
                <StocksInNews onSelectStock={noop} />
              </div>

              {/* Real App Bottom Navigation */}
              <div className="shrink-0">
                <BottomNav activeTab="stocks" setActiveTab={noop} />
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Heading & Stacked Feature Markers */}
        <div className="flex-1 flex flex-col items-start text-left max-w-xl space-y-4">
          
          {/* Header Label */}
          <div ref={headerRef} className="pres-label pres-label--accent m-0">
            04 / STOCKS &amp; LIVE MARKETS
          </div>

          {/* Green Accent Line */}
          <div
            ref={accentLineRef}
            style={{
              width: "3.5rem",
              height: "2px",
              background: "#1E7240",
              transformOrigin: "left center",
            }}
          />

          {/* Headline */}
          <div
            ref={headlineRef}
            className="text-left m-0 font-extrabold text-slate-900 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em" }}
          >
            The Real Home Interface.
          </div>

          {/* Subtitle */}
          <p ref={subRef} className="text-left text-slate-500 font-normal m-0 text-xs md:text-sm leading-relaxed max-w-lg">
            Live market ticker stream, recently viewed stocks, most traded NSE contracts, financial tools, top gainers, and real-time stock news.
          </p>

          {/* Stacked Feature Callout Markers */}
          <div className="space-y-3 w-full pt-3">
            <div ref={marker1Ref} className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3.5 transition-all hover:border-emerald-500/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Live Ticker &amp; Navbar</h4>
                <p className="text-[11px] text-slate-500">Real-time ticker stream with instant search &amp; profile drawer</p>
              </div>
            </div>

            <div ref={marker2Ref} className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3.5 transition-all hover:border-emerald-500/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Most Traded &amp; Top Gainers</h4>
                <p className="text-[11px] text-slate-500">Live price ticks, green/red gain badges, and intraday tools</p>
              </div>
            </div>

            <div ref={marker3Ref} className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3.5 transition-all hover:border-emerald-500/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Financial Screener &amp; News</h4>
                <p className="text-[11px] text-slate-500">Zero brokerage SIP calculators and market sentiment stream</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
});

export default ShowcaseHome;
