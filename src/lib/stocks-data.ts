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
  { id: "hdfcbank", name: "HDFC Bank", symbol: "HDFCBANK", logo: "", logoBg: "bg-blue-800", price: 1842.30, change: 36.80, changePercent: 2.04, isPositive: true, marketCap: "$1.40T", peRatio: 19.8, high52w: 1960.00, low52w: 1420.00 },
  { id: "infy", name: "Infosys", symbol: "INFY", logo: "", logoBg: "bg-blue-600", price: 1625.45, change: -22.30, changePercent: -1.35, isPositive: false, marketCap: "$680.00B", peRatio: 28.4, high52w: 1780.00, low52w: 1250.00 },
  { id: "tcs", name: "TCS", symbol: "TCS", logo: "", logoBg: "bg-indigo-700", price: 3890.20, change: 78.40, changePercent: 2.06, isPositive: true, marketCap: "$1.42T", peRatio: 32.6, high52w: 4200.00, low52w: 3400.00 },
];

export const MOST_TRADED: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 362.59, change: 27.06, changePercent: 8.06, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 369.44, change: -19.80, changePercent: -5.08, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 382.10, change: 32.50, changePercent: 9.29, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 348.60, change: -12.40, changePercent: -3.43, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
  { id: "hdfcbank", name: "HDFC Bank", symbol: "HDFCBANK", logo: "", logoBg: "bg-blue-800", price: 1842.30, change: 36.80, changePercent: 2.04, isPositive: true, marketCap: "$1.40T", peRatio: 19.8, high52w: 1960.00, low52w: 1420.00 },
  { id: "wipro", name: "Wipro", symbol: "WIPRO", logo: "", logoBg: "bg-purple-700", price: 478.90, change: -8.60, changePercent: -1.76, isPositive: false, marketCap: "$250.00B", peRatio: 22.1, high52w: 540.00, low52w: 380.00 },
  { id: "bajfinance", name: "Bajaj Finance", symbol: "BAJFINANCE", logo: "", logoBg: "bg-sky-800", price: 7245.60, change: 145.20, changePercent: 2.05, isPositive: true, marketCap: "$4.48T", peRatio: 35.2, high52w: 8200.00, low52w: 6100.00 },
  { id: "sbin", name: "SBI", symbol: "SBIN", logo: "", logoBg: "bg-blue-700", price: 842.15, change: 18.90, changePercent: 2.30, isPositive: true, marketCap: "$752.00B", peRatio: 10.2, high52w: 920.00, low52w: 680.00 },
];

export const TOP_GAINERS: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 359.39, change: 27.74, changePercent: 8.36, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 381.95, change: 30.15, changePercent: 8.57, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "reliance", name: "Reliance", symbol: "RELIANCE", logo: "", logoBg: "bg-amber-600", price: 1420.50, change: 85.20, changePercent: 6.38, isPositive: true, marketCap: "$1.92T", peRatio: 26.5, high52w: 1600.00, low52w: 1200.00 },
  { id: "titan", name: "Titan", symbol: "TITAN", logo: "", logoBg: "bg-amber-700", price: 3420.80, change: 112.50, changePercent: 3.40, isPositive: true, marketCap: "$3.04T", peRatio: 72.5, high52w: 3680.00, low52w: 2800.00 },
  { id: "bhartiartl", name: "Bharti Airtel", symbol: "BHARTIARTL", logo: "", logoBg: "bg-red-600", price: 1580.25, change: 62.40, changePercent: 4.11, isPositive: true, marketCap: "$940.00B", peRatio: 42.8, high52w: 1700.00, low52w: 1150.00 },
  { id: "maruti", name: "Maruti Suzuki", symbol: "MARUTI", logo: "", logoBg: "bg-blue-900", price: 12450.70, change: 385.60, changePercent: 3.20, isPositive: true, marketCap: "$3.80T", peRatio: 28.9, high52w: 13200.00, low52w: 9800.00 },
  { id: "sunpharma", name: "Sun Pharma", symbol: "SUNPHARMA", logo: "", logoBg: "bg-orange-600", price: 1685.40, change: 48.20, changePercent: 2.94, isPositive: true, marketCap: "$404.00B", peRatio: 36.8, high52w: 1850.00, low52w: 1280.00 },
];

export const TOP_LOSERS: Stock[] = [
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 368.37, change: -16.20, changePercent: -4.21, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 345.10, change: -8.90, changePercent: -2.51, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
  { id: "pw", name: "PW", symbol: "PW", logo: "", logoBg: "bg-slate-950", price: 312.40, change: -6.20, changePercent: -1.94, isPositive: false, marketCap: "$22.10B", peRatio: 45.6, high52w: 360.00, low52w: 210.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
  { id: "wipro", name: "Wipro", symbol: "WIPRO", logo: "", logoBg: "bg-purple-700", price: 478.90, change: -8.60, changePercent: -1.76, isPositive: false, marketCap: "$250.00B", peRatio: 22.1, high52w: 540.00, low52w: 380.00 },
  { id: "infy", name: "Infosys", symbol: "INFY", logo: "", logoBg: "bg-blue-600", price: 1625.45, change: -22.30, changePercent: -1.35, isPositive: false, marketCap: "$680.00B", peRatio: 28.4, high52w: 1780.00, low52w: 1250.00 },
  { id: "nestleind", name: "Nestle India", symbol: "NESTLEIND", logo: "", logoBg: "bg-sky-500", price: 2380.90, change: -68.40, changePercent: -2.79, isPositive: false, marketCap: "$2.30T", peRatio: 68.4, high52w: 2680.00, low52w: 2050.00 },
  { id: "adanient", name: "Adani Ent.", symbol: "ADANIENT", logo: "", logoBg: "bg-blue-950", price: 2945.30, change: -124.60, changePercent: -4.06, isPositive: false, marketCap: "$3.36T", peRatio: 58.2, high52w: 3500.00, low52w: 2100.00 },
];

export const TOP_INTRADAY: Stock[] = [
  { id: "redington", name: "Redington", symbol: "REDINGTON", logo: "", logoBg: "bg-emerald-600", price: 362.59, change: 27.06, changePercent: 8.06, isPositive: true, marketCap: "$14.25B", peRatio: 18.5, high52w: 395.00, low52w: 240.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logo: "", logoBg: "bg-emerald-500", price: 369.44, change: -19.80, changePercent: -5.08, isPositive: false, marketCap: "$18.90B", peRatio: 24.2, high52w: 420.00, low52w: 290.00 },
  { id: "bluestone", name: "BlueStone", symbol: "BLUESTONE", logo: "", logoBg: "bg-blue-600", price: 382.10, change: 32.50, changePercent: 9.29, isPositive: true, marketCap: "$9.80B", peRatio: 32.1, high52w: 410.00, low52w: 250.00 },
  { id: "ather", name: "Ather", symbol: "ATHER", logo: "", logoBg: "bg-slate-900", price: 348.60, change: -12.40, changePercent: -3.43, isPositive: false, marketCap: "$12.40B", peRatio: 21.0, high52w: 380.00, low52w: 260.00 },
  { id: "bajfinance", name: "Bajaj Finance", symbol: "BAJFINANCE", logo: "", logoBg: "bg-sky-800", price: 7245.60, change: 145.20, changePercent: 2.05, isPositive: true, marketCap: "$4.48T", peRatio: 35.2, high52w: 8200.00, low52w: 6100.00 },
  { id: "icicibank", name: "ICICI Bank", symbol: "ICICIBANK", logo: "", logoBg: "bg-orange-700", price: 1245.80, change: 28.60, changePercent: 2.35, isPositive: true, marketCap: "$880.00B", peRatio: 18.6, high52w: 1380.00, low52w: 980.00 },
  { id: "hcltech", name: "HCL Tech", symbol: "HCLTECH", logo: "", logoBg: "bg-blue-500", price: 1520.65, change: -32.40, changePercent: -2.09, isPositive: false, marketCap: "$412.00B", peRatio: 24.8, high52w: 1720.00, low52w: 1180.00 },
  { id: "ltim", name: "LTIMindtree", symbol: "LTIM", logo: "", logoBg: "bg-indigo-800", price: 5680.40, change: 168.20, changePercent: 3.05, isPositive: true, marketCap: "$1.68T", peRatio: 38.4, high52w: 6200.00, low52w: 4500.00 },
];

export const STOCKS_IN_NEWS: Stock[] = [
  { id: "unionbank", name: "Union Bank", symbol: "UNIONBANK", logo: "", logoBg: "bg-rose-600", price: 378.64, change: 21.40, changePercent: 5.99, isPositive: true, marketCap: "$84.50B", peRatio: 8.4, high52w: 430.00, low52w: 280.00 },
  { id: "tatamotors", name: "Tata Motors", symbol: "TATAMOTORS", logo: "", logoBg: "bg-sky-600", price: 366.78, change: -14.50, changePercent: -3.80, isPositive: false, marketCap: "$340.00B", peRatio: 12.8, high52w: 450.00, low52w: 310.00 },
  { id: "pw", name: "PW", symbol: "PW", logo: "", logoBg: "bg-slate-950", price: 312.40, change: -6.20, changePercent: -1.94, isPositive: false, marketCap: "$22.10B", peRatio: 45.6, high52w: 360.00, low52w: 210.00 },
  { id: "reliance", name: "Reliance", symbol: "RELIANCE", logo: "", logoBg: "bg-amber-600", price: 1420.50, change: 85.20, changePercent: 6.38, isPositive: true, marketCap: "$1.92T", peRatio: 26.5, high52w: 1600.00, low52w: 1200.00 },
  { id: "adanient", name: "Adani Ent.", symbol: "ADANIENT", logo: "", logoBg: "bg-blue-950", price: 2945.30, change: -124.60, changePercent: -4.06, isPositive: false, marketCap: "$3.36T", peRatio: 58.2, high52w: 3500.00, low52w: 2100.00 },
  { id: "bhartiartl", name: "Bharti Airtel", symbol: "BHARTIARTL", logo: "", logoBg: "bg-red-600", price: 1580.25, change: 62.40, changePercent: 4.11, isPositive: true, marketCap: "$940.00B", peRatio: 42.8, high52w: 1700.00, low52w: 1150.00 },
  { id: "tcs", name: "TCS", symbol: "TCS", logo: "", logoBg: "bg-indigo-700", price: 3890.20, change: 78.40, changePercent: 2.06, isPositive: true, marketCap: "$1.42T", peRatio: 32.6, high52w: 4200.00, low52w: 3400.00 },
  { id: "titan", name: "Titan", symbol: "TITAN", logo: "", logoBg: "bg-amber-700", price: 3420.80, change: 112.50, changePercent: 3.40, isPositive: true, marketCap: "$3.04T", peRatio: 72.5, high52w: 3680.00, low52w: 2800.00 },
];

export const PORTFOLIO_HOLDINGS: PortfolioHolding[] = [
  { id: "redington", name: "Redington Ltd", symbol: "REDINGTON", logoBg: "bg-emerald-600", quantity: 150, avgPrice: 280.00, currentPrice: 359.39, investedValue: 42000.00, currentValue: 53908.50, totalReturns: 11908.50, totalReturnsPercent: 28.35, dayReturns: 4161.00 },
  { id: "pinelabs", name: "Pine Labs", symbol: "PINELABS", logoBg: "bg-emerald-500", quantity: 80, avgPrice: 390.00, currentPrice: 368.37, investedValue: 31200.00, currentValue: 29469.60, totalReturns: -1730.40, totalReturnsPercent: -5.55, dayReturns: -1296.00 },
  { id: "bluestone", name: "BlueStone Jewellery", symbol: "BLUESTONE", logoBg: "bg-blue-600", quantity: 45, avgPrice: 310.00, currentPrice: 381.95, investedValue: 13950.00, currentValue: 17187.75, totalReturns: 3237.75, totalReturnsPercent: 23.21, dayReturns: 1356.75 },
  { id: "hdfcbank", name: "HDFC Bank", symbol: "HDFCBANK", logoBg: "bg-blue-800", quantity: 25, avgPrice: 1680.00, currentPrice: 1842.30, investedValue: 42000.00, currentValue: 46057.50, totalReturns: 4057.50, totalReturnsPercent: 9.66, dayReturns: 920.00 },
  { id: "tcs", name: "TCS", symbol: "TCS", logoBg: "bg-indigo-700", quantity: 12, avgPrice: 3650.00, currentPrice: 3890.20, investedValue: 43800.00, currentValue: 46682.40, totalReturns: 2882.40, totalReturnsPercent: 6.58, dayReturns: 940.80 },
  { id: "infy", name: "Infosys", symbol: "INFY", logoBg: "bg-blue-600", quantity: 35, avgPrice: 1720.00, currentPrice: 1625.45, investedValue: 60200.00, currentValue: 56890.75, totalReturns: -3309.25, totalReturnsPercent: -5.50, dayReturns: -780.50 },
  { id: "titan", name: "Titan", symbol: "TITAN", logoBg: "bg-amber-700", quantity: 10, avgPrice: 3150.00, currentPrice: 3420.80, investedValue: 31500.00, currentValue: 34208.00, totalReturns: 2708.00, totalReturnsPercent: 8.60, dayReturns: 1125.00 },
];

export const ACTIVE_SIPS: SIPItem[] = [
  { id: "sip-1", fundName: "Vanguard S&P 500 Index Fund", monthlyAmount: 500, nextDate: "15 Aug 2026", status: "Active" },
  { id: "sip-2", fundName: "Fidelity Nasdaq 100 Index Fund", monthlyAmount: 300, nextDate: "20 Aug 2026", status: "Active" },
  { id: "sip-3", fundName: "HDFC Mid-Cap Opportunities", monthlyAmount: 2000, nextDate: "10 Aug 2026", status: "Active" },
  { id: "sip-4", fundName: "Axis Bluechip Fund", monthlyAmount: 1500, nextDate: "5 Sep 2026", status: "Active" },
];

export const FINANCIAL_TOOLS: FinancialTool[] = [
  { id: "events", name: "Events", iconName: "Calendar", category: "Market", description: "Upcoming IPOs, earnings calls, & dividends" },
  { id: "screener", name: "Screener", iconName: "Filter", category: "Analysis", description: "Filter 5000+ stocks by P/E ratio, market cap, & growth" },
  { id: "baskets", name: "Baskets", iconName: "ShoppingBag", category: "Investing", description: "Curated stock portfolios by expert research" },
  { id: "intraday", name: "Intraday", iconName: "Zap", category: "Trading", description: "High-momentum intraday picks with stop-loss" },
  { id: "ipo", name: "IPOs", iconName: "Rocket", category: "Primary Market", description: "Apply to ongoing and upcoming mainboard IPOs" },
  { id: "etfs", name: "ETFs", iconName: "Layers", category: "Indices", description: "Low-cost index tracking Exchange Traded Funds" },
];
