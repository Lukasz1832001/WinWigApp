import { useState, useEffect } from "react";
import {
  Wallet as WalletIcon,
  CreditCard,
  Building2,
  Smartphone,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext";

interface DepositTransaction {
  id: string;
  amount: number;
  method: string;
  timestamp: string;
}

export function Wallet() {
  const { updateBalance } = useUser();
  const [balance, setBalance] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "blik">("card");
  const [deposits, setDeposits] = useState<DepositTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWalletData();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const loadWalletData = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();

      if (!token) {
        toast.error("Nie jesteś zalogowany");
        return;
      }

      // Fetch balance
      const balanceResponse = await fetch("/api/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!balanceResponse.ok) {
        throw new Error("Nie udało się pobrać salda");
      }

      const balanceData = await balanceResponse.json();
      setBalance(balanceData.balance);

      // Fetch deposits history
      const depositsResponse = await fetch("/api/wallet/deposits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!depositsResponse.ok) {
        throw new Error("Nie udało się pobrać historii wpłat");
      }

      const depositsData = await depositsResponse.json();
      setDeposits(depositsData);
    } catch (error) {
      console.error("Error loading wallet data:", error);
      toast.error("Błąd podczas ładowania danych portfela");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Podaj prawidłową kwotę");
      return;
    }

    try {
      setIsLoading(true);
      const token = getAuthToken();

      if (!token) {
        toast.error("Nie jesteś zalogowany");
        return;
      }

      const methodMap: Record<string, string> = {
        card: "card",
        transfer: "transfer",
        blik: "blik",
      };

      const response = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          method: methodMap[paymentMethod],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Nie udało się przetworzyć wpłaty");
      }

      const depositResponse = await response.json();
      setBalance(depositResponse.newBalance);

      // Update user balance in context - this will automatically update the header
      updateBalance(depositResponse.newBalance);

      // Refresh deposits list
      await loadWalletData();

      toast.success(`Wpłacono ${amount.toFixed(2)} PLN`);
      setShowDepositModal(false);
      setDepositAmount("");
    } catch (error) {
      console.error("Deposit error:", error);
      const errorMessage = error instanceof Error ? error.message : "Błąd podczas wpłaty";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: "card", icon: CreditCard, label: "Karta kredytowa/debetowa" },
    { id: "transfer", icon: Building2, label: "Przelew bankowy" },
    { id: "blik", icon: Smartphone, label: "BLIK" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Konto</h1>
        <p className="text-gray-400 mt-1">Zarządzaj swoimi środkami</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <WalletIcon className="w-8 h-8" />
          <span className="text-lg opacity-90">Dostępne środki</span>
        </div>
        <div className="text-5xl font-bold mb-6">
          {balance.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          PLN
        </div>
        <button
          onClick={() => setShowDepositModal(true)}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Wpłać środki
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6">Historia wpłat</h2>

        {deposits.length === 0 ? (
          <div className="text-center py-12">
            <ArrowDownRight className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400">Brak wpłat do wyświetlenia</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deposits.map((deposit) => (
              <div
                key={deposit.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <ArrowDownRight className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Wpłata</div>
                    <div className="text-sm text-gray-400">{deposit.method}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-500 font-bold text-lg">
                    +{deposit.amount.toFixed(2)} PLN
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(deposit.timestamp).toLocaleString("pl-PL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Wpłać środki</h2>
            </div>

            <form onSubmit={handleDeposit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Metoda płatności
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                          paymentMethod === method.id
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                        }`}
                      >
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-white font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kwota (PLN)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Przetwarzanie..." : "Wpłać"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
