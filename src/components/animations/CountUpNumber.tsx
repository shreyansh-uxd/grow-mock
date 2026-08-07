"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface CountUpNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
  duration = 1.2,
  className = "",
}: CountUpNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = spanRef.current;
      if (!el) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: value,
        duration: duration,
        ease: "power3.out",
        onUpdate: () => {
          if (el) {
            const formatted = obj.val.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
            el.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    },
    { scope: spanRef, dependencies: [value, duration, prefix, suffix, decimals] }
  );

  return (
    <span ref={spanRef} className={className}>
      {prefix}0.00{suffix}
    </span>
  );
}
