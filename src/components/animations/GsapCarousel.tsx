"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GsapCarouselProps {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  scrollAmount?: number;
  enableScaleEffect?: boolean;
  showControls?: boolean;
  showProgress?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export default function GsapCarousel({
  children,
  className = "",
  trackClassName = "",
  scrollAmount = 260,
  enableScaleEffect = true,
  showControls = true,
  showProgress = false,
  title,
  subtitle,
  headerRight,
}: GsapCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  // Drag state for smooth mouse & touch physics momentum
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  // Helper to update navigation buttons state & progress percentage
  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < maxScroll - 5);

    if (maxScroll > 0) {
      setProgress(Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100)));
    }
  }, []);

  // Incredible 3D Cover-Flow depth, perspective tilt & scale effect on scroll
  const updateScaleEffect = useCallback(() => {
    if (!enableScaleEffect || !trackRef.current) return;
    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    const cards = Array.from(track.children) as HTMLElement[];
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = cardCenter - trackCenter;
      const maxDistance = trackRect.width / 2;

      // Normalized ratio (-1 at far left, 0 at center, +1 at far right)
      const ratio = Math.max(-1.2, Math.min(1.2, distanceFromCenter / maxDistance));
      const absRatio = Math.abs(ratio);

      // Scale: 1.06 at center down to 0.92 at edge
      const scale = 1.06 - absRatio * 0.12;
      // Opacity: 1.0 at center down to 0.78 at edge
      const opacity = 1.0 - absRatio * 0.22;
      // 3D Perspective Tilt: Rotate Y inward toward center (+ degrees on left, - degrees on right)
      const rotateY = -ratio * 14;
      // 3D Depth Z-translation: Pop center forward (15px), push sides back (-20px)
      const translateZ = (1 - absRatio) * 20 - 10;

      gsap.to(card, {
        scale: scale,
        opacity: opacity,
        rotateY: rotateY,
        z: translateZ,
        transformPerspective: 800,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [enableScaleEffect]);

  const handleScroll = useCallback(() => {
    updateScrollState();
    updateScaleEffect();
  }, [updateScrollState, updateScaleEffect]);

  // GSAP Slow, Ultra-Luxurious Scroll Navigation with 3D Wave Motion
  const scrollByAmount = useCallback(
    (direction: "left" | "right") => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const delta = direction === "left" ? -scrollAmount : scrollAmount;
      const targetScroll = Math.max(0, Math.min(maxScroll, track.scrollLeft + delta));

      // 1. Slow, silky smooth main scroll tween (1.1s power4.out deceleration)
      gsap.to(track, {
        scrollLeft: targetScroll,
        duration: 1.1,
        ease: "power4.out",
        onUpdate: () => {
          updateScrollState();
          updateScaleEffect();
        },
      });

      // 2. Trigger a dynamic 3D cascading wave impulse across visible cards
      const cards = Array.from(track.children) as HTMLElement[];
      const staggerDir = direction === "right" ? 0.04 : -0.04;
      gsap.fromTo(
        cards,
        { y: 0 },
        {
          y: (i) => (direction === "right" ? -6 + i * 0.5 : -6 + (cards.length - i) * 0.5),
          duration: 0.5,
          stagger: {
            each: 0.04,
            from: direction === "right" ? "start" : "end",
          },
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    },
    [scrollAmount, updateScrollState, updateScaleEffect]
  );

  // Mouse Drag Physics Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = trackRef.current.scrollLeft;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    gsap.killTweensOf(trackRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX.current) * 1.35;
    trackRef.current.scrollLeft = startScrollLeft.current - walk;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (x - lastX.current) / dt;
    }
    lastX.current = x;
    lastTime.current = now;

    updateScrollState();
    updateScaleEffect();
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current || !trackRef.current) return;
    isDragging.current = false;

    // Apply luxurious slow physics momentum when releasing drag (1.2s power3.out)
    const momentumScroll = trackRef.current.scrollLeft - velocity.current * 340;
    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
    const targetScroll = Math.max(0, Math.min(maxScroll, momentumScroll));

    gsap.to(trackRef.current, {
      scrollLeft: targetScroll,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        updateScrollState();
        updateScaleEffect();
      },
    });
  };

  // Initial Stagger Animation on Mount ONLY
  useGSAP(
    () => {
      if (!trackRef.current) return;
      const cards = Array.from(trackRef.current.children) as HTMLElement[];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 22, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: "power4.out",
            onComplete: () => {
              updateScaleEffect();
              updateScrollState();
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  useEffect(() => {
    updateScrollState();
    updateScaleEffect();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [handleScroll, updateScrollState, updateScaleEffect]);

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`}>
      {/* Header with Title & Custom Nav Buttons */}
      {(title || showControls || headerRight) && (
        <div className="flex items-center justify-between px-4 mb-3">
          <div>
            {typeof title === "string" ? (
              <h2 className="text-sm font-semibold text-slate-500">{title}</h2>
            ) : (
              title
            )}
            {subtitle}
          </div>

          <div className="flex items-center gap-2">
            {headerRight}

            {showControls && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollByAmount("left")}
                  disabled={!canScrollLeft}
                  className={`p-1.5 rounded-full bg-white border border-slate-200/80 text-slate-600 transition-all cursor-pointer shadow-2xs hover:bg-slate-50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 ${
                    canScrollLeft ? "hover:scale-110 text-emerald-600 border-emerald-300 shadow-md" : ""
                  }`}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.25]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollByAmount("right")}
                  disabled={!canScrollRight}
                  className={`p-1.5 rounded-full bg-white border border-slate-200/80 text-slate-600 transition-all cursor-pointer shadow-2xs hover:bg-slate-50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 ${
                    canScrollRight ? "hover:scale-110 text-emerald-600 border-emerald-300 shadow-md" : ""
                  }`}
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.25]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Track Container with 3D Perspective */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        className={`
          flex items-center gap-4 overflow-x-auto px-4 pb-3 pt-2
          no-scrollbar select-none cursor-grab active:cursor-grabbing
          ${trackClassName}
        `}
      >
        {children}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="px-4 mt-2">
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
