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
      <div className="w-full h-56 rounded-3xl border border-slate-100 overflow-hidden shadow-xs relative bg-slate-50 flex items-center justify-center">
        <img
          src="/onboarding-1.png"
          alt="Zero Commission Stock Trading"
          className="w-full h-full object-cover"
        />
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
      <div className="w-full h-56 rounded-3xl border border-slate-100 overflow-hidden shadow-xs relative bg-slate-50 flex items-center justify-center">
        <img
          src="/onboarding-2.png"
          alt="Smart Watchlists & Instant Alerts"
          className="w-full h-full object-cover"
        />
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
      <div className="w-full h-56 rounded-3xl border border-slate-100 overflow-hidden shadow-xs relative bg-slate-50 flex items-center justify-center">
        <img
          src="/onboarding-3.png"
          alt="Automate Growth with Stock SIPs"
          className="w-full h-full object-cover"
        />
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
    <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between p-6 select-none w-full h-full">
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
