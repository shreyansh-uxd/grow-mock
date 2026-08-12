"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Check, X, Sparkles, Zap, Smartphone, Layers, Eye } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";

export interface SlideHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: () => gsap.core.Timeline;
}

const COMPARISON_ITEMS = [
  {
    feature: "Motion Engine & Physics",
    legacy: "30fps Basic CSS / Re-renders",
    religare: "GSAP 60fps Spring Timelines",
    winner: true,
  },
  {
    feature: "Route & Tab Switch Latency",
    legacy: "300ms – 800ms Page Reloads",
    religare: "Sub-10ms Instant Turbopack Hydration",
    winner: true,
  },
  {
    feature: "Design Language & Hierarchy",
    legacy: "Cluttered Data Tables & High Cognitive Load",
    religare: "Editorial Light Mode & Focused Typography",
    winner: true,
  },
  {
    feature: "Micro-Interactions & Feedback",
    legacy: "Static Buttons & Plain Text Indicators",
    religare: "Pulsing Price Tags & Morphing Pill Nav",
    winner: true,
  },
  {
    feature: "Real-Time Visual Tick Streaming",
    legacy: "Full-Row Redraws & Jarring Flashes",
    religare: "Zero-Jank Ticker Reel & Depth Canvas",
    winner: true,
  },
];

const Comparison = forwardRef<SlideHandle>(function Comparison(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.set([headerRef.current, headlineRef.current, subRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(tableRef.current, { opacity: 0, y: 40, scale: 0.97 });
    rowsRef.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, x: -20 });
    });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, headlineRef.current, subRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(tableRef.current, { opacity: 0, y: 40, scale: 0.97 });
      rowsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, x: -20 });
      });

      // Header
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: EASE.smooth });
      tl.to(accentLineRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth }, "-=0.3");
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.dramatic }, "-=0.3");
      tl.to(subRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.gentle }, "-=0.5");

      // Table container
      tl.to(tableRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.slow,
        ease: EASE.dramatic,
      }, "-=0.3");

      // Rows staggered
      rowsRef.current.forEach((row, idx) => {
        if (!row) return;
        tl.to(row, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: EASE.smooth,
        }, idx === 0 ? "-=0.4" : "-=0.25");
      });

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" });
      return tl;
    },
  }));

  return (
    <div ref={sceneRef} className="pres-scene justify-start pt-12 md:pt-16">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4 md:px-8">
        
        {/* Category Header */}
        <div ref={headerRef} className="pres-label pres-label--accent mb-1">
          03 / COMPETITIVE UI &amp; MOTION BENCHMARK
        </div>

        {/* Green Accent Line */}
        <div
          ref={accentLineRef}
          style={{
            width: "3.5rem",
            height: "2px",
            background: "#1E7240",
            marginBottom: "clamp(1rem, 2vh, 1.5rem)",
            transformOrigin: "center",
          }}
        />

        {/* Headline */}
        <div
          ref={headlineRef}
          className="text-center mb-2 max-w-3xl"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15 }}
        >
          Rethinking Brokerage UI &amp; Motion.
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-center text-slate-500 font-normal max-w-2xl mt-1 mb-8"
          style={{ fontSize: "clamp(0.8125rem, 1.1vw, 0.9375rem)", lineHeight: 1.6 }}
        >
          How our Next-Gen UI architecture outperforms traditional trading giants in motion, speed, and visual elegance.
        </p>

        {/* Benchmark Comparison Table Card */}
        <div
          ref={tableRef}
          className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden text-left"
        >
          {/* Table Column Headers */}
          <div className="grid grid-cols-12 px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
            <div className="col-span-4 md:col-span-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>UI &amp; Motion Dimension</span>
            </div>
            <div className="col-span-4 md:col-span-4 text-slate-400 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-slate-400" />
              <span>Traditional Platforms (Groww / Angel / Zerodha)</span>
            </div>
            <div className="col-span-4 md:col-span-4 text-emerald-700 flex items-center gap-1.5 font-black">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Religare (Next-Gen UI)</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_ITEMS.map((item, idx) => (
              <div
                key={item.feature}
                ref={(el) => { rowsRef.current[idx] = el; }}
                className="grid grid-cols-12 px-6 py-4 text-xs items-center transition-colors hover:bg-slate-50/50"
              >
                {/* Feature Name */}
                <div className="col-span-4 md:col-span-4 font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 shrink-0" />
                  <span>{item.feature}</span>
                </div>

                {/* Legacy Platforms Column */}
                <div className="col-span-4 md:col-span-4 text-slate-500 font-medium pr-4 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="line-through text-slate-400">{item.legacy}</span>
                </div>

                {/* Religare Next-Gen UI Column (Highlighted) */}
                <div className="col-span-4 md:col-span-4 font-extrabold text-emerald-800 flex items-center gap-2.5 bg-emerald-50/60 p-2 rounded-xl border border-emerald-200/50">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{item.religare}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Footer Banner (Light Mode) */}
          <div className="px-6 py-3.5 bg-emerald-50/90 border-t border-emerald-200/80 text-emerald-950 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-emerald-800">BENCHMARK SUMMARY:</span>
              <span className="text-emerald-900 font-medium">100% Focused on Premium Motion &amp; User Experience</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs font-bold hidden md:inline-block">
              UI DESIGN ADVANTAGE
            </span>
          </div>

        </div>

      </div>
    </div>
  );
});

export default Comparison;
