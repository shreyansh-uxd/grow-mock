"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";
import type { SlideHandle } from "./Intro";

const DesignPhilosophy = forwardRef<SlideHandle>(function DesignPhilosophy(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden states
    gsap.set([headerRef.current, authorRef.current], { opacity: 0, y: 30 });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(quoteContainerRef.current, { opacity: 0, scale: 0.96, y: 40 });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset states
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set([headerRef.current, authorRef.current], { opacity: 0, y: 30 });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set(quoteContainerRef.current, { opacity: 0, scale: 0.96, y: 40 });

      // 1. Header
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth });
      tl.to(accentLineRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth }, "-=0.3");

      // 2. Quote Container & Text
      tl.to(
        quoteContainerRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: DURATION.slow,
          ease: EASE.dramatic,
        },
        "-=0.2"
      );

      // 3. Author Line
      tl.to(
        authorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: DURATION.normal,
          ease: EASE.smooth,
        },
        "-=0.4"
      );

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
          07 / Core Design Philosophy
        </div>

        {/* Green Accent Line */}
        <div
          ref={accentLineRef}
          style={{
            width: "3.5rem",
            height: "2px",
            background: "#1E7240",
            marginBottom: "clamp(2rem, 4vh, 3.5rem)",
            transformOrigin: "center",
          }}
        />

        {/* Quote Layout Container */}
        <div
          ref={quoteContainerRef}
          className="relative max-w-4xl px-8 py-10 md:px-12 flex flex-col items-center"
        >
          {/* Large decorative quotation mark background */}
          <div className="absolute top-0 left-4 text-emerald-800/5 -translate-y-6 pointer-events-none">
            <Quote className="w-20 h-20 rotate-180 fill-current" />
          </div>

          {/* Quote Text */}
          <p
            ref={quoteTextRef}
            className="text-slate-800 font-medium leading-relaxed text-center relative z-10 italic max-w-3xl"
            style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.1rem)", letterSpacing: "-0.015em" }}
          >
            &ldquo;Great trading UX doesn&rsquo;t just make an app look better&mdash;it reduces cognitive load, eliminates trade errors, and turns complex market data into split-second clarity.&rdquo;
          </p>

          {/* Quote Author */}
          <div
            ref={authorRef}
            className="mt-8 flex flex-col items-center gap-1.5"
          >
            <div className="w-8 h-[1px] bg-slate-300 mb-2" />
            <span className="text-[10px] font-mono tracking-widest text-emerald-700 font-bold uppercase">
              &mdash; Lead User Experience Strategist
            </span>
          </div>

          <div className="absolute bottom-0 right-4 text-emerald-800/5 translate-y-6 pointer-events-none">
            <Quote className="w-20 h-20 fill-current" />
          </div>
        </div>

      </div>
    </div>
  );
});

export default DesignPhilosophy;
