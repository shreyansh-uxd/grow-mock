"use client";

import React, { useState, useRef } from "react";
import { User, Wallet, ShieldCheck, CreditCard, FileText, Lock, HelpCircle, LogOut, ChevronRight, PlusCircle, ArrowDownLeft, X, Edit3, CheckCircle2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MoreViewProps {
  onOpenProfile: () => void;
  profileDrawerOpen: boolean;
  setProfileDrawerOpen: (open: boolean) => void;
  onReplaySplash?: () => void;
  onReplayOnboarding?: () => void;
}

export default function MoreView({
  onOpenProfile,
  profileDrawerOpen,
  setProfileDrawerOpen,
  onReplaySplash,
  onReplayOnboarding,
}: MoreViewProps) {
  const [walletBalance, setWalletBalance] = useState(12450.00);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!profileDrawerOpen || !drawerRef.current) return;
      gsap.fromTo(
        drawerRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.3, ease: "power3.out" }
      );
    },
    { scope: drawerRef, dependencies: [profileDrawerOpen] }
  );

  const handleAddMoney = () => {
    const amount = prompt("Enter amount to add (₹):", "5000");
    if (amount && !isNaN(Number(amount))) {
      setWalletBalance((prev) => prev + Number(amount));
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of your Religare account?")) {
      setIsLoggedOut(true);
      setProfileDrawerOpen(false);
    }
  };

  const PRODUCTS = [
    { name: "F&O Trading", desc: "Options & Futures", color: "bg-indigo-50 text-indigo-600" },
    { name: "Mutual Funds", desc: "SIP & Lumpsum", color: "bg-emerald-50 text-emerald-600" },
    { name: "Fixed Deposit", desc: "Up to 8.5% p.a.", color: "bg-amber-50 text-amber-600" },
    { name: "US Stocks", desc: "Invest in Apple, Tesla", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="pb-4 relative bg-white min-h-full">
      
      <div className="p-4 space-y-4 bg-white">
        
        {/* Profile Card Triggering Bottom Drawer */}
        <div
          onClick={() => setProfileDrawerOpen(true)}
          className="groww-card p-4 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-emerald-800 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {isLoggedOut ? "Guest User" : "Aditya Sharma"}
                </h2>
                <Edit3 className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono">BO ID: 1208160049281045</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              {isLoggedOut ? "Guest" : "KYC Verified"}
            </span>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-mono text-slate-500">RELIGARE BALANCE</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono border border-emerald-200">
              Instant Withdrawal
            </span>
          </div>

          <div>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              ₹{walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddMoney}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Money</span>
            </button>
            <button
              onClick={() => alert("Withdrawal request submitted successfully!")}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <ArrowDownLeft className="h-4 w-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* App Demo & Replay Screens Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
            App Demos &amp; Experience
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onReplaySplash}
              className="groww-card p-3.5 flex flex-col justify-between h-20 cursor-pointer hover:border-emerald-500 transition-all text-left group"
            >
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                View Splash Screen
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Replay brand logo intro</span>
            </button>

            <button
              onClick={onReplayOnboarding}
              className="groww-card p-3.5 flex flex-col justify-between h-20 cursor-pointer hover:border-emerald-500 transition-all text-left group"
            >
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                View 3 Onboarding Slides
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Replay feature tutorial</span>
            </button>
          </div>
        </div>

        {/* Religare Products */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Religare Products</h3>
          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="groww-card p-3.5 flex flex-col justify-between h-24 cursor-pointer hover:border-emerald-500 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.color}`}>
                    {p.name}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Account &amp; Preferences</h3>
          <div className="groww-card divide-y divide-slate-100 overflow-hidden">
            <div
              onClick={() => setProfileDrawerOpen(true)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">My Profile &amp; Demat Info</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Bank Details &amp; AutoPay</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Reports &amp; Tax P&amp;L Statements</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Security, PIN &amp; Biometrics</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Customer Help &amp; Support 24x7</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Profile & Logout Bottom Drawer */}
      {profileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={() => setProfileDrawerOpen(false)} />

          <div
            ref={drawerRef}
            className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl p-5 border-t border-slate-100 z-10 space-y-3.5 pb-6"
          >
            {/* Top Drag Handle */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">User Profile</h3>
              <button
                onClick={() => setProfileDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Summary Card */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="h-11 w-11 rounded-xl bg-emerald-800 text-white font-extrabold text-lg flex items-center justify-center shadow-sm shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate">Aditya Sharma</h4>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 font-mono truncate">aditya.sharma@example.com</p>
                <span className="inline-block mt-0.5 text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  SEBI Reg. Investor
                </span>
              </div>
            </div>

            {/* Demat & Account Details */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Account Credentials
              </h4>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">BO ID (Demat)</span>
                  <span className="font-bold text-slate-900">1208160049281045</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DP ID</span>
                  <span className="font-bold text-slate-900">IN300128</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PAN Number</span>
                  <span className="font-bold text-slate-900">ABCDE1234F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nominee Status</span>
                  <span className="font-bold text-emerald-600">Added &amp; Verified</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert("Edit Profile details clicked")}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => alert("Bank Account details clicked")}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <CreditCard className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Manage Banks</span>
                </button>
              </div>
            </div>

            {/* Logout Action Button */}
            <div className="pt-1">
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 border border-rose-200 transition-colors cursor-pointer shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out of Groww Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
