"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  activeKey: string;
  direction: number; // -1 = left, 1 = right, 0 = initial
  children: React.ReactNode;
}

/**
 * Premium GSAP page transition wrapper.
 *
 * On key change:
 *  1. The OLD content plays an exit animation (slide out + fade + scale down)
 *  2. The NEW content plays an enter animation (slide in + fade + scale up + staggered children)
 *
 * Uses a snapshot-based approach: we keep the previous content rendered
 * in a ghost layer during the exit, then swap.
 */
export default function PageTransition({ activeKey, direction, children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isAnimating = useRef(false);
  const prevKeyRef = useRef(activeKey);

  const animateIn = useCallback(
    (dir: number) => {
      if (!contentRef.current) return;

      const el = contentRef.current;
      const xStart = dir === 0 ? 0 : dir > 0 ? 80 : -80;

      // Kill any running tweens on this element
      gsap.killTweensOf(el);
      gsap.killTweensOf(el.children);

      // Master timeline for the enter animation
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Stage 1: Container slides in with scale and opacity
      tl.fromTo(
        el,
        {
          opacity: 0,
          x: xStart,
          scale: 0.96,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
          clearProps: "transform,filter,opacity",
        }
      );

      // Stage 2: Stagger-reveal direct child sections
      const sections = el.querySelectorAll(":scope > *");
      if (sections.length > 0) {
        tl.fromTo(
          sections,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "transform,filter,opacity",
          },
          "-=0.25"
        );
      }
    },
    []
  );

  const animateOut = useCallback(
    (dir: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!contentRef.current) {
          resolve();
          return;
        }

        const el = contentRef.current;
        const xEnd = dir === 0 ? 0 : dir > 0 ? -60 : 60;

        gsap.killTweensOf(el);

        gsap.to(el, {
          opacity: 0,
          x: xEnd,
          scale: 0.97,
          filter: "blur(4px)",
          duration: 0.28,
          ease: "power2.in",
          onComplete: resolve,
        });
      });
    },
    []
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initial mount — gentle fade in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 16, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            clearProps: "transform,filter,opacity",
          }
        );

        const sections = contentRef.current.querySelectorAll(":scope > *");
        if (sections.length > 0) {
          gsap.fromTo(
            sections,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.15,
              clearProps: "transform,filter,opacity",
            }
          );
        }
      }
      return;
    }

    if (activeKey === prevKeyRef.current) return;

    // Tab actually changed — run exit then enter
    isAnimating.current = true;
    const dir = direction;

    animateOut(dir).then(() => {
      prevKeyRef.current = activeKey;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animateIn(dir);
        });
      });
    });
  }, [activeKey, direction, animateIn, animateOut]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-x-hidden bg-white"
    >
      <div
        ref={contentRef}
        style={{ transformOrigin: "center top" }}
      >
        {children}
      </div>
    </div>
  );
}
