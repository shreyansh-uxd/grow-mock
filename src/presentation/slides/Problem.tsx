"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Zap, Cpu, Layers, Activity, Sparkles, LineChart } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";

export interface SlideHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: () => gsap.core.Timeline;
}

const TECH_CARDS = [
  {
    icon: Zap,
    badge: "GSAP 3.15 + React 19",
    title: "60 FPS Motion Engine",
    desc: "Butter-smooth timeline orchestration, spring physics, and fluid touch gesture interpolation.",
    stat: "60 FPS",
    statLabel: "Physics Render Rate",
    accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Cpu,
    badge: "Next.js 16 Turbopack",
    title: "Instant Route Hydration",
    desc: "Sub-millisecond view transitions, zero layout shift, and server-optimized bundle execution.",
    stat: "< 10ms",
    statLabel: "Transition Latency",
    accentBg: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    icon: LineChart,
    badge: "Real-Time Stock Pipeline",
    title: "Live Market Tick Sync",
    desc: "High-frequency state distribution streaming live price ticks, gain badges, and depth charts.",
    stat: "900ms",
    statLabel: "Live Tick Frequency",
    accentBg: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

const Problem = forwardRef<SlideHandle>(function Problem(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.set([headerRef.current, headlineRef.current, subRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    cardsRef.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 40, scale: 0.96 });
    });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset scene container and elements for repeated plays
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, headlineRef.current, subRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      cardsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 40, scale: 0.96 });
      });

      // Header label
      tl.to(headerRef.current, {
        opacity: 1, y: 0, duration: 0.5, ease: EASE.smooth,
      });

      // Accent Line
      tl.to(accentLineRef.current, {
        opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth,
      }, "-=0.3");

      // Headline
      tl.to(headlineRef.current, {
        opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.dramatic,
      }, "-=0.3");

      // Supporting subtitle
      tl.to(subRef.current, {
        opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.gentle,
      }, "-=0.5");

      // Staggered Tech Cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION.normal,
          ease: EASE.dramatic,
        }, idx === 0 ? "-=0.3" : "-=0.5");
      });

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, {
        opacity: 0, y: -30, duration: 0.5, ease: "power2.in",
      });
      return tl;
    },
  }));

  return (
    <div ref={sceneRef} className="pres-scene">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4 md:px-8">
        
        {/* Category Header Label */}
        <div ref={headerRef} className="pres-label pres-label--accent mb-2">
          02 / MODERN UI STACK &amp; PERFORMANCE ENGINE
        </div>

        {/* Green Accent Line */}
        <div
          ref={accentLineRef}
          style={{
            width: "3.5rem",
            height: "2px",
            background: "#1E7240",
            marginBottom: "clamp(1.25rem, 2.5vh, 2rem)",
            transformOrigin: "center",
          }}
        />

        {/* Headline */}
        <div
          ref={headlineRef}
          className="text-center mb-2 max-w-2xl"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15 }}
        >
          Engineered with Next-Gen UI Technology.
        </div>

        {/* Supporting Subtitle */}
        <p
          ref={subRef}
          className="text-center text-slate-500 font-normal max-w-xl mt-1 mb-8"
          style={{ fontSize: "clamp(0.8125rem, 1.1vw, 0.9375rem)", lineHeight: 1.6 }}
        >
          Crafted for 60fps hardware-accelerated animations, sub-millisecond route transitions, and instant live market streaming.
        </p>

        {/* 3 Tech Showcase Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TECH_CARDS.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="group p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-slate-100/90 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.accentBg}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Title & Desc */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight font-sans mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Stat Footer */}
                <div className="pt-5 mt-6 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest">
                    {card.statLabel}
                  </span>
                  <span className="text-sm font-mono font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {card.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
});

export default Problem;
