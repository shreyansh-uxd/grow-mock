"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import LightMarketTicker from "@/components/ui/LightMarketTicker";
import RecentlyViewed from "@/components/sections/RecentlyViewed";
import MostTraded from "@/components/sections/MostTraded";
import FinancialTools from "@/components/sections/FinancialTools";
import TopMovers from "@/components/sections/TopMovers";
import TopIntraday from "@/components/sections/TopIntraday";
import StocksInNews from "@/components/sections/StocksInNews";
import WatchlistView from "@/components/views/WatchlistView";
import PortfolioView from "@/components/views/PortfolioView";
import MoreView from "@/components/views/MoreView";
import BottomNav from "@/components/ui/BottomNav";
import StockDetailModal from "@/components/modals/StockDetailModal";
import SearchModal from "@/components/modals/SearchModal";
import PageTransition from "@/components/animations/PageTransition";
import SplashScreen from "@/components/screens/SplashScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import MobileFrame from "@/components/ui/MobileFrame";
import Presentation from "@/presentation/Presentation";
import { Stock } from "@/lib/stocks-data";
import { StockProvider } from "@/context/StockContext";

/* Tab ordering used to determine slide direction */
const TAB_ORDER = ["stocks", "watchlist", "portfolio", "more"];

export default function Home() {
  const [showPresentation, setShowPresentation] = useState(true);

  const handlePresentationComplete = useCallback(() => {
    setShowPresentation(false);
  }, []);

  const [screenMode, setScreenMode] = useState<"splash" | "onboarding" | "login" | "app">("splash");
  const [activeTab, setActiveTab] = useState("stocks");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(0);
  const prevTabRef = useRef("stocks");

  const handleTabChange = useCallback(
    (newTab: string) => {
      if (newTab === activeTab) return;

      const prevIdx = TAB_ORDER.indexOf(prevTabRef.current);
      const nextIdx = TAB_ORDER.indexOf(newTab);
      const dir = nextIdx > prevIdx ? 1 : -1;

      setTransitionDirection(dir);
      prevTabRef.current = newTab;
      setActiveTab(newTab);
    },
    [activeTab]
  );

  return (
    <StockProvider>
      {/* Fullscreen Presentation Overlay (before the app) */}
      {showPresentation && (
        <Presentation onComplete={handlePresentationComplete} />
      )}

      <MobileFrame>
        {/* 1. Splash Screen Mode */}
          {screenMode === "splash" && (
            <SplashScreen onComplete={() => setScreenMode("onboarding")} />
          )}

        {/* 2. Onboarding Screen Mode (3 Interactive Slides) */}
        {screenMode === "onboarding" && (
          <OnboardingScreen onFinish={() => setScreenMode("login")} />
        )}

        {/* 3. Login Screen Mode with Demo Credentials */}
        {screenMode === "login" && (
          <LoginScreen
            onLoginSuccess={() => setScreenMode("app")}
            onSkip={() => setScreenMode("app")}
          />
        )}

        {/* 4. Main App Mode */}
        {screenMode === "app" && (
          <div className="w-full flex-1 flex flex-col bg-white">
            {/* Sticky Header with Navbar & LightMarketTicker Bar */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
              <Navbar
                activeTab={activeTab}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenProfile={() => setProfileDrawerOpen(true)}
              />
              <LightMarketTicker />
            </div>

            {/* Dynamic View Router with GSAP Page Transitions */}
            <PageTransition activeKey={activeTab} direction={transitionDirection}>
              {activeTab === "stocks" && (
                <div className="pb-4 bg-white">
                  <RecentlyViewed onSelectStock={(stock) => setSelectedStock(stock)} />
                  <MostTraded onSelectStock={(stock) => setSelectedStock(stock)} />
                  <FinancialTools />
                  <TopMovers onSelectStock={(stock) => setSelectedStock(stock)} />
                  <TopIntraday onSelectStock={(stock) => setSelectedStock(stock)} />
                  <StocksInNews onSelectStock={(stock) => setSelectedStock(stock)} />
                </div>
              )}

              {activeTab === "watchlist" && (
                <WatchlistView
                  onSelectStock={(stock) => setSelectedStock(stock)}
                  onOpenSearch={() => setSearchOpen(true)}
                />
              )}

              {activeTab === "portfolio" && (
                <PortfolioView
                  onSelectStock={(stock) => setSelectedStock(stock)}
                />
              )}

              {activeTab === "more" && (
                <MoreView
                  onOpenProfile={() => setProfileDrawerOpen(true)}
                  profileDrawerOpen={profileDrawerOpen}
                  setProfileDrawerOpen={setProfileDrawerOpen}
                  onReplaySplash={() => setScreenMode("splash")}
                  onReplayOnboarding={() => setScreenMode("onboarding")}
                  onReplayLogin={() => setScreenMode("login")}
                />
              )}
            </PageTransition>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

            {/* Stock Detail Modal */}
            <StockDetailModal
              stock={selectedStock}
              onClose={() => setSelectedStock(null)}
            />

            {/* Search Modal */}
            <SearchModal
              isOpen={searchOpen}
              onClose={() => setSearchOpen(false)}
              onSelectStock={(stock) => setSelectedStock(stock)}
            />
          </div>
        )}
      </MobileFrame>
    </StockProvider>
  );
}
