"use client";

import Link from "next/link";
import { Sparkles, ArrowUp, Globe, Heart } from "lucide-react";
import gsap from "gsap";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                AURA STARTER
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm">
              Next.js + Tailwind CSS + GSAP clean starter code designed for modern web applications.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#typography" className="hover:text-white transition-colors">Typography</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#docs" className="hover:text-white transition-colors">Docs</a>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all cursor-pointer group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Aura Starter. Open Source & MIT Licensed.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Clean Web Apps</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
