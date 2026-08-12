"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { EASE, DURATION } from "../animations/presentationAnimations";

export interface SlideHandle {
  animateIn: () => gsap.core.Timeline;
  animateOut: () => gsap.core.Timeline;
}

const CAPABILITIES = [
  { index: "01", title: "Trade", desc: "Zero commission on 5,000+ stocks" },
  { index: "02", title: "Track", desc: "Smart watchlists with instant alerts" },
  { index: "03", title: "Grow", desc: "Automated SIPs for long-term wealth" },
  { index: "04", title: "Analyze", desc: "Real-time charts and market insights" },
];

const Experience = forwardRef<SlideHandle>(function Experience(_, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.set(headerRef.current, { opacity: 0, y: 30 });
    itemRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 40, x: -20 });
    });
    dividerRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scaleX: 0 });
    });
  }, []);

  useImperativeHandle(ref, () => ({
    animateIn: () => {
      const tl = gsap.timeline();

      // Reset scene container and children
      gsap.set(sceneRef.current, { opacity: 1, y: 0 });
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      itemRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 40, x: -20 });
      });
      dividerRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scaleX: 0 });
      });

      // Header
      tl.to(headerRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: EASE.smooth,
      });

      // Stagger each capability row
      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        tl.to(el, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: DURATION.normal,
          ease: EASE.dramatic,
        }, i === 0 ? "-=0.2" : "-=0.5");

        // Divider after each item (except last)
        const divider = dividerRefs.current[i];
        if (divider) {
          tl.to(divider, {
            opacity: 1,
            scaleX: 1,
            duration: 0.35,
            ease: EASE.smooth,
          }, "-=0.4");
        }
      });

      return tl;
    },

    animateOut: () => {
      const tl = gsap.timeline();
      tl.to(sceneRef.current, {
        opacity: 0,
        y: -30,
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
        maxWidth: "48rem",
        width: "100%",
        gap: 0,
      }}>
        {/* Section header */}
        <div ref={headerRef} style={{ marginBottom: "clamp(2rem, 4vh, 3.5rem)" }}>
          <div className="pres-label pres-label--accent" style={{ textAlign: "left" }}>
            What you can do
          </div>
        </div>

        {/* Capability items */}
        {CAPABILITIES.map((cap, i) => (
          <React.Fragment key={cap.index}>
            <div
              ref={(el) => { itemRefs.current[i] = el; }}
              className="pres-capability"
              style={{ padding: "clamp(0.5rem, 1vh, 0.75rem) 0" }}
            >
              <span className="pres-capability__index">{cap.index}</span>
              <div>
                <div className="pres-capability__title">{cap.title}</div>
                <div className="pres-capability__desc">{cap.desc}</div>
              </div>
            </div>
            {i < CAPABILITIES.length - 1 && (
              <div
                ref={(el) => { dividerRefs.current[i] = el; }}
                style={{
                  width: "100%",
                  height: "1px",
                  background: "rgba(0,0,0,0.06)",
                  transformOrigin: "left center",
                  margin: "clamp(0.25rem, 0.5vh, 0.5rem) 0",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default Experience;
