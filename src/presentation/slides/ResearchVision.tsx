"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";
import type { SlideHandle } from "./Intro";

const ResearchVision = forwardRef<SlideHandle>(function ResearchVision(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Initial hidden state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 30 });
    gsap.set([labelRef.current, line1Ref.current, line2Ref.current, subRef.current], {
      opacity: 0,
      y: 40,
    });
    gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset scene container & states for repeat plays
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 30 });
      gsap.set([labelRef.current, line1Ref.current, line2Ref.current, subRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(accentLineRef.current, { opacity: 0, scaleX: 0 });

      // 1. Left Logo entrance
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.dramatic,
      });

      // 2. Right Label appears
      tl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: DURATION.normal,
          ease: EASE.smooth,
        },
        "-=0.6"
      );

      // 3. Accent line expands
      tl.to(
        accentLineRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: EASE.smooth,
        },
        "-=0.4"
      );

      // 4. Headline line 1
      tl.to(
        line1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: DURATION.slow,
          ease: EASE.dramatic,
        },
        "-=0.3"
      );

      // 5. Headline line 2
      tl.to(
        line2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: DURATION.slow,
          ease: EASE.dramatic,
        },
        "-=0.7"
      );

      // 6. Supporting text
      tl.to(
        subRef.current,
        {
          opacity: 1,
          y: 0,
          duration: DURATION.normal,
          ease: EASE.gentle,
        },
        "-=0.5"
      );

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
    <div ref={sceneRef} className="pres-scene">
      {/* 2-Column Split Layout */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 px-4 md:px-8">
        
        {/* LEFT COLUMN: Clean Large Brand Emblem */}
        <div ref={logoRef} className="flex-1 flex flex-col items-center justify-center md:justify-start gap-4">
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            <Image
              src="/Clip path group.svg"
              alt="Religare Broking Emblem"
              width={256}
              height={256}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Sub-label under logo */}
          <div className="text-center space-y-0.5">
            <span className="block text-sm font-mono font-bold text-slate-800 tracking-wider uppercase">
              RELIGARE
            </span>
            <span className="block text-xs font-mono font-semibold text-emerald-700 tracking-widest uppercase">
              Broking &amp; Wealth
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Typography Content */}
        <div className="flex-1 flex flex-col items-start text-left max-w-xl">
          {/* Small Category Label */}
          <div ref={labelRef} className="pres-label pres-label--accent mb-2">
            User Experience Research
          </div>

          {/* Green Accent Line */}
          <div
            ref={accentLineRef}
            style={{
              width: "3.5rem",
              height: "2px",
              background: "#1E7240",
              marginBottom: "clamp(1.25rem, 2.5vh, 2rem)",
              transformOrigin: "left center",
            }}
          />

          {/* Large Display Headlines */}
          <div ref={line1Ref} className="pres-headline text-left m-0 max-w-none">
            UX Research &amp;
          </div>
          <div ref={line2Ref} className="pres-headline text-left m-0 max-w-none text-emerald-700">
            Strategic Vision
          </div>

          {/* Supporting Statement */}
          <p ref={subRef} className="pres-subhead text-left m-0 mt-4 max-w-lg">
            Decoding trader behavioral patterns, interaction friction, and competitive experience gaps across India&rsquo;s retail trading landscape.
          </p>
        </div>

      </div>
    </div>
  );
});

export default ResearchVision;
