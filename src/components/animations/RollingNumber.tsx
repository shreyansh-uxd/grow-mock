"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface RollingNumberProps {
  value: string;
  isPositive: boolean;
  tickTime?: number;
  className?: string;
}

export default function RollingNumber({ value, isPositive, tickTime, className = "" }: RollingNumberProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars = value.split("");

  useGSAP(
    () => {
      if (!tickTime || !containerRef.current) return;

      const digits = containerRef.current.querySelectorAll(".rolling-char");
      const isUp = isPositive;

      // Slot machine digit roll effect
      gsap.fromTo(
        digits,
        {
          y: isUp ? 8 : -8,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.03,
          ease: "back.out(1.7)",
        }
      );

      // Subtle scale pulse without background or border
      gsap.fromTo(
        containerRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [value, tickTime] }
  );

  return (
    <span
      ref={containerRef}
      className={`text-[11px] font-extrabold font-mono transition-all inline-flex items-center gap-0.25 ${
        isPositive ? "text-emerald-600" : "text-rose-600"
      } ${className}`}
    >
      {chars.map((char, index) => (
        <span key={`${index}-${char}`} className="rolling-char inline-block tracking-tighter">
          {char}
        </span>
      ))}
    </span>
  );
}
