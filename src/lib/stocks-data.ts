export interface Stock {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  logoBg: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  marketCap?: string;
  peRatio?: number;
  high52w?: number;
  low52w?: number;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  symbol: string;
  logoBg: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  investedValue: number;
  currentValue: number;
  totalReturns: number;
  totalReturnsPercent: number;
  dayReturns: number;
}

export interface SIPItem {
  id: string;
  fundName: string;
  monthlyAmount: number;
  nextDate: string;
  status: string;
}

export interface FinancialTool {
  id: string;
  name: string;
  iconName: string;
  icon?: string;
  category: string;
  description: string;
}

// Stock Data in USD Currency ($)

export const RECENTLY_VIEWED: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 359.39, change: 27.74, changePercent: 8.36, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 368.37, change: -16.20, changePercent: -4.21, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 381.95, change: 30.15, changePercent: 8.57, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 345.10, change: -8.90, changePercent: -2.51, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
  { id: "pw", name: "PW", symbol: "PW", logo: "", logoBg: "bg-slate-950", price: 312.40, change: -6.20, changePercent: -1.94, isPositive: false, marketCap: "$22.10B", peRatio: 45.6, high52w: 360.00, low52w: 210.00 },
];

export const MOST_TRADED: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 362.59, change: 27.06, changePercent: 8.06, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 369.44, change: -19.80, changePercent: -5.08, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 382.10, change: 32.50, changePercent: 9.29, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 348.60, change: -12.40, changePercent: -3.43, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
];

export const TOP_GAINERS: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 359.39, change: 27.74, changePercent: 8.36, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 381.95, change: 30.15, changePercent: 8.57, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "reliance", name: "Reliance", symbol: "RELIANCE", logo: "", logoBg: "bg-amber-600", price: 1420.50, change: 85.20, changePercent: 6.38, isPositive: true, marketCap: "$1.92T", peRatio: 26.5, high52w: 1600.00, low52w: 1200.00 },
];

export const TOP_LOSERS: Stock[] = [
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 368.37, change: -16.20, changePercent: -4.21, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 345.10, change: -8.90, changePercent: -2.51, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
  { id: "pw", name: "PW", symbol: "PW", logo: "", logoBg: "bg-slate-950", price: 312.40, change: -6.20, changePercent: -1.94, isPositive: false, marketCap: "$22.10B", peRatio: 45.6, high52w: 360.00, low52w: 210.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
];

export const TOP_INTRADAY: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 362.59, change: 27.06, changePercent: 8.06, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 369.44, change: -19.80, changePercent: -5.08, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 382.10, change: 32.50, changePercent: 9.29, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 348.60, change: -12.40, changePercent: -3.43, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
];

export const STOCKS_IN_NEWS: Stock[] = [
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
  { id: "pw", name: "PW", symbol: "PW", logo: "", logoBg: "bg-slate-950", price: 312.40, change: -6.20, changePercent: -1.94, isPositive: false, marketCap: "$22.10B", peRatio: 45.6, high52w: 360.00, low52w: 210.00 },
  { id: "reliance", name: "Reliance", symbol: "RELIANCE", logo: "", logoBg: "bg-amber-600", price: 1420.50, change: 85.20, changePercent: 6.38, isPositive: true, marketCap: "$1.92T", peRatio: 26.5, high52w: 1600.00, low52w: 1200.00 },
];

export const PORTFOLIO_HOLDINGS: PortfolioHolding[] = [
  { id: "redington", name: "Redington Ltd", symbol: "REDINGTON", logoBg: "bg-emerald-600", quantity: 150, avgPrice: 280.00, currentPrice: 359.39, investedValue: 42000.00, currentValue: 53908.50, totalReturns: 11908.50, totalReturnsPercent: 28.35, dayReturns: 4161.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logoBg: "bg-emerald-500", quantity: 80, avgPrice: 390.00, currentPrice: 368.37, investedValue: 31200.00, currentValue: 29469.60, totalReturns: -1730.40, totalReturnsPercent: -5.55, dayReturns: -1296.00 },
  { id: "bluestone", name: "BlueStone Jewellery", symbol: "BLUESTONE", logoBg: "bg-blue-600", quantity: 45, avgPrice: 310.00, currentPrice: 381.95, investedValue: 13950.00, currentValue: 17187.75, totalReturns: 3237.75, totalReturnsPercent: 23.21, dayReturns: 1356.75 },
];

export const ACTIVE_SIPS: SIPItem[] = [
  { id: "sip-1", fundName: "Vanguard S&P 500 Index Fund", monthlyAmount: 500, nextDate: "15 Aug 2026", status: "Active" },
  { id: "sip-2", fundName: "Fidelity Nasdaq 100 Index Fund", monthlyAmount: 300, nextDate: "20 Aug 2026", status: "Active" },
];

export const FINANCIAL_TOOLS: FinancialTool[] = [
  { id: "events", name: "Events", iconName: "Calendar", category: "Market", description: "Upcoming IPOs, earnings calls, & dividends" },
  { id: "screener", name: "Screener", iconName: "Filter", category: "Analysis", description: "Filter 5000+ stocks by P/E ratio, market cap, & growth" },
  { id: "baskets", name: "Baskets", iconName: "ShoppingBag", category: "Investing", description: "Curated stock portfolios by expert research" },
  { id: "intraday", name: "Intraday", iconName: "Zap", category: "Trading", description: "High-momentum intraday picks with stop-loss" },
  { id: "ipo", name: "IPOs", iconName: "Rocket", category: "Primary Market", description: "Apply to ongoing and upcoming mainboard IPOs" },
  { id: "etfs", name: "ETFs", iconName: "Layers", category: "Indices", description: "Low-cost index tracking Exchange Traded Funds" },
];
