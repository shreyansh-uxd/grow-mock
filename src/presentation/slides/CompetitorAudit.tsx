"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Sparkles, Shield, Info, AlertTriangle, HelpCircle, EyeOff } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";
import type { SlideHandle } from "./Intro";

const CompetitorAudit = forwardRef<SlideHandle>(function CompetitorAudit(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden state
    gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(visualRef.current, { opacity: 0, scale: 0.95, y: 30 });
    pointsRef.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, x: -30 });
    });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset states
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(visualRef.current, { opacity: 0, scale: 0.95, y: 30 });
      pointsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, x: -30 });
      });

      // 1. Header & accent line
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATION.normal,
        ease: EASE.smooth,
      });

      tl.to(
        accentLineRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.5,
          ease: EASE.smooth,
        },
        "-=0.3"
      );

      // 2. Headline
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: DURATION.slow,
          ease: EASE.dramatic,
        },
        "-=0.3"
      );

      // 3. Right visual card
      tl.to(
        visualRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: DURATION.slow,
          ease: EASE.dramatic,
        },
        "-=0.5"
      );

      // 4. Staggered points
      pointsRef.current.forEach((point, idx) => {
        if (!point) return;
        tl.to(
          point,
          {
            opacity: 1,
            x: 0,
            duration: DURATION.normal,
            ease: EASE.smooth,
          },
          idx === 0 ? "-=0.5" : "-=0.3"
        );
      });

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: "power2.in",
      });
      return tl;
    },
  }));

  return (
    <div ref={sceneRef} className="pres-scene justify-start pt-12 md:pt-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4 md:px-8">
        
        {/* Category Label */}
        <div ref={headerRef} className="pres-label pres-label--accent mb-1">
          03 / Competitive Landscape Audit
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
        <div ref={headlineRef} className="text-center mb-8 max-w-4xl font-bold tracking-tight text-slate-900" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)", lineHeight: 1.15 }}>
          UX Audit: Competitor Experience Gaps
        </div>

        {/* 2-Column Layout Underneath */}
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-14 text-left">
          
          {/* LEFT COLUMN: Content & Bullet points */}
          <div className="flex-1 flex flex-col justify-center space-y-6 max-w-xl mx-auto lg:mx-0">
            
            {/* Staggered Audited Items */}
            
            {/* Item 1: Groww */}
            <div
              ref={(el) => { pointsRef.current[0] = el; }}
              className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200 transition-all duration-300 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <EyeOff className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Groww UX <span className="text-slate-400 font-medium">(Over-Simplified)</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Accessible for novice investors, but creates friction for active traders due to missing contextual chart actions.
                </p>
              </div>
            </div>

            {/* Item 2: Angel One */}
            <div
              ref={(el) => { pointsRef.current[1] = el; }}
              className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:border-slate-200 transition-all duration-300 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Angel One UX <span className="text-amber-600 font-medium">(Cognitive Overload)</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Packed with features, but overloaded visual hierarchy causes high decision fatigue and accidental order errors.
                </p>
              </div>
            </div>

            {/* Item 3: Religare 2.0 */}
            <div
              ref={(el) => { pointsRef.current[2] = el; }}
              className="flex gap-4 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-300 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Religare 2.0 UX Solution
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Progressive disclosure strategy—clean, distraction-free interface with pro-tools available on demand.
                </p>
              </div>
            </div>

          </div>

        {/* RIGHT COLUMN: Visual Auditing Schematic Card */}
        <div ref={visualRef} className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden p-6 space-y-6">
            
            {/* Header simulation */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Competitive Analysis
              </span>
            </div>

            {/* Comparison panels */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Groww panel */}
              <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-3 flex flex-col justify-between h-44">
                <span className="text-[10px] font-bold text-slate-400">Groww (Bare)</span>
                <div className="flex-1 flex items-center justify-center py-2">
                  {/* Empty state graph */}
                  <svg className="w-full h-12 text-slate-300" viewBox="0 0 100 40">
                    <path d="M0,30 Q25,28 50,29 T100,25" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-[9px] text-slate-400 leading-tight">
                  No context actions, chart indicators, or custom widgets.
                </div>
              </div>

              {/* Angel panel */}
              <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-3 flex flex-col justify-between h-44 relative overflow-hidden">
                <span className="text-[10px] font-bold text-slate-400">Angel One (Noise)</span>
                <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
                  <div className="flex gap-1 justify-center">
                    <span className="px-1.5 py-0.5 rounded bg-rose-50 text-[7px] text-rose-600 font-bold border border-rose-100 shrink-0">SELL</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-[7px] text-emerald-600 font-bold border border-emerald-100 shrink-0">BUY</span>
                  </div>
                  {/* Cluttered graph */}
                  <svg className="w-full h-10 text-slate-400" viewBox="0 0 100 40">
                    <path d="M0,35 L15,10 L30,30 L45,5 L60,25 L75,12 L90,38 L100,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="30" y1="0" x2="30" y2="40" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="60" y1="0" x2="60" y2="40" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
                <div className="text-[9px] text-slate-400 leading-tight">
                  Overwhelming layout with flashing numbers & alerts.
                </div>
              </div>

              {/* Religare 2.0 panel */}
              <div className="border border-emerald-200 bg-emerald-50/10 rounded-xl p-3 flex flex-col justify-between h-44 relative">
                <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600 fill-emerald-100" />
                  <span>Religare 2.0</span>
                </span>
                <div className="flex-1 flex items-center justify-center py-2">
                  {/* Clean smooth graph */}
                  <svg className="w-full h-12 text-emerald-600" viewBox="0 0 100 40">
                    <path d="M0,30 C30,10 70,5 100,15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="100" cy="15" r="3" fill="#047857" />
                  </svg>
                </div>
                <div className="text-[9px] text-emerald-800 font-medium leading-tight">
                  Distraction-free interface with pro-tools on demand.
                </div>
              </div>

            </div>

            {/* Sub-label banner */}
            <div className="flex items-center gap-2 p-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-[10px] text-emerald-950">
              <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>
                <strong>Conclusion:</strong> Religare 2.0 achieves the optimal balance of accessibility and trading depth using a progressive disclosure approach.
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
  );
});

export default CompetitorAudit;
