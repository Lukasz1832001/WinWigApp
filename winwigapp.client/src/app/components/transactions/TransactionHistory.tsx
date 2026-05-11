import { useState, useEffect } from "react";
import { History, TrendingUp, TrendingDown, Download } from "lucide-react";

interface Transaction {
  id: string;
  symbol: string;
  name: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  total: number;
  stopLoss: number | null;
  timestamp: string;
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const data = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(data);
  };

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  const exportToCsv = () => {
    const headers = ["Data", "Typ", "Spółka", "Ilość", "Cena", "Wartość"];
    const rows = filteredTransactions.map((t) => [
      new Date(t.timestamp).toLocaleString("pl-PL"),
      t.type === "buy" ? "Kupno" : "Sprzedaż",
      `${t.symbol} - ${t.name}`,
      t.quantity,
      t.price.toFixed(2),
      t.total.toFixed(2),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transakcje_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Historia transakcji</h1>
          <p className="text-gray-400 mt-1">Przegląd wszystkich operacji</p>
        </div>
        <button
          onClick={exportToCsv}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Eksportuj CSV
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-emerald-500 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            Wszystkie
          </button>
          <button
            onClick={() => setFilter("buy")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "buy"
                ? "bg-emerald-500 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            Kupno
          </button>
          <button
            onClick={() => setFilter("sell")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "sell"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            Sprzedaż
          </button>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400">Brak transakcji do wyświetlenia</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400">Data</th>
                  <th className="text-left py-3 px-4 text-gray-400">Typ</th>
                  <th className="text-left py-3 px-4 text-gray-400">Spółka</th>
                  <th className="text-right py-3 px-4 text-gray-400">Ilość</th>
                  <th className="text-right py-3 px-4 text-gray-400">Cena</th>
                  <th className="text-right py-3 px-4 text-gray-400">Wartość</th>
                  <th className="text-right py-3 px-4 text-gray-400">Stop Loss</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      {new Date(transaction.timestamp).toLocaleString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                          transaction.type === "buy"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {transaction.type === "buy" ? (
                          <>
                            <TrendingUp className="w-4 h-4" />
                            Kupno
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-4 h-4" />
                            Sprzedaż
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{transaction.symbol}</div>
                      <div className="text-sm text-gray-400">{transaction.name}</div>
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      {transaction.quantity}
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      {transaction.price.toFixed(2)} PLN
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`font-medium ${
                          transaction.type === "buy" ? "text-red-500" : "text-emerald-500"
                        }`}
                      >
                        {transaction.type === "buy" ? "-" : "+"}
                        {transaction.total.toFixed(2)} PLN
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-400 text-sm">
                      {transaction.stopLoss
                        ? `${transaction.stopLoss.toFixed(2)} PLN`
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
