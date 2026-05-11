export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  volume: number;
  openPrice: number;
  closePrice: number;
  peRatio: number;
  pbRatio: number;
  roe: number;
  change: number;
  changePercent: number;
}

export interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicators {
  rsi: number[];
  macd: { value: number; signal: number; histogram: number }[];
  sma50: number[];
  sma200: number[];
}

export const WIG20_STOCKS: Stock[] = [
  {
    symbol: "PKO",
    name: "PKO Bank Polski",
    currentPrice: 48.25,
    volume: 2150000,
    openPrice: 47.80,
    closePrice: 48.10,
    peRatio: 8.5,
    pbRatio: 1.2,
    roe: 12.3,
    change: 0.45,
    changePercent: 0.94,
  },
  {
    symbol: "PZU",
    name: "PZU",
    currentPrice: 42.15,
    volume: 1850000,
    openPrice: 42.50,
    closePrice: 42.00,
    peRatio: 7.8,
    pbRatio: 1.1,
    roe: 11.5,
    change: -0.35,
    changePercent: -0.82,
  },
  {
    symbol: "PGE",
    name: "PGE Polska Grupa Energetyczna",
    currentPrice: 8.92,
    volume: 3200000,
    openPrice: 8.75,
    closePrice: 8.88,
    peRatio: 15.2,
    pbRatio: 0.8,
    roe: 5.2,
    change: 0.17,
    changePercent: 1.94,
  },
  {
    symbol: "KGHM",
    name: "KGHM Polska Miedź",
    currentPrice: 125.40,
    volume: 980000,
    openPrice: 123.50,
    closePrice: 124.80,
    peRatio: 12.4,
    pbRatio: 1.5,
    roe: 9.8,
    change: 1.90,
    changePercent: 1.54,
  },
  {
    symbol: "PKNORLEN",
    name: "PKN Orlen",
    currentPrice: 54.30,
    volume: 1650000,
    openPrice: 54.80,
    closePrice: 54.00,
    peRatio: 6.9,
    pbRatio: 0.9,
    roe: 13.1,
    change: -0.50,
    changePercent: -0.91,
  },
  {
    symbol: "ALIOR",
    name: "Alior Bank",
    currentPrice: 78.50,
    volume: 720000,
    openPrice: 77.20,
    closePrice: 78.00,
    peRatio: 9.2,
    pbRatio: 1.3,
    roe: 10.5,
    change: 1.30,
    changePercent: 1.68,
  },
  {
    symbol: "CCC",
    name: "CCC",
    currentPrice: 95.80,
    volume: 540000,
    openPrice: 94.50,
    closePrice: 95.20,
    peRatio: 18.5,
    pbRatio: 2.1,
    roe: 8.7,
    change: 1.30,
    changePercent: 1.37,
  },
  {
    symbol: "CDPROJEKT",
    name: "CD Projekt",
    currentPrice: 185.20,
    volume: 1250000,
    openPrice: 182.50,
    closePrice: 184.00,
    peRatio: 22.3,
    pbRatio: 3.2,
    roe: 15.4,
    change: 3.70,
    changePercent: 2.04,
  },
  {
    symbol: "CYFRPLSAT",
    name: "Cyfrowy Polsat",
    currentPrice: 12.45,
    volume: 1850000,
    openPrice: 12.30,
    closePrice: 12.38,
    peRatio: 11.8,
    pbRatio: 1.6,
    roe: 9.2,
    change: 0.15,
    changePercent: 1.22,
  },
  {
    symbol: "DINOPL",
    name: "Dino Polska",
    currentPrice: 385.00,
    volume: 420000,
    openPrice: 380.50,
    closePrice: 383.20,
    peRatio: 28.5,
    pbRatio: 5.8,
    roe: 22.5,
    change: 4.50,
    changePercent: 1.18,
  },
  {
    symbol: "JSW",
    name: "Jastrzębska Spółka Węglowa",
    currentPrice: 28.75,
    volume: 1120000,
    openPrice: 28.20,
    closePrice: 28.50,
    peRatio: 5.2,
    pbRatio: 0.7,
    roe: 14.8,
    change: 0.55,
    changePercent: 1.95,
  },
  {
    symbol: "LPP",
    name: "LPP",
    currentPrice: 14250.00,
    volume: 12000,
    openPrice: 14100.00,
    closePrice: 14200.00,
    peRatio: 21.5,
    pbRatio: 4.2,
    roe: 18.3,
    change: 150.00,
    changePercent: 1.06,
  },
  {
    symbol: "LOTOS",
    name: "Grupa Lotos",
    currentPrice: 68.40,
    volume: 890000,
    openPrice: 67.80,
    closePrice: 68.10,
    peRatio: 8.7,
    pbRatio: 1.1,
    roe: 11.2,
    change: 0.60,
    changePercent: 0.88,
  },
  {
    symbol: "MBANK",
    name: "mBank",
    currentPrice: 520.50,
    volume: 165000,
    openPrice: 515.00,
    closePrice: 518.00,
    peRatio: 10.3,
    pbRatio: 1.4,
    roe: 12.8,
    change: 5.50,
    changePercent: 1.07,
  },
  {
    symbol: "ORANGEPL",
    name: "Orange Polska",
    currentPrice: 7.85,
    volume: 2850000,
    openPrice: 7.75,
    closePrice: 7.80,
    peRatio: 13.2,
    pbRatio: 1.0,
    roe: 7.5,
    change: 0.10,
    changePercent: 1.29,
  },
  {
    symbol: "PEKAO",
    name: "Bank Pekao",
    currentPrice: 165.80,
    volume: 580000,
    openPrice: 164.20,
    closePrice: 165.00,
    peRatio: 9.8,
    pbRatio: 1.5,
    roe: 13.5,
    change: 1.60,
    changePercent: 0.97,
  },
  {
    symbol: "PGN",
    name: "Polskie Górnictwo Naftowe i Gazownictwo",
    currentPrice: 5.62,
    volume: 4200000,
    openPrice: 5.55,
    closePrice: 5.58,
    peRatio: 14.5,
    pbRatio: 0.9,
    roe: 6.2,
    change: 0.07,
    changePercent: 1.26,
  },
  {
    symbol: "SANPL",
    name: "Santander Bank Polska",
    currentPrice: 425.00,
    volume: 245000,
    openPrice: 420.50,
    closePrice: 423.00,
    peRatio: 11.2,
    pbRatio: 1.6,
    roe: 14.2,
    change: 4.50,
    changePercent: 1.07,
  },
  {
    symbol: "TAURONPE",
    name: "Tauron Polska Energia",
    currentPrice: 1.82,
    volume: 5800000,
    openPrice: 1.78,
    closePrice: 1.80,
    peRatio: 8.5,
    pbRatio: 0.5,
    roe: 4.8,
    change: 0.04,
    changePercent: 2.25,
  },
  {
    symbol: "TPE",
    name: "Tauron Polska Energia (TPE)",
    currentPrice: 3.45,
    volume: 3200000,
    openPrice: 3.38,
    closePrice: 3.42,
    peRatio: 9.8,
    pbRatio: 0.7,
    roe: 5.5,
    change: 0.07,
    changePercent: 2.07,
  },
];

export function generateCandlestickData(
  basePrice: number,
  days: number = 90
): CandlestickData[] {
  const data: CandlestickData[] = [];
  let price = basePrice * 0.9;

  for (let i = 0; i < days; i++) {
    const open = price;
    const volatility = 0.03;
    const change = (Math.random() - 0.48) * price * volatility;
    const close = open + change;
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    const volume = Math.floor(Math.random() * 2000000) + 500000;

    data.push({
      timestamp: Date.now() - (days - i) * 24 * 60 * 60 * 1000,
      open,
      high,
      low,
      close,
      volume,
    });

    price = close;
  }

  return data;
}

export function calculateTechnicalIndicators(
  candleData: CandlestickData[]
): TechnicalIndicators {
  const closes = candleData.map((c) => c.close);

  const rsi = closes.map((_, i) => {
    if (i < 14) return 50;
    const gains = [];
    const losses = [];
    for (let j = i - 13; j <= i; j++) {
      const change = closes[j] - closes[j - 1];
      if (change > 0) gains.push(change);
      else losses.push(Math.abs(change));
    }
    const avgGain = gains.reduce((a, b) => a + b, 0) / 14;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / 14;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  });

  const ema12 = calculateEMA(closes, 12);
  const ema26 = calculateEMA(closes, 26);
  const macdLine = ema12.map((v, i) => v - ema26[i]);
  const signal = calculateEMA(macdLine, 9);
  const macd = macdLine.map((v, i) => ({
    value: v,
    signal: signal[i],
    histogram: v - signal[i],
  }));

  const sma50 = closes.map((_, i) => {
    if (i < 49) return closes[i];
    return closes.slice(i - 49, i + 1).reduce((a, b) => a + b, 0) / 50;
  });

  const sma200 = closes.map((_, i) => {
    if (i < 199) return closes[i];
    return closes.slice(i - 199, i + 1).reduce((a, b) => a + b, 0) / 200;
  });

  return { rsi, macd, sma50, sma200 };
}

function calculateEMA(data: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const ema: number[] = [data[0]];

  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k));
  }

  return ema;
}
