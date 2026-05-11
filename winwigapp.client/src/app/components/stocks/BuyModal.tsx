import { useState } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { Stock } from "../../data/mockData";
import { toast } from "sonner";

interface BuyModalProps {
  stock: Stock;
  onClose: () => void;
}

export function BuyModal({ stock, onClose }: BuyModalProps) {
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState<string>("1");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [useStopLoss, setUseStopLoss] = useState(false);

  const totalValue = parseFloat(quantity || "0") * stock.currentPrice;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const balance = user.balance || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const qty = parseFloat(quantity);
    if (qty <= 0 || isNaN(qty)) {
      toast.error("Podaj prawidłową ilość akcji");
      return;
    }

    if (transactionType === "buy" && totalValue > balance) {
      toast.error("Niewystarczające środki na koncie");
      return;
    }

    if (useStopLoss) {
      const stopLossValue = parseFloat(stopLoss);
      if (isNaN(stopLossValue) || stopLossValue <= 0) {
        toast.error("Podaj prawidłową wartość stop loss");
        return;
      }
      if (transactionType === "buy" && stopLossValue >= stock.currentPrice) {
        toast.error("Stop loss musi być niższy niż aktualna cena");
        return;
      }
    }

    // TODO: Replace with API call to ASP.NET backend
    // const response = await fetch('/api/transactions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({
    //     symbol: stock.symbol,
    //     quantity: qty,
    //     price: stock.currentPrice,
    //     type: transactionType,
    //     stopLoss: useStopLoss ? parseFloat(stopLoss) : null
    //   })
    // });

    const newBalance = transactionType === "buy"
      ? balance - totalValue
      : balance + totalValue;

    user.balance = newBalance;
    localStorage.setItem("user", JSON.stringify(user));

    const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");
    const existingPosition = portfolio.find((p: any) => p.symbol === stock.symbol);

    if (transactionType === "buy") {
      if (existingPosition) {
        existingPosition.quantity += qty;
        existingPosition.avgPrice =
          (existingPosition.avgPrice * (existingPosition.quantity - qty) + stock.currentPrice * qty) /
          existingPosition.quantity;
      } else {
        portfolio.push({
          symbol: stock.symbol,
          name: stock.name,
          quantity: qty,
          avgPrice: stock.currentPrice,
          stopLoss: useStopLoss ? parseFloat(stopLoss) : null,
        });
      }
    } else {
      if (existingPosition) {
        existingPosition.quantity -= qty;
        if (existingPosition.quantity <= 0) {
          const index = portfolio.indexOf(existingPosition);
          portfolio.splice(index, 1);
        }
      }
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.unshift({
      id: Date.now().toString(),
      symbol: stock.symbol,
      name: stock.name,
      type: transactionType,
      quantity: qty,
      price: stock.currentPrice,
      total: totalValue,
      stopLoss: useStopLoss ? parseFloat(stopLoss) : null,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    toast.success(
      `${transactionType === "buy" ? "Kupiono" : "Sprzedano"} ${qty} akcji ${stock.symbol}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {transactionType === "buy" ? "Kup" : "Sprzedaj"} akcje
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Spółka</div>
            <div className="text-lg font-bold text-white">{stock.symbol}</div>
            <div className="text-sm text-gray-400">{stock.name}</div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-400">Aktualna cena</span>
              <span className="text-lg font-bold text-white">
                {stock.currentPrice.toFixed(2)} PLN
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTransactionType("buy")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                transactionType === "buy"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Kup
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("sell")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                transactionType === "sell"
                  ? "bg-red-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <TrendingDown className="w-5 h-5" />
              Sprzedaj
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ilość akcji
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useStopLoss}
                  onChange={(e) => setUseStopLoss(e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500"
                />
                Ustaw Stop Loss
              </label>
            </div>
            {useStopLoss && (
              <input
                type="number"
                step="0.01"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Cena Stop Loss (PLN)"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-emerald-500"
              />
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Wartość transakcji</span>
              <span className="text-white font-medium">
                {totalValue.toFixed(2)} PLN
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Dostępne środki</span>
              <span className="text-white font-medium">
                {balance.toFixed(2)} PLN
              </span>
            </div>
            {transactionType === "buy" && (
              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-700">
                <span className="text-gray-400">Saldo po transakcji</span>
                <span
                  className={`font-medium ${
                    balance - totalValue < 0 ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {(balance - totalValue).toFixed(2)} PLN
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              transactionType === "buy"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            Potwierdź {transactionType === "buy" ? "zakup" : "sprzedaż"}
          </button>
        </form>
      </div>
    </div>
  );
}
