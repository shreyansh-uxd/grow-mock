"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "words" | "chars";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function AnimatedText({
  text,
  className,
  as: Component = "h1",
  splitBy = "words",
  delay = 0.1,
  duration = 0.8,
  stagger = 0.05,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const spans = containerRef.current?.querySelectorAll(".animated-token");
      if (!spans || spans.length === 0) return;

      gsap.fromTo(
        spans,
        {
          opacity: 0,
          y: 35,
          rotateX: -45,
          transformOrigin: "0% 50% -50",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          delay,
          stagger,
          ease: "power4.out",
        }
      );
    },
    { scope: containerRef, dependencies: [text, splitBy, delay, duration, stagger] }
  );

  const tokens = splitBy === "words" ? text.split(" ") : text.split("");

  return (
    <Component
      ref={containerRef as any}
      className={cn("inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] perspective-1000", className)}
    >
      {tokens.map((token, index) => (
        <span key={index} className="inline-block overflow-hidden pb-1">
          <span className="animated-token inline-block will-change-transform">
            {token === " " ? "\u00A0" : token}
          </span>
        </span>
      ))}
    </Component>
  );
}
