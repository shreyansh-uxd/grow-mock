"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  TrendingUp,
  Bell,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowUpRight,
  PieChart,
  Repeat,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";

interface OnboardingScreenProps {
  onFinish: () => void;
}

// ----------------------------------------------------
// Light Mode Interactive Visual 1: Trading & Execution
// ----------------------------------------------------
function TradingVisual() {
  return (
    <div className="w-full h-64 rounded-3xl bg-slate-50 border border-slate-200/80 p-5 relative overflow-hidden shadow-md flex flex-col justify-between select-none group">
      {/* Background soft ambient lighting */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

      {/* Top Ticker Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-emerald-100/80 border border-emerald-200 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
            <span className="text-[11px] font-mono font-bold text-emerald-800">NIFTY 50</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700">24,850.40</span>
          <span className="text-[10px] font-mono font-bold text-emerald-600 flex items-center">
            <ArrowUpRight className="h-3 w-3" /> +1.24%
          </span>
        </div>

        <div className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600 flex items-center gap-1 shadow-xs">
          <ShieldCheck className="h-3 w-3 text-emerald-600" /> ₹0 Brokerage
        </div>
      </div>

      {/* Center Simulated Live Candlestick & Wave Chart */}
      <div className="relative my-auto h-28 w-full flex items-end justify-between px-2 gap-1.5 z-10">
        {/* SVG Live Price Wave */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 280 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 70 Q 40 40, 80 55 T 160 30 T 220 40 T 280 10 L 280 90 L 0 90 Z"
            fill="url(#chartGradLight)"
          />
          <path
            d="M 0 70 Q 40 40, 80 55 T 160 30 T 220 40 T 280 10"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Live Floating Profit Badge */}
        <div className="absolute top-2 right-4 px-3 py-1.5 rounded-2xl bg-emerald-600 text-white font-mono font-black text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1 animate-bounce">
          <TrendingUp className="h-3.5 w-3.5" /> +₹14,280.50
        </div>

        {/* Dynamic Candlesticks */}
        {[
          { h: 35, color: "bg-emerald-500" },
          { h: 50, color: "bg-emerald-500" },
          { h: 30, color: "bg-rose-500" },
          { h: 65, color: "bg-emerald-500" },
          { h: 45, color: "bg-emerald-500" },
          { h: 80, color: "bg-emerald-500 animate-pulse" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-0.5 z-10">
            <div className={`w-0.5 bg-slate-300 h-${Math.floor(item.h / 3)}`} />
            <div className={`w-3.5 rounded-sm ${item.color}`} style={{ height: `${item.h}px` }} />
          </div>
        ))}
      </div>

      {/* Bottom Floating Stock Chips */}
      <div className="flex items-center gap-2 z-10 overflow-hidden">
        <div className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-xs flex items-center gap-1.5 shrink-0">
          <span className="font-bold text-slate-800">RELIANCE</span>
          <span className="text-emerald-600 font-mono font-bold">+2.8%</span>
        </div>
        <div className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-xs flex items-center gap-1.5 shrink-0">
          <span className="font-bold text-slate-800">TATAMOTORS</span>
          <span className="text-emerald-600 font-mono font-bold">+4.5%</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Light Mode Interactive Visual 2: Watchlist & Live Alerts
// ----------------------------------------------------
function WatchlistVisual() {
  return (
    <div className="w-full h-64 rounded-3xl bg-slate-50 border border-slate-200/80 p-5 relative overflow-hidden shadow-md flex flex-col justify-between select-none">
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

      {/* Top Watchlist Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-sky-100 text-sky-600 border border-sky-200">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800">EV & Tech Watchlist</h4>
            <p className="text-[10px] font-mono text-slate-500">4 Active Price Alerts</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-mono font-bold uppercase tracking-wider">
          Live Sync
        </span>
      </div>

      {/* Animated Instant Alert Notification Toast */}
      <div className="my-auto z-10 space-y-2.5">
        {/* Animated Pop-up Toast */}
        <div className="p-3 rounded-2xl bg-white border border-sky-200 shadow-md flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">Price Target Hit!</p>
              <p className="text-[10px] font-medium text-slate-500">TATA MOTORS crossed ₹1,050.00</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            BUY SIGNAL
          </span>
        </div>

        {/* Watchlist Stock Item Row 1 */}
        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ATHER ENERGY</span>
            <span className="text-[10px] text-slate-400 font-mono">NSE</span>
          </div>
          <div className="text-right font-mono">
            <span className="font-bold text-slate-800">₹342.10</span>
            <span className="text-emerald-600 font-bold ml-2">+3.12%</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Indicator */}
      <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" /> Real-time push notifications
        </span>
        <span className="text-sky-600 font-bold">0ms Delay</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Light Mode Interactive Visual 3: Automated SIP & Growth
// ----------------------------------------------------
function SipVisual() {
  return (
    <div className="w-full h-64 rounded-3xl bg-slate-50 border border-slate-200/80 p-5 relative overflow-hidden shadow-md flex flex-col justify-between select-none">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-100 text-purple-600 border border-purple-200">
            <Repeat className="h-4 w-4 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800">Auto Stock SIP</h4>
            <p className="text-[10px] font-mono text-slate-500">Monthly Wealth Compounder</p>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 text-[10px] font-mono font-bold flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-purple-600" /> Active
        </div>
      </div>

      {/* Compounding Multiplier & Curve */}
      <div className="my-auto z-10 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Target Wealth Goal</p>
            <h3 className="text-2xl font-black font-mono text-slate-800 tracking-tight">₹15,00,000</h3>
          </div>
          <div className="px-3 py-1.5 rounded-2xl bg-purple-600 text-white font-mono font-black text-xs shadow-md shadow-purple-600/20">
            3.8x Returns
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full w-3/4 animate-pulse" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Year 1: ₹1.2L</span>
            <span>Year 3: ₹5.4L</span>
            <span className="text-purple-700 font-bold">Year 5: ₹15L</span>
          </div>
        </div>
      </div>

      {/* Bottom Schedule Card */}
      <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between text-xs z-10 shadow-xs">
        <span className="text-slate-600 font-medium flex items-center gap-1.5">
          <PieChart className="h-3.5 w-3.5 text-purple-600" /> Auto-Debit: 5th Every Month
        </span>
        <span className="font-bold font-mono text-slate-800">₹5,000/mo</span>
      </div>
    </div>
  );
}

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Zero Commission Stock Trading",
    subtitle: "Trade 5000+ NSE & NASDAQ stocks with real-time price tickers, depth charts, and zero account maintenance fees.",
    badge: "Fast Execution",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    visual: <TradingVisual />,
  },
  {
    id: 2,
    title: "Smart Watchlists & Instant Alerts",
    subtitle: "Group your favorite stocks into custom watchlists like EV & Auto or Tech Giants. Receive instant price alerts when targets hit.",
    badge: "Real-time Alerts",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    visual: <WatchlistVisual />,
  },
  {
    id: 3,
    title: "Automate Growth with Stock SIPs",
    subtitle: "Build long-term wealth effortlessly. Set automated monthly stock investments with flexible schedules and compound interest tracking.",
    badge: "Wealth Builder",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    visual: <SipVisual />,
  },
];

export default function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const touchStartX = useRef<number | null>(null);

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];
  const progressPercent = Math.round(((currentSlideIndex + 1) / ONBOARDING_SLIDES.length) * 100);

  const animateSlideChange = useCallback(
    (nextIndex: number) => {
      if (nextIndex === currentSlideIndex || isAnimating.current || !slideContainerRef.current) return;

      isAnimating.current = true;
      const el = slideContainerRef.current;
      const dir = nextIndex > currentSlideIndex ? 1 : -1;

      // 3D Morphing Slide Exit
      gsap.to(el, {
        opacity: 0,
        x: -dir * 70,
        scale: 0.92,
        duration: 0.24,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlideIndex(nextIndex);
          // 3D Morphing Slide Entrance
          gsap.fromTo(
            el,
            { opacity: 0, x: dir * 80, scale: 0.94 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.42,
              ease: "power3.out",
              onComplete: () => {
                isAnimating.current = false;
              },
            }
          );
        },
      });
    },
    [currentSlideIndex]
  );

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      animateSlideChange(currentSlideIndex + 1);
    } else {
      onFinish();
    }
  };

  // Touch Swipe Gesture Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 40 && currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      animateSlideChange(currentSlideIndex + 1);
    } else if (diffX < -40 && currentSlideIndex > 0) {
      animateSlideChange(currentSlideIndex - 1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 z-50 bg-white flex flex-col justify-between p-6 select-none w-full h-full overflow-hidden"
    >
      {/* Top Header & Progress Bar */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-500">
              Step {currentSlideIndex + 1} of 3
            </span>
          </div>

          <button
            onClick={onFinish}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Skip to App
          </button>
        </div>

        {/* Dynamic Animated Step Bar */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Slide Content Wrapper */}
      <div
        ref={slideContainerRef}
        className="my-auto space-y-6 cursor-grab active:cursor-grabbing"
        style={{ transformOrigin: "center center" }}
      >
        {/* Slide Visual Graphic Component */}
        {currentSlide.visual}

        {/* Slide Text Content */}
        <div className="space-y-2.5 text-left">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${currentSlide.badgeColor}`}
          >
            <Zap className="h-3 w-3" />
            {currentSlide.badge}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-700 tracking-tight font-sans leading-snug">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Controls: Morphing Dots & Action Button */}
      <div className="space-y-5 pb-2">
        {/* Interactive Morphing Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {ONBOARDING_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => animateSlideChange(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlideIndex === idx
                  ? "w-8 bg-emerald-600 shadow-sm"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* High-Energy Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-98 transition-all cursor-pointer group"
        >
          <span>
            {currentSlideIndex === ONBOARDING_SLIDES.length - 1
              ? "Get Started Now"
              : "Continue"}
          </span>
          <ChevronRight className="h-4 w-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
