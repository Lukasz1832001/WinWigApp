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

interface DepositTransaction {
  id: string;
  amount: number;
  method: string;
  timestamp: string;
}

export function Wallet() {
  const [balance, setBalance] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "blik">("card");
  const [deposits, setDeposits] = useState<DepositTransaction[]>([]);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setBalance(user.balance || 0);

    const depositsData = JSON.parse(localStorage.getItem("deposits") || "[]");
    setDeposits(depositsData);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Podaj prawidłową kwotę");
      return;
    }

    // TODO: Replace with API call to ASP.NET backend for payment processing
    // const response = await fetch('/api/wallet/deposit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({ amount, method: paymentMethod })
    // });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.balance = (user.balance || 0) + amount;
    localStorage.setItem("user", JSON.stringify(user));
    setBalance(user.balance);

    const newDeposit: DepositTransaction = {
      id: Date.now().toString(),
      amount,
      method:
        paymentMethod === "card"
          ? "Karta kredytowa"
          : paymentMethod === "transfer"
          ? "Przelew bankowy"
          : "BLIK",
      timestamp: new Date().toISOString(),
    };

    const updatedDeposits = [newDeposit, ...deposits];
    setDeposits(updatedDeposits);
    localStorage.setItem("deposits", JSON.stringify(updatedDeposits));

    toast.success(`Wpłacono ${amount.toFixed(2)} PLN`);
    setShowDepositModal(false);
    setDepositAmount("");
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
          className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
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
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
                >
                  Wpłać
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
