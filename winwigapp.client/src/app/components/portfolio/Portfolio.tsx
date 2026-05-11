import { useState, useEffect } from "react";
import { Link } from "react-router";
import { WIG20_STOCKS } from "../../data/mockData";
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface PortfolioPosition {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  stopLoss: number | null;
}

export function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>([]);
  const [editingStopLoss, setEditingStopLoss] = useState<string | null>(null);
  const [newStopLoss, setNewStopLoss] = useState<string>("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = () => {
    const data = JSON.parse(localStorage.getItem("portfolio") || "[]");
    setPortfolio(data);
  };

  const calculatePositionValue = (position: PortfolioPosition) => {
    const stock = WIG20_STOCKS.find((s) => s.symbol === position.symbol);
    if (!stock) return 0;
    return stock.currentPrice * position.quantity;
  };

  const calculatePositionProfit = (position: PortfolioPosition) => {
    const stock = WIG20_STOCKS.find((s) => s.symbol === position.symbol);
    if (!stock) return { value: 0, percent: 0 };
    const currentValue = stock.currentPrice * position.quantity;
    const investedValue = position.avgPrice * position.quantity;
    const value = currentValue - investedValue;
    const percent = ((stock.currentPrice - position.avgPrice) / position.avgPrice) * 100;
    return { value, percent };
  };

  const getTotalPortfolioValue = () => {
    return portfolio.reduce((sum, position) => sum + calculatePositionValue(position), 0);
  };

  const getTotalInvestedValue = () => {
    return portfolio.reduce((sum, position) => sum + position.avgPrice * position.quantity, 0);
  };

  const getTotalProfit = () => {
    return getTotalPortfolioValue() - getTotalInvestedValue();
  };

  const getTotalProfitPercent = () => {
    const invested = getTotalInvestedValue();
    if (invested === 0) return 0;
    return (getTotalProfit() / invested) * 100;
  };

  const handleUpdateStopLoss = (symbol: string) => {
    const stopLossValue = parseFloat(newStopLoss);
    if (isNaN(stopLossValue) || stopLossValue <= 0) {
      toast.error("Podaj prawidłową wartość stop loss");
      return;
    }

    const updatedPortfolio = portfolio.map((p) =>
      p.symbol === symbol ? { ...p, stopLoss: stopLossValue } : p
    );
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    setEditingStopLoss(null);
    setNewStopLoss("");
    toast.success("Zaktualizowano stop loss");
  };

  const handleRemoveStopLoss = (symbol: string) => {
    const updatedPortfolio = portfolio.map((p) =>
      p.symbol === symbol ? { ...p, stopLoss: null } : p
    );
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    toast.success("Usunięto stop loss");
  };

  const totalValue = getTotalPortfolioValue();
  const totalInvested = getTotalInvestedValue();
  const totalProfit = getTotalProfit();
  const totalProfitPercent = getTotalProfitPercent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Mój Portfel</h1>
        <p className="text-gray-400 mt-1">Przegląd Twoich inwestycji</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-2">Wartość portfela</div>
          <div className="text-3xl font-bold text-white">
            {totalValue.toLocaleString("pl-PL", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            PLN
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-2">Zainwestowano</div>
          <div className="text-3xl font-bold text-white">
            {totalInvested.toLocaleString("pl-PL", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            PLN
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-2">Zysk/Strata</div>
          <div
            className={`text-3xl font-bold ${
              totalProfit >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {totalProfit >= 0 ? "+" : ""}
            {totalProfit.toLocaleString("pl-PL", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            PLN
          </div>
          <div
            className={`text-sm mt-1 ${
              totalProfitPercent >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {totalProfitPercent >= 0 ? "+" : ""}
            {totalProfitPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Pozycje
        </h2>

        {portfolio.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Twój portfel jest pusty</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Przeglądaj spółki
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400">Spółka</th>
                  <th className="text-right py-3 px-4 text-gray-400">Ilość</th>
                  <th className="text-right py-3 px-4 text-gray-400">Śr. cena</th>
                  <th className="text-right py-3 px-4 text-gray-400">Akt. cena</th>
                  <th className="text-right py-3 px-4 text-gray-400">Wartość</th>
                  <th className="text-right py-3 px-4 text-gray-400">Zysk/Strata</th>
                  <th className="text-right py-3 px-4 text-gray-400">Stop Loss</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((position) => {
                  const stock = WIG20_STOCKS.find((s) => s.symbol === position.symbol);
                  if (!stock) return null;
                  const profit = calculatePositionProfit(position);
                  const value = calculatePositionValue(position);

                  return (
                    <tr
                      key={position.symbol}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <Link
                          to={`/stock/${position.symbol}`}
                          className="hover:text-emerald-500 transition-colors"
                        >
                          <div className="font-medium text-white">{position.symbol}</div>
                          <div className="text-sm text-gray-400">{position.name}</div>
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-right text-white">
                        {position.quantity}
                      </td>
                      <td className="py-4 px-4 text-right text-white">
                        {position.avgPrice.toFixed(2)} PLN
                      </td>
                      <td className="py-4 px-4 text-right text-white">
                        {stock.currentPrice.toFixed(2)} PLN
                      </td>
                      <td className="py-4 px-4 text-right text-white font-medium">
                        {value.toFixed(2)} PLN
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div
                          className={`${
                            profit.value >= 0 ? "text-emerald-500" : "text-red-500"
                          }`}
                        >
                          <div className="flex items-center justify-end gap-1">
                            {profit.value >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="font-medium">
                              {profit.value >= 0 ? "+" : ""}
                              {profit.value.toFixed(2)} PLN
                            </span>
                          </div>
                          <div className="text-sm">
                            {profit.percent >= 0 ? "+" : ""}
                            {profit.percent.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {editingStopLoss === position.symbol ? (
                          <div className="flex items-center gap-2 justify-end">
                            <input
                              type="number"
                              step="0.01"
                              value={newStopLoss}
                              onChange={(e) => setNewStopLoss(e.target.value)}
                              placeholder="PLN"
                              className="w-24 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                              autoFocus
                            />
                            <button
                              onClick={() => handleUpdateStopLoss(position.symbol)}
                              className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingStopLoss(null)}
                              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ) : position.stopLoss ? (
                          <div className="flex items-center gap-2 justify-end">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            <span className="text-yellow-500 text-sm">
                              {position.stopLoss.toFixed(2)} PLN
                            </span>
                            <button
                              onClick={() => {
                                setEditingStopLoss(position.symbol);
                                setNewStopLoss(position.stopLoss!.toString());
                              }}
                              className="p-1 text-gray-400 hover:text-emerald-500"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveStopLoss(position.symbol)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingStopLoss(position.symbol)}
                            className="text-gray-500 hover:text-emerald-500 text-sm transition-colors"
                          >
                            Ustaw
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
