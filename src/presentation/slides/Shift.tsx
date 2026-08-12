"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";

export interface SlideHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: () => gsap.core.Timeline;
}

const Shift = forwardRef<SlideHandle>(function Shift(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const words = ["What", "if", "everything", "just", "worked?"];

  useEffect(() => {
    // Hide all initially
    const wordEls = wordsContainerRef.current?.querySelectorAll(".pres-shift-word");
    if (wordEls) {
      gsap.set(wordEls, { opacity: 0, y: 80, rotateX: 30 });
    }
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(lineRef.current, { opacity: 0, scaleX: 0 });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();
      const wordEls = wordsContainerRef.current?.querySelectorAll(".pres-shift-word");

      // Reset scene container and children
      gsap.set(sceneRef.current, { opacity: 1, scale: 1 });
      if (wordEls) gsap.set(wordEls, { opacity: 0, y: 80, rotateX: 30 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(lineRef.current, { opacity: 0, scaleX: 0 });
      if (wordsContainerRef.current) gsap.set(wordsContainerRef.current, { letterSpacing: "-0.02em" });

      if (wordEls && wordEls.length > 0) {
        // Phase 1: Words appear scattered (staggered, slightly offset)
        tl.to(wordEls, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: DURATION.slow,
          ease: EASE.dramatic,
          stagger: 0.1,
        });

        // Phase 2: Brief pause for reading
        tl.to({}, { duration: 0.3 });

        // Phase 3: Words tighten together (reduce letter-spacing feeling)
        tl.to(wordsContainerRef.current, {
          letterSpacing: "-0.04em",
          duration: 0.6,
          ease: EASE.inOut,
        });
      }

      // Accent line appears
      tl.to(lineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        ease: EASE.smooth,
      }, "-=0.3");

      // Logo fades in subtly
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: DURATION.normal,
        ease: EASE.gentle,
      }, "-=0.2");

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.in",
      });
      return tl;
    },
  }));

  return (
    <div ref={sceneRef} className="pres-scene">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "60rem",
      }}>
        {/* Words container */}
        <div
          ref={wordsContainerRef}
          className="pres-headline--md"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 clamp(0.5rem, 1.5vw, 1.25rem)",
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#111111",
            perspective: "600px",
          }}
        >
          {words.map((word, i) => (
            <span key={i} className="pres-shift-word">
              {word}
            </span>
          ))}
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          style={{
            width: "4rem",
            height: "2px",
            background: "#1E7240",
            margin: "clamp(1.5rem, 3vh, 2.5rem) auto",
            transformOrigin: "center",
          }}
        />

        {/* Religare logo mark (subtle) */}
        <div ref={logoRef} className="pres-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="/Clip path group.svg"
            alt="Religare"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
});

export default Shift;
