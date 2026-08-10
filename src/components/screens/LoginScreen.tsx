"use client";

import React, { useState, useRef } from "react";
import CompanyLogo from "@/components/ui/CompanyLogo";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface LoginScreenProps {
  onLoginSuccess: (userData?: { name: string; email: string }) => void;
  onSkip?: () => void;
}

export default function LoginScreen({ onLoginSuccess, onSkip }: LoginScreenProps) {
  // Pre-filled with demo credentials for instant 1-click login
  const [email, setEmail] = useState("aditya@religare.in");
  const [password, setPassword] = useState("groww2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.fromTo(
        cardRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please enter your email");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);

      setTimeout(() => {
        onLoginSuccess({
          name: email.includes("aditya") ? "Aditya Sharma" : "Demo Trader",
          email: email,
        });
      }, 500);
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-white text-slate-700 flex flex-col items-center justify-between p-6 overflow-hidden select-none relative"
    >
      {/* Top Header */}
      <div className="w-full max-w-xs flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <CompanyLogo symbol="RELIGARE" className="h-8 w-8" />
          <span className="font-extrabold tracking-tight text-slate-700 text-lg">Religare</span>
        </div>

        {onSkip && (
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Skip
          </button>
        )}
      </div>

      {/* Centered Form */}
      <div ref={cardRef} className="w-full max-w-xs my-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-700 tracking-tight">Log in</h1>
          <p className="text-xs text-slate-500 mt-1">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              placeholder="aditya@religare.in"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-slate-400 hover:text-slate-600 absolute right-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-500 font-medium pt-1">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || loginSuccess}
            className={`w-full mt-2 py-3 rounded-xl font-semibold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
              loginSuccess
                ? "bg-emerald-600"
                : isLoading
                ? "bg-emerald-500/80 cursor-wait"
                : "bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99]"
            }`}
          >
            {loginSuccess ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span>Success</span>
              </>
            ) : isLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="pb-1 text-center">
        <p className="text-[11px] text-slate-400">Protected by 256-bit SSL encryption</p>
      </div>
    </div>
  );
}


