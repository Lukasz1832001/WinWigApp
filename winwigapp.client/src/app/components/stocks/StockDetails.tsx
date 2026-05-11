import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { WIG20_STOCKS, generateCandlestickData, calculateTechnicalIndicators } from "../../data/mockData";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  ShoppingCart,
} from "lucide-react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { BuyModal } from "./BuyModal";

type TimeInterval = "1D" | "1W" | "1M" | "3M" | "1Y";

export function StockDetails() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>("1M");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"chart" | "technical">("chart");

  const stock = WIG20_STOCKS.find((s) => s.symbol === symbol);

  const candleData = useMemo(() => {
    if (!stock) return [];
    const days = selectedInterval === "1D" ? 1 : selectedInterval === "1W" ? 7 : selectedInterval === "1M" ? 30 : selectedInterval === "3M" ? 90 : 252;
    return generateCandlestickData(stock.currentPrice, days);
  }, [stock, selectedInterval]);

  const technicalIndicators = useMemo(() => {
    if (candleData.length === 0) return null;
    return calculateTechnicalIndicators(candleData);
  }, [candleData]);

  const chartData = useMemo(() => {
    return candleData.map((candle, index) => ({
      date: new Date(candle.timestamp).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
      }),
      price: candle.close,
      high: candle.high,
      low: candle.low,
      open: candle.open,
      close: candle.close,
      volume: candle.volume,
      candleColor: candle.close >= candle.open ? "#10b981" : "#ef4444",
    }));
  }, [candleData]);

  const rsiData = useMemo(() => {
    if (!technicalIndicators) return [];
    return candleData.map((candle, index) => ({
      date: new Date(candle.timestamp).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
      }),
      rsi: technicalIndicators.rsi[index],
    }));
  }, [candleData, technicalIndicators]);

  const macdData = useMemo(() => {
    if (!technicalIndicators) return [];
    return candleData.map((candle, index) => ({
      date: new Date(candle.timestamp).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
      }),
      macd: technicalIndicators.macd[index]?.value || 0,
      signal: technicalIndicators.macd[index]?.signal || 0,
      histogram: technicalIndicators.macd[index]?.histogram || 0,
    }));
  }, [candleData, technicalIndicators]);

  if (!stock) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Nie znaleziono spółki</p>
        <Link to="/" className="text-emerald-500 hover:text-emerald-400">
          Wróć do listy
        </Link>
      </div>
    );
  }

  const intervals: TimeInterval[] = ["1D", "1W", "1M", "3M", "1Y"];

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Powrót do listy
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{stock.symbol}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stock.changePercent >= 0
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-400">{stock.name}</p>
          </div>

          <button
            onClick={() => setShowBuyModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            Kup / Sprzedaj
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Aktualny kurs</div>
          <div className="text-2xl font-bold text-white">
            {stock.currentPrice.toLocaleString("pl-PL", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            PLN
          </div>
          <div
            className={`flex items-center gap-1 mt-2 text-sm ${
              stock.changePercent >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {stock.changePercent >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {stock.change >= 0 ? "+" : ""}
            {stock.change.toFixed(2)} PLN
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Wolumen</div>
          <div className="text-xl font-bold text-white">
            {stock.volume.toLocaleString("pl-PL")}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">P/E</div>
          <div className="text-xl font-bold text-white">{stock.peRatio.toFixed(2)}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">ROE</div>
          <div className="text-xl font-bold text-white">{stock.roe.toFixed(2)}%</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("chart")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "chart"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Wykres świecowy
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "technical"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              Analiza techniczna
            </button>
          </div>

          <div className="flex gap-2">
            {intervals.map((interval) => (
              <button
                key={interval}
                onClick={() => setSelectedInterval(interval)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  selectedInterval === interval
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {interval}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "chart" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-medium mb-4">Wykres ceny</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Wolumen</h3>
              <ResponsiveContainer width="100%" height={150}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="volume" fill="#3b82f6" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "technical" && technicalIndicators && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-medium mb-4">
                RSI (Relative Strength Index)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={rsiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Line type="monotone" dataKey="rsi" stroke="#8b5cf6" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey={() => 70}
                    stroke="#ef4444"
                    strokeDasharray="5 5"
                    strokeWidth={1}
                  />
                  <Line
                    type="monotone"
                    dataKey={() => 30}
                    stroke="#10b981"
                    strokeDasharray="5 5"
                    strokeWidth={1}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 text-sm text-gray-400">
                Aktualna wartość RSI:{" "}
                <span className="text-white font-medium">
                  {rsiData[rsiData.length - 1]?.rsi.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">MACD</h3>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={macdData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="histogram" fill="#6366f1" />
                  <Line type="monotone" dataKey="macd" stroke="#10b981" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="signal"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Średnie kroczące (SMA)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData.map((d, i) => ({
                  ...d,
                  sma50: technicalIndicators.sma50[i],
                  sma200: technicalIndicators.sma200[i],
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Cena"
                  />
                  <Line
                    type="monotone"
                    dataKey="sma50"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="SMA 50"
                  />
                  <Line
                    type="monotone"
                    dataKey="sma200"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="SMA 200"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {showBuyModal && (
        <BuyModal stock={stock} onClose={() => setShowBuyModal(false)} />
      )}
    </div>
  );
}
