"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit fade out before calling onComplete
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete,
          });
        } else {
          onComplete();
        }
      },
    });

    // Logo entrance animation with spring bounce
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0, rotate: -45 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: "back.out(1.8)" }
    );

    // Subtle breathing pulse glow
    tl.to(logoRef.current, {
      scale: 1.08,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
    });

    // Text reveal
    tl.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      "-=0.4"
    );

    // Progress bar fill
    tl.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 1.1, ease: "power1.inOut" },
      "-=0.3"
    );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-between p-8 select-none"
    >
      {/* Top Decor Spacer */}
      <div className="w-full pt-6 flex justify-end">
        <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
          v2.4 • Groww
        </span>
      </div>

      {/* Main Center Branding */}
      <div className="flex flex-col items-center text-center my-auto">
        {/* Animated Clover Logo with Pulse Ring */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse scale-150" />
          <div
            ref={logoRef}
            className="relative h-24 w-24 rounded-3xl bg-white border border-emerald-100 shadow-xl flex items-center justify-center p-3"
          >
            <Image
              src="/logo.svg"
              alt="Groww Logo"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Heading & Subtitle */}
        <div ref={textRef} className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Groww
          </h1>
          <p className="text-xs font-semibold text-slate-500 tracking-wide max-w-xs leading-relaxed">
            Invest in Stocks, Direct Mutual Funds, ETFs &amp; IPOs
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs space-y-3 pb-6">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          />
        </div>
        <p className="text-[10px] font-mono font-bold text-slate-400 text-center uppercase tracking-widest">
          Loading market data...
        </p>
      </div>
    </div>
  );
}
