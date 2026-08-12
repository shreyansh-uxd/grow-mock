"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { TrendingDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";
import type { SlideHandle } from "./Intro";

const BENCHMARK_DATA = [
  {
    label: "Legacy Religare App",
    time: "14.2 sec",
    percent: 100,
    color: "bg-gradient-to-r from-rose-500 to-rose-600",
    textClass: "text-rose-100",
  },
  {
    label: "Angel One",
    time: "12.4 sec",
    percent: 87.3,
    color: "bg-gradient-to-r from-amber-500 to-amber-600",
    textClass: "text-amber-100",
  },
  {
    label: "Groww",
    time: "9.8 sec",
    percent: 69.0,
    color: "bg-gradient-to-r from-sky-500 to-sky-600",
    textClass: "text-sky-100",
  },
  {
    label: "Religare 2.0 (Agency UX)",
    time: "4.2 sec",
    percent: 29.6,
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-[0_4px_20px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400/30",
    textClass: "text-emerald-50 font-black",
    winner: true,
  },
];

const TaskBenchmark = forwardRef<SlideHandle>(function TaskBenchmark(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden states
    gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(chartRef.current, { opacity: 0, y: 40, scale: 0.98 });
    gsap.set(footerRef.current, { opacity: 0, y: 30 });
    
    barRefs.current.forEach((bar) => {
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    });
    labelRefs.current.forEach((label) => {
      if (label) gsap.set(label, { opacity: 0, x: -20 });
    });
    valueRefs.current.forEach((val) => {
      if (val) gsap.set(val, { opacity: 0 });
    });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset states
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(chartRef.current, { opacity: 0, y: 40, scale: 0.98 });
      gsap.set(footerRef.current, { opacity: 0, y: 30 });
      
      barRefs.current.forEach((bar) => {
        if (bar) gsap.set(bar, { scaleX: 0 });
      });
      labelRefs.current.forEach((label) => {
        if (label) gsap.set(label, { opacity: 0, x: -20 });
      });
      valueRefs.current.forEach((val) => {
        if (val) gsap.set(val, { opacity: 0 });
      });

      // 1. Header Entrance
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth });
      tl.to(accentLineRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth }, "-=0.3");
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.dramatic }, "-=0.3");

      // 2. Chart Card Container Entrance
      tl.to(chartRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.slow,
        ease: EASE.dramatic,
      }, "-=0.4");

      // 3. Bars & Labels Entrance (Staggered)
      BENCHMARK_DATA.forEach((_, idx) => {
        const bar = barRefs.current[idx];
        const label = labelRefs.current[idx];
        const val = valueRefs.current[idx];

        if (label) {
          tl.to(label, { opacity: 1, x: 0, duration: 0.4, ease: EASE.smooth }, "-=0.25");
        }
        if (bar) {
          tl.to(bar, {
            scaleX: 1,
            duration: 0.8,
            ease: EASE.dramatic, // springy/snappy feel
          }, "-=0.3");
        }
        if (val) {
          tl.to(val, { opacity: 1, duration: 0.3 }, "-=0.2");
        }
      });

      // 4. Footer Caption
      tl.to(footerRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.gentle }, "-=0.2");

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" });
      return tl;
    },
  }));

  return (
    <div ref={sceneRef} className="pres-scene justify-start pt-12 md:pt-16">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4 md:px-8">
        
        {/* Category Header Label */}
        <div ref={headerRef} className="pres-label pres-label--accent mb-1">
          04 / Performance &amp; Usability Benchmark
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
          Task Completion Time Benchmark (Secs)
        </div>

        {/* Chart Container (No card border/bg, full width) */}
        <div
          ref={chartRef}
          className="w-full max-w-4xl space-y-8 mt-4"
        >
          {/* Chart Rows */}
          <div className="space-y-4">
            {BENCHMARK_DATA.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-4 text-xs">
                
                {/* Row Label */}
                <div
                  ref={(el) => { labelRefs.current[idx] = el; }}
                  className={`w-40 md:w-48 text-right font-bold text-slate-600 shrink-0 ${
                    item.winner ? "text-emerald-800 font-extrabold" : ""
                  }`}
                >
                  {item.label}
                </div>

                {/* Bar Track */}
                <div className="flex-1 h-10 bg-slate-200/40 border border-slate-200/25 rounded-xl relative overflow-hidden flex items-center">
                  
                  {/* Animating Colored Bar */}
                  <div
                    ref={(el) => { barRefs.current[idx] = el; }}
                    className={`h-full rounded-xl flex items-center justify-end pr-4 transition-all duration-300 absolute left-0 top-0 bottom-0 ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  >
                    
                    {/* Time Text inside the bar */}
                    <span
                      ref={(el) => { valueRefs.current[idx] = el; }}
                      className={`font-mono text-[10px] md:text-xs font-bold tracking-wider flex items-center ${item.textClass}`}
                    >
                      {item.winner && <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-100 fill-emerald-500/50 animate-pulse" />}
                      {item.time}
                    </span>

                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Performance Summary Banner */}
          <div
            ref={footerRef}
            className="flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-left text-xs text-emerald-950 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
              <TrendingDown className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span>
              Usability testing highlights that our proposed UX architecture slashes FnO trade entry duration by over <strong>60%</strong>, delivering an unmatched ergonomic advantage.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
});

export default TaskBenchmark;
