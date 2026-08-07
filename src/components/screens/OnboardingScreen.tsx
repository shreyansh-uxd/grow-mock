"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Bell,
  Sparkles,
  ChevronRight,
  BarChart3,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  DollarSign,
  PieChart,
} from "lucide-react";
import gsap from "gsap";

interface OnboardingScreenProps {
  onFinish: () => void;
}

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Zero Commission Stock Trading",
    subtitle: "Trade 5000+ NSE & NASDAQ stocks with real-time price tickers, depth charts, and zero account maintenance fees.",
    badge: "Fast Execution",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    visual: (
      <div className="w-full h-56 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-600/10 rounded-3xl border border-emerald-200/60 p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00b38610_1px,transparent_1px),linear-gradient(to_bottom,#00b38610_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Top Floating Badge */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-800">NSE • NIFTY 50</span>
          </div>
          <span className="text-xs font-mono font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
            +2.45%
          </span>
        </div>

        {/* Dynamic Stock Card Visual */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-md relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
                RE
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Reliance Industries</h4>
                <p className="text-[10px] text-slate-400 font-mono">RELIANCE • Equity</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-900 font-mono block">$1,420.50</span>
              <span className="text-[10px] font-bold text-emerald-600 font-mono">+$85.20 (6.38%)</span>
            </div>
          </div>

          {/* Mini Sparkline Bar */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5 pt-0.5">
            <div className="h-full bg-emerald-500 rounded-full w-[70%]" />
            <div className="h-full bg-emerald-300 rounded-full w-[30%]" />
          </div>
        </div>

        {/* Bottom Feature Tags */}
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Zap className="h-3 w-3 text-emerald-600" /> Instant Orders
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-600" /> 100% Secure
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Smart Watchlists & Instant Alerts",
    subtitle: "Group your favorite stocks into custom watchlists like EV & Auto or Tech Giants. Receive instant price alerts when targets hit.",
    badge: "Real-time Alerts",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    visual: (
      <div className="w-full h-56 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-indigo-600/10 rounded-3xl border border-sky-200/60 p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
        {/* Category Tabs Mockup */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar relative z-10">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-white text-[11px] font-bold shadow-xs">
            My Watchlist
          </span>
          <span className="px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200 text-[11px] font-bold">
            Tech Giants
          </span>
          <span className="px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200 text-[11px] font-bold">
            EV &amp; Auto
          </span>
        </div>

        {/* Notification Alert Visual Box */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-sky-200 shadow-md relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Price Target Triggered!</h4>
                <p className="text-[10px] text-slate-400">Tata Motors reached $368.00</p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              Just now
            </span>
          </div>
        </div>

        {/* Stock List Items Preview */}
        <div className="space-y-1.5 relative z-10">
          <div className="bg-white/80 rounded-xl p-2 px-3 border border-slate-200/70 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Pine Labs</span>
            <span className="text-xs font-mono font-bold text-rose-500">$368.37 (-4.2%)</span>
          </div>
          <div className="bg-white/80 rounded-xl p-2 px-3 border border-slate-200/70 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">HDFC Bank</span>
            <span className="text-xs font-mono font-bold text-emerald-600">$1,842.30 (+2.0%)</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Automate Growth with Stock SIPs",
    subtitle: "Build long-term wealth effortlessly. Set automated monthly stock investments with flexible schedules and compound interest tracking.",
    badge: "Wealth Builder",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    visual: (
      <div className="w-full h-56 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-purple-600/10 rounded-3xl border border-purple-200/60 p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
        {/* SIP Header Info */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Monthly Stock SIP</h4>
              <p className="text-[10px] text-slate-400">Automated every 15th</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-purple-700 font-mono bg-purple-100 px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Compound Returns Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-purple-200 shadow-md relative z-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
              Projected 3Y Wealth
            </span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">$24,500.00</span>
            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">
              +18.4% Est. Annual Returns
            </span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
            <PieChart className="h-6 w-6" />
          </div>
        </div>

        {/* Guarantees Tag */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 relative z-10">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Cancel Anytime
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Zero Extra Charges
          </span>
        </div>
      </div>
    ),
  },
];

export default function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];

  const animateSlideChange = useCallback((nextIndex: number) => {
    if (!slideContainerRef.current) {
      setCurrentSlideIndex(nextIndex);
      return;
    }

    const el = slideContainerRef.current;
    gsap.to(el, {
      opacity: 0,
      scale: 0.95,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlideIndex(nextIndex);
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
      },
    });
  }, []);

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      animateSlideChange(currentSlideIndex + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col justify-between p-6 select-none max-w-md mx-auto">
      {/* Top Header: Skip Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono font-bold text-slate-500">
            Step {currentSlideIndex + 1} of 3
          </span>
        </div>

        <button
          onClick={onFinish}
          className="px-3.5 py-1.5 rounded-full text-xs font-extrabold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Skip to App
        </button>
      </div>

      {/* Main Slide Content Wrapper */}
      <div ref={slideContainerRef} className="my-auto space-y-6">
        {/* Slide Visual Graphic */}
        {currentSlide.visual}

        {/* Slide Text Content */}
        <div className="space-y-2.5 text-left">
          <span
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${currentSlide.badgeColor}`}
          >
            {currentSlide.badge}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans leading-snug">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Controls: Pagination Dots & Action Button */}
      <div className="space-y-5 pb-4">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {ONBOARDING_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => animateSlideChange(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlideIndex === idx
                  ? "w-8 bg-emerald-600"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next / Get Started Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-98 transition-all cursor-pointer"
        >
          <span>
            {currentSlideIndex === ONBOARDING_SLIDES.length - 1
              ? "Get Started Now"
              : "Continue"}
          </span>
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
