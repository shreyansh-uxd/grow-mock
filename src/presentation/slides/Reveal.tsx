"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";

export interface SlideHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: (onComplete?: () => void) => gsap.core.Timeline;
}

interface RevealProps {
  onRevealComplete: () => void;
}

const Reveal = forwardRef<SlideHandle, RevealProps>(function Reveal({ onRevealComplete }, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([labelRef.current, headlineRef.current, subRef.current, ctaRef.current], {
      opacity: 0,
      y: 40,
    });
    gsap.set(lineRef.current, { opacity: 0, scaleX: 0 });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset scene container and children
      gsap.set(sceneRef.current, { opacity: 1 });
      gsap.set([labelRef.current, headlineRef.current, subRef.current, ctaRef.current], {
        opacity: 0, y: 40,
      });
      gsap.set(lineRef.current, { opacity: 0, scaleX: 0 });

      tl.to(labelRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: EASE.gentle,
      });

      tl.to(lineRef.current, {
        opacity: 1, scaleX: 1, duration: 0.5, ease: EASE.smooth,
      }, "-=0.3");

      tl.to(headlineRef.current, {
        opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.dramatic,
      }, "-=0.2");

      tl.to(subRef.current, {
        opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.gentle,
      }, "-=0.6");

      tl.to(ctaRef.current, {
        opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth,
      }, "-=0.4");

      return tl;
    },

    animateOut: (onComplete?: () => void) => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
          onRevealComplete();
        },
      });

      // Everything scales up and fades — the presentation "dissolves" into the app
      tl.to([labelRef.current, lineRef.current, subRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      tl.to(headlineRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.in",
      }, "-=0.3");

      tl.to(ctaRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, "-=0.4");

      // Final scene background fades
      tl.to(sceneRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }, "-=0.2");

      return tl;
    },
  }));

  const handleEnter = () => {
    // Trigger the final dissolve animation
    const tl = gsap.timeline({
      onComplete: onRevealComplete,
    });

    tl.to([labelRef.current, lineRef.current, subRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to(headlineRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.in",
    }, "-=0.3");

    tl.to(ctaRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.4");
  };

  return (
    <div ref={sceneRef} className="pres-scene">
      <div className="pres-reveal-container">
        {/* Label */}
        <div ref={labelRef} className="pres-label">
          Demo Showcase
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          style={{
            width: "3rem",
            height: "2px",
            background: "#1E7240",
            transformOrigin: "center",
          }}
        />

        {/* Headline */}
        <div
          ref={headlineRef}
          className="pres-headline--sm"
          style={{
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#111111",
            textAlign: "center",
          }}
        >
          Now ready for the UX showcase
        </div>

        {/* Supporting text */}
        <p ref={subRef} className="pres-subhead" style={{ marginTop: 0 }}>
          Experience the dynamic, high-performance interface of Religare 2.0 firsthand.
        </p>

        {/* CTA button */}
        <button
          ref={ctaRef}
          onClick={handleEnter}
          className="pres-reveal-cta"
        >
          Start Demo Showcase →
        </button>
      </div>
    </div>
  );
});

export default Reveal;
