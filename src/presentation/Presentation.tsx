"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import gsap from "gsap";
import Intro from "./slides/Intro";
import ResearchVision from "./slides/ResearchVision";
import DesignPhilosophy from "./slides/DesignPhilosophy";
import CompetitorAudit from "./slides/CompetitorAudit";
import TaskBenchmark from "./slides/TaskBenchmark";
import UXPillars from "./slides/UXPillars";
import Comparison from "./slides/Comparison";
import ShowcaseHome from "./slides/ShowcaseHome";
import ShowcaseWatchlist from "./slides/ShowcaseWatchlist";
import ShowcasePortfolio from "./slides/ShowcasePortfolio";
import Reveal from "./slides/Reveal";
import type { SlideHandle } from "./slides/Intro";
import "./Presentation.css";

const TOTAL_SCENES = 11;
const SCROLL_COOLDOWN = 1200; // ms between scene transitions
const TOUCH_THRESHOLD = 50; // px swipe distance to trigger

interface PresentationProps {
  onComplete: () => void;
}

export default function Presentation({ onComplete }: PresentationProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCue, setShowCue] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Slide refs
  const introRef = useRef<SlideHandle>(null);
  const researchVisionRef = useRef<SlideHandle>(null);
  const designPhilosophyRef = useRef<SlideHandle>(null);
  const competitorAuditRef = useRef<SlideHandle>(null);
  const taskBenchmarkRef = useRef<SlideHandle>(null);
  const uxPillarsRef = useRef<SlideHandle>(null);
  const comparisonRef = useRef<SlideHandle>(null);
  const showcaseHomeRef = useRef<SlideHandle>(null);
  const showcaseWatchlistRef = useRef<SlideHandle>(null);
  const showcasePortfolioRef = useRef<SlideHandle>(null);
  const revealRef = useRef<SlideHandle>(null);

  const slideRefs = [
    introRef,
    researchVisionRef,
    competitorAuditRef,
    taskBenchmarkRef,
    uxPillarsRef,
    comparisonRef,
    designPhilosophyRef,
    showcaseHomeRef,
    showcaseWatchlistRef,
    showcasePortfolioRef,
    revealRef,
  ];

  // Prevent body scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

  // Animate first scene on mount
  useEffect(() => {
    // Delay to ensure refs and DOM are ready
    const timer = setTimeout(() => {
      const firstSlide = slideRefs[0]?.current;
      if (firstSlide) {
        firstSlide.animateIn();
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide scroll cue after first interaction
  useEffect(() => {
    if (currentScene > 0) {
      setShowCue(false);
    }
  }, [currentScene]);

  // Navigate to first scene
  const goToFirstScene = useCallback(() => {
    if (currentScene === 0 || isAnimating) return;

    const now = Date.now();
    lastScrollTime.current = now;
    setIsAnimating(true);

    const currentSlide = slideRefs[currentScene]?.current;
    const firstSlide = slideRefs[0]?.current;

    if (!currentSlide || !firstSlide) {
      setIsAnimating(false);
      return;
    }

    const outTl = currentSlide.animateOut();
    outTl.eventCallback("onComplete", () => {
      setCurrentScene(0);

      // Small delay before animating in
      setTimeout(() => {
        const inTl = firstSlide.animateIn();
        inTl.eventCallback("onComplete", () => {
          setIsAnimating(false);
        });
      }, 100);
    });
  }, [currentScene, isAnimating, slideRefs]);

  // Navigate to next scene
  const goToScene = useCallback(
    (direction: 1 | -1) => {
      const now = Date.now();
      if (isAnimating || now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      const nextScene = currentScene + direction;
      if (nextScene < 0 || nextScene >= TOTAL_SCENES) return;

      lastScrollTime.current = now;
      setIsAnimating(true);

      const currentSlide = slideRefs[currentScene]?.current;
      const nextSlide = slideRefs[nextScene]?.current;

      if (!currentSlide || !nextSlide) {
        setIsAnimating(false);
        return;
      }

      // Animate out current scene, then animate in next
      const outTl = currentSlide.animateOut();
      outTl.eventCallback("onComplete", () => {
        setCurrentScene(nextScene);

        // Small delay before animating in
        setTimeout(() => {
          const inTl = nextSlide.animateIn();
          inTl.eventCallback("onComplete", () => {
            setIsAnimating(false);
          });
        }, 100);
      });
    },
    [currentScene, isAnimating, slideRefs]
  );

  // Skip to end
  const handleSkip = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Fast-forward: fade out entire layer
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      },
    });
  }, [isAnimating, onComplete]);

  // Handle reveal completion (final scene)
  const handleRevealComplete = useCallback(() => {
    // Fade the entire presentation layer
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      },
    });
  }, [onComplete]);

  // Mouse wheel handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      goToScene(direction as 1 | -1);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [goToScene]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goToScene(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goToScene(-1);
      } else if (e.key === "Escape") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToScene, handleSkip]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;

    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;

    // Use the axis with the larger movement
    if (Math.abs(diffY) > Math.abs(diffX)) {
      if (Math.abs(diffY) > TOUCH_THRESHOLD) {
        goToScene(diffY > 0 ? 1 : -1);
      }
    } else {
      if (Math.abs(diffX) > TOUCH_THRESHOLD) {
        goToScene(diffX > 0 ? 1 : -1);
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  const progressPercent = ((currentScene + 1) / TOTAL_SCENES) * 100;

  return (
    <div
      ref={containerRef}
      className="pres-layer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* All scenes stacked absolutely — visibility controls which is shown */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {[
          { idx: 0, el: <Intro ref={introRef} /> },
          { idx: 1, el: <ResearchVision ref={researchVisionRef} /> },
          { idx: 2, el: <CompetitorAudit ref={competitorAuditRef} /> },
          { idx: 3, el: <TaskBenchmark ref={taskBenchmarkRef} /> },
          { idx: 4, el: <UXPillars ref={uxPillarsRef} /> },
          { idx: 5, el: <Comparison ref={comparisonRef} /> },
          { idx: 6, el: <DesignPhilosophy ref={designPhilosophyRef} /> },
          { idx: 7, el: <ShowcaseHome ref={showcaseHomeRef} /> },
          { idx: 8, el: <ShowcaseWatchlist ref={showcaseWatchlistRef} /> },
          { idx: 9, el: <ShowcasePortfolio ref={showcasePortfolioRef} /> },
          { idx: 10, el: <Reveal ref={revealRef} onRevealComplete={handleRevealComplete} /> },
        ].map(({ idx, el }) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              inset: 0,
              visibility: currentScene === idx ? "visible" : "hidden",
              pointerEvents: currentScene === idx ? "auto" : "none",
            }}
          >
            {el}
          </div>
        ))}
      </div>

      {/* Home button */}
      <button
        className={`pres-home ${currentScene === 0 ? "is-hidden" : ""}`}
        onClick={goToFirstScene}
        disabled={currentScene === 0 || isAnimating}
        title="Go to first slide"
      >
        <Home className="w-3.5 h-3.5 pres-home__icon" />
        <span>Home</span>
      </button>

      {/* Skip button */}
      <button className="pres-skip" onClick={handleSkip}>
        <span>Skip</span>
        <span className="pres-skip__arrow">→</span>
      </button>

      {/* Progress & Navigation Controls */}
      <div className="pres-progress">
        {/* Left Arrow Button */}
        <button
          onClick={() => goToScene(-1)}
          disabled={currentScene === 0 || isAnimating}
          className="w-12 h-12 rounded-full border border-slate-300/90 bg-white text-slate-900 hover:text-emerald-700 hover:border-emerald-600 hover:bg-emerald-50/50 disabled:opacity-20 disabled:hover:border-slate-300 disabled:hover:text-slate-900 disabled:hover:bg-white disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        <div className="flex items-center gap-3 px-2">
          <span className="pres-progress__text font-mono font-bold text-slate-800 text-xs">
            {String(currentScene + 1).padStart(2, "0")} / {String(TOTAL_SCENES).padStart(2, "0")}
          </span>
          <div className="pres-progress__bar">
            <div
              className="pres-progress__fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => goToScene(1)}
          disabled={currentScene === TOTAL_SCENES - 1 || isAnimating}
          className="w-12 h-12 rounded-full border border-slate-300/90 bg-white text-slate-900 hover:text-emerald-700 hover:border-emerald-600 hover:bg-emerald-50/50 disabled:opacity-20 disabled:hover:border-slate-300 disabled:hover:text-slate-900 disabled:hover:bg-white disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Scroll cue (first scene only) */}
      {showCue && currentScene === 0 && (
        <div className="pres-cue">
          <div className="pres-cue__line" />
          <span className="pres-cue__text">Scroll</span>
        </div>
      )}
    </div>
  );
}
