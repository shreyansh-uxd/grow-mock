"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Check, X, Sparkles, Zap, Layers } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";
import type { SlideHandle } from "./Intro";

const COMPARISON_ITEMS = [
  {
    feature: "Ergonomic 1-Swipe Execution",
    groww: { text: "Tap Heavy", isPositive: false },
    angel: { text: "Multi-Step", isPositive: false },
    religare: { text: "Native Gesture Trigger", isPositive: true },
  },
  {
    feature: "Contextual Option Chain Visualization",
    groww: { text: "Basic List", isPositive: false },
    angel: { text: "High Clutter", isPositive: false },
    religare: { text: "Visual Payoff Graph", isPositive: true },
  },
  {
    feature: "Customizable Modular Dashboard",
    groww: { text: "Fixed Layout", isPositive: false },
    angel: { text: "Partial", isPositive: true },
    religare: { text: "Drag & Drop Widgets", isPositive: true },
  },
  {
    feature: "Cognitive Load Management",
    groww: { text: "High (Simple)", isPositive: true },
    angel: { text: "Poor (Overloaded)", isPositive: false },
    religare: { text: "Optimized Adaptive UI", isPositive: true },
  },
];

const Comparison = forwardRef<SlideHandle>(function Comparison(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
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
      gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(tableRef.current, { opacity: 0, y: 40, scale: 0.97 });
      rowsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, x: -20 });
      });

      // Header
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: EASE.smooth });
      tl.to(accentLineRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth }, "-=0.3");
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.dramatic }, "-=0.3");

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
          06 / UX &amp; Usability Feature Matrix
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
          className="text-center mb-8 max-w-3xl font-bold tracking-tight text-slate-900"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)", lineHeight: 1.15 }}
        >
          UX &amp; Usability Feature Matrix
        </div>

        {/* Benchmark Comparison Table Card */}
        <div
          ref={tableRef}
          className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden text-left"
        >
          {/* Table Column Headers */}
          <div className="grid grid-cols-12 px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
            <div className="col-span-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>UX Design Dimension</span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5">
              <span>Groww</span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5">
              <span>Angel One</span>
            </div>
            <div className="col-span-4 text-emerald-700 flex items-center gap-1.5 font-black">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Religare 2.0 (Proposed UX)</span>
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
                <div className="col-span-4 font-bold text-slate-900 flex items-center gap-2 pr-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 shrink-0" />
                  <span>{item.feature}</span>
                </div>

                {/* Groww Column */}
                <div className="col-span-2 text-slate-500 font-medium pr-4 flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    item.groww.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                  }`}>
                    {item.groww.isPositive ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : (
                      <X className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </span>
                  <span className={item.groww.isPositive ? "text-slate-800 font-semibold" : "line-through text-slate-400"}>
                    {item.groww.text}
                  </span>
                </div>

                {/* Angel One Column */}
                <div className="col-span-2 text-slate-500 font-medium pr-4 flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    item.angel.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                  }`}>
                    {item.angel.isPositive ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : (
                      <X className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </span>
                  <span className={item.angel.isPositive ? "text-slate-800 font-semibold" : "line-through text-slate-400"}>
                    {item.angel.text}
                  </span>
                </div>

                {/* Religare 2.0 Column (Highlighted) */}
                <div className="col-span-4 font-extrabold text-emerald-800 flex items-center gap-2 bg-emerald-50/60 p-2 rounded-xl border border-emerald-200/50">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{item.religare.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Footer Banner (Light Mode) */}
          <div className="px-6 py-3.5 bg-emerald-50/90 border-t border-emerald-200/80 text-emerald-950 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-emerald-800">MATRIX SUMMARY:</span>
              <span className="text-emerald-900 font-medium">Overwhelming competitive advantage in UX execution &amp; cognitive load containment</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs font-bold hidden md:inline-block">
              UX FEATURE ADVANTAGE
            </span>
          </div>

        </div>

      </div>
    </div>
  );
});

export default Comparison;
