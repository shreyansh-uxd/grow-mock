"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";
import type { SlideHandle } from "./Intro";

const ROADMAP_STEPS = [
  {
    quarter: "Q1 - Discovery",
    desc: "Trader interviews, persona mapping & cognitive UX audits.",
    isBottom: true,
    leftPos: "12.5%",
    color: "text-emerald-700",
  },
  {
    quarter: "Q2 - Wireframes",
    desc: "Interactive Figma prototypes & haptic gesture mapping.",
    isBottom: false,
    leftPos: "37.5%",
    color: "text-sky-600",
  },
  {
    quarter: "Q3 - User Testing",
    desc: "Usability benchmarking with active retail & F&O traders.",
    isBottom: true,
    leftPos: "62.5%",
    color: "text-emerald-700",
  },
  {
    quarter: "Q4 - Handover",
    desc: "Design token handoff, UI specs & micro-animation sync.",
    isBottom: false,
    leftPos: "87.5%",
    color: "text-sky-600",
  },
];

const EngagementRoadmap = forwardRef<SlideHandle>(function EngagementRoadmap(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initial hidden states
    gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    
    nodeRefs.current.forEach((node) => {
      if (node) gsap.set(node, { scale: 0 });
    });
    cardRefs.current.forEach((card, idx) => {
      if (card) {
        const step = ROADMAP_STEPS[idx];
        gsap.set(card, { opacity: 0, y: step.isBottom ? 25 : -25 });
      }
    });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, headlineRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      nodeRefs.current.forEach((node) => {
        if (node) gsap.set(node, { scale: 0 });
      });
      cardRefs.current.forEach((card, idx) => {
        if (card) {
          const step = ROADMAP_STEPS[idx];
          gsap.set(card, { opacity: 0, y: step.isBottom ? 25 : -25 });
        }
      });

      // 1. Header
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth });
      tl.to(accentLineRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth }, "-=0.3");
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.dramatic }, "-=0.3");

      // 2. Timeline Horizontal Line
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: EASE.smooth,
      }, "-=0.4");

      // 3. Staggered Nodes and Cards
      ROADMAP_STEPS.forEach((_, idx) => {
        const node = nodeRefs.current[idx];
        const card = cardRefs.current[idx];

        if (node) {
          tl.to(node, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
          }, `-=${idx === 0 ? "0.6" : "0.25"}`);
        }

        if (card) {
          tl.to(card, {
            opacity: 1,
            y: 0,
            duration: DURATION.normal,
            ease: EASE.dramatic,
          }, "-=0.2");
        }
      });

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
        
        {/* Category Header */}
        <div ref={headerRef} className="pres-label pres-label--accent mb-1">
          12 / Future Outlook &amp; Engagement
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
          className="text-center mb-16 max-w-3xl font-bold tracking-tight text-slate-900"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)", lineHeight: 1.15 }}
        >
          Agency UX Engagement Roadmap
        </div>

        {/* Horizontal Timeline Container */}
        <div className="w-full max-w-4xl relative h-80 mt-8 flex items-center">
          
          {/* Main Horizontal Line */}
          <div
            ref={lineRef}
            className="absolute left-0 right-0 h-[3px] bg-slate-200/90 rounded-full"
          />

          {/* Timeline Milestones */}
          {ROADMAP_STEPS.map((step, idx) => (
            <div
              key={step.quarter}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: step.leftPos }}
            >
              {/* Timeline Circle Node */}
              <div
                ref={(el) => { nodeRefs.current[idx] = el; }}
                className="w-5 h-5 rounded-full border-4 border-white bg-sky-500 shadow-[0_2px_8px_rgba(14,165,233,0.4)] transform -translate-x-1/2 -translate-y-1/2 relative z-20 cursor-pointer hover:scale-125 transition-transform duration-200"
              />

              {/* Information Card (Alternating Top / Bottom) */}
              <div
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`absolute left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none ${
                  step.isBottom ? "top-5" : "bottom-5"
                }`}
              >
                {/* Quarter Header */}
                <h4 className={`text-sm font-extrabold tracking-tight mb-1.5 ${step.color}`}>
                  {step.quarter}
                </h4>

                {/* Quarter Description */}
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
});

export default EngagementRoadmap;
