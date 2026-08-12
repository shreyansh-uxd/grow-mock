import gsap from "gsap";

/* ─────────────────────────────────────────────────────
   PRESENTATION ANIMATION UTILITIES
   Shared GSAP helpers for all scenes
   ───────────────────────────────────────────────────── */

// Easing presets
export const EASE = {
  smooth: "power3.out",
  dramatic: "power4.out",
  expo: "expo.out",
  circ: "circ.out",
  gentle: "power2.out",
  inOut: "power3.inOut",
} as const;

// Duration presets
export const DURATION = {
  fast: 0.5,
  normal: 0.8,
  slow: 1.2,
  dramatic: 1.6,
} as const;

/**
 * Fade in + slide up from below
 */
export function fadeSlideUp(
  target: gsap.TweenTarget,
  timeline: gsap.core.Timeline,
  options: {
    y?: number;
    duration?: number;
    ease?: string;
    position?: string | number;
    delay?: number;
  } = {}
) {
  const {
    y = 40,
    duration = DURATION.normal,
    ease = EASE.smooth,
    position,
    delay = 0,
  } = options;

  timeline.fromTo(
    target,
    { y, opacity: 0 },
    { y: 0, opacity: 1, duration, ease, delay },
    position
  );
}

/**
 * Stagger reveal for multiple elements
 */
export function staggerReveal(
  targets: gsap.TweenTarget,
  timeline: gsap.core.Timeline,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    position?: string | number;
  } = {}
) {
  const {
    y = 50,
    stagger = 0.12,
    duration = DURATION.normal,
    ease = EASE.smooth,
    position,
  } = options;

  timeline.fromTo(
    targets,
    { y, opacity: 0 },
    { y: 0, opacity: 1, duration, ease, stagger },
    position
  );
}

/**
 * Scale + fade reveal (for product mockups)
 */
export function scaleReveal(
  target: gsap.TweenTarget,
  timeline: gsap.core.Timeline,
  options: {
    fromScale?: number;
    duration?: number;
    ease?: string;
    position?: string | number;
  } = {}
) {
  const {
    fromScale = 0.85,
    duration = DURATION.slow,
    ease = EASE.dramatic,
    position,
  } = options;

  timeline.fromTo(
    target,
    { scale: fromScale, opacity: 0 },
    { scale: 1, opacity: 1, duration, ease },
    position
  );
}

/**
 * Fade out + slide a scene
 */
export function fadeOut(
  target: gsap.TweenTarget,
  options: {
    y?: number;
    duration?: number;
    ease?: string;
    onComplete?: () => void;
  } = {}
) {
  const {
    y = -30,
    duration = 0.5,
    ease = "power2.in",
    onComplete,
  } = options;

  return gsap.to(target, {
    y,
    opacity: 0,
    duration,
    ease,
    onComplete,
  });
}

/**
 * Word-by-word stagger animation
 * Wraps each word in a span for individual animation
 */
export function animateWords(
  container: HTMLElement,
  timeline: gsap.core.Timeline,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    position?: string | number;
  } = {}
) {
  const {
    y = 60,
    stagger = 0.08,
    duration = DURATION.normal,
    ease = EASE.smooth,
    position,
  } = options;

  const words = container.querySelectorAll(".pres-shift-word");
  if (words.length === 0) return;

  timeline.fromTo(
    words,
    { y, opacity: 0 },
    { y: 0, opacity: 1, duration, ease, stagger },
    position
  );
}

/**
 * Blur → sharp reveal
 */
export function blurReveal(
  target: gsap.TweenTarget,
  timeline: gsap.core.Timeline,
  options: {
    duration?: number;
    ease?: string;
    position?: string | number;
  } = {}
) {
  const {
    duration = DURATION.slow,
    ease = EASE.dramatic,
    position,
  } = options;

  timeline.fromTo(
    target,
    { filter: "blur(12px)", opacity: 0, scale: 0.92 },
    { filter: "blur(0px)", opacity: 1, scale: 1, duration, ease },
    position
  );
}
