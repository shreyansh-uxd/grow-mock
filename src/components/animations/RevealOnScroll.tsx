"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "stagger-children";
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  threshold?: number | string;
}

export default function RevealOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  distance = 40,
  stagger = 0.15,
  threshold = "top 85%",
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (variant === "stagger-children") {
        const targets = el.children;
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y: distance,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: threshold,
              toggleActions: "play none none none",
            },
          }
        );
        return;
      }

      let fromVars: gsap.TweenVars = { opacity: 0 };
      switch (variant) {
        case "fade-up":
          fromVars.y = distance;
          break;
        case "fade-down":
          fromVars.y = -distance;
          break;
        case "fade-left":
          fromVars.x = distance;
          break;
        case "fade-right":
          fromVars.x = -distance;
          break;
        case "scale-up":
          fromVars.scale = 0.92;
          break;
      }

      gsap.fromTo(
        el,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: threshold,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [variant, delay, duration, distance, stagger] }
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
