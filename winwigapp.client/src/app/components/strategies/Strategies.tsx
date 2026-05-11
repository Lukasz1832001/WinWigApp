import { useState, useEffect } from "react";
import {
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Target,
  Calendar,
  BarChart,
} from "lucide-react";
import { toast } from "sonner";

interface Strategy {
  id: string;
  name: string;
  targetReturn: number;
  investmentHorizon: number;
  rsiLow: number;
  rsiHigh: number;
  macdBuy: boolean;
  sma50Above200: boolean;
  isActive: boolean;
  createdAt: string;
}

export function Strategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    targetReturn: "10",
    investmentHorizon: "30",
    rsiLow: "30",
    rsiHigh: "70",
    macdBuy: true,
    sma50Above200: false,
  });

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = () => {
    const data = JSON.parse(localStorage.getItem("strategies") || "[]");
    setStrategies(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Podaj nazwę strategii");
      return;
    }

    const targetReturn = parseFloat(formData.targetReturn);
    const investmentHorizon = parseInt(formData.investmentHorizon);
    const rsiLow = parseFloat(formData.rsiLow);
    const rsiHigh = parseFloat(formData.rsiHigh);

    if (targetReturn <= 0 || investmentHorizon <= 0 || rsiLow <= 0 || rsiHigh <= 0) {
      toast.error("Wszystkie wartości muszą być większe od zera");
      return;
    }

    if (rsiLow >= rsiHigh) {
      toast.error("RSI niski musi być mniejszy niż RSI wysoki");
      return;
    }

    // TODO: Replace with API call to ASP.NET backend
    // const response = await fetch('/api/strategies', {
    //   method: editingStrategy ? 'PUT' : 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({...formData, id: editingStrategy?.id})
    // });

    if (editingStrategy) {
      const updated = strategies.map((s) =>
        s.id === editingStrategy.id
          ? {
              ...s,
              ...formData,
              targetReturn,
              investmentHorizon,
              rsiLow,
              rsiHigh,
            }
          : s
      );
      setStrategies(updated);
      localStorage.setItem("strategies", JSON.stringify(updated));
      toast.success("Zaktualizowano strategię");
    } else {
      const newStrategy: Strategy = {
        id: Date.now().toString(),
        name: formData.name,
        targetReturn,
        investmentHorizon,
        rsiLow,
        rsiHigh,
        macdBuy: formData.macdBuy,
        sma50Above200: formData.sma50Above200,
        isActive: false,
        createdAt: new Date().toISOString(),
      };
      const updated = [newStrategy, ...strategies];
      setStrategies(updated);
      localStorage.setItem("strategies", JSON.stringify(updated));
      toast.success("Utworzono strategię");
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      targetReturn: "10",
      investmentHorizon: "30",
      rsiLow: "30",
      rsiHigh: "70",
      macdBuy: true,
      sma50Above200: false,
    });
    setEditingStrategy(null);
    setShowModal(false);
  };

  const handleEdit = (strategy: Strategy) => {
    setEditingStrategy(strategy);
    setFormData({
      name: strategy.name,
      targetReturn: strategy.targetReturn.toString(),
      investmentHorizon: strategy.investmentHorizon.toString(),
      rsiLow: strategy.rsiLow.toString(),
      rsiHigh: strategy.rsiHigh.toString(),
      macdBuy: strategy.macdBuy,
      sma50Above200: strategy.sma50Above200,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć tę strategię?")) {
      const updated = strategies.filter((s) => s.id !== id);
      setStrategies(updated);
      localStorage.setItem("strategies", JSON.stringify(updated));
      toast.success("Usunięto strategię");
    }
  };

  const toggleActive = (id: string) => {
    const updated = strategies.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    setStrategies(updated);
    localStorage.setItem("strategies", JSON.stringify(updated));
    const strategy = updated.find((s) => s.id === id);
    toast.success(
      strategy?.isActive ? "Aktywowano strategię" : "Dezaktywowano strategię"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Strategie inwestycyjne</h1>
          <p className="text-gray-400 mt-1">Twórz i testuj własne strategie</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Nowa strategia
        </button>
      </div>

      {strategies.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-12 border border-gray-800 text-center">
          <TrendingUp className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Nie masz jeszcze żadnych strategii</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Utwórz pierwszą strategię
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {strategy.name}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        strategy.isActive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {strategy.isActive ? (
                        <>
                          <Play className="w-3 h-3" />
                          Aktywna
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3" />
                          Nieaktywna
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">Cel:</span>
                    <span className="text-emerald-500 font-medium">
                      +{strategy.targetReturn}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">Horyzont:</span>
                    <span className="text-white">{strategy.investmentHorizon} dni</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">RSI:</span>
                    <span className="text-white">
                      {strategy.rsiLow} - {strategy.rsiHigh}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded p-3 mb-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">MACD kupno</span>
                    <span
                      className={strategy.macdBuy ? "text-emerald-500" : "text-gray-500"}
                    >
                      {strategy.macdBuy ? "Tak" : "Nie"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">SMA 50 {'>'} SMA 200</span>
                    <span
                      className={
                        strategy.sma50Above200 ? "text-emerald-500" : "text-gray-500"
                      }
                    >
                      {strategy.sma50Above200 ? "Tak" : "Nie"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(strategy.id)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      strategy.isActive
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    {strategy.isActive ? "Zatrzymaj" : "Uruchom"}
                  </button>
                  <button
                    onClick={() => handleEdit(strategy)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(strategy.id)}
                    className="p-2 bg-gray-800 hover:bg-red-900/30 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-800/50 border-t border-gray-800">
                <div className="text-xs text-gray-500">
                  Utworzono:{" "}
                  {new Date(strategy.createdAt).toLocaleDateString("pl-PL")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full border border-gray-800 my-8">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                {editingStrategy ? "Edytuj strategię" : "Nowa strategia"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwa strategii
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Moja strategia"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Planowana stopa zwrotu (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.targetReturn}
                    onChange={(e) =>
                      setFormData({ ...formData, targetReturn: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Horyzont inwestycyjny (dni)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.investmentHorizon}
                    onChange={(e) =>
                      setFormData({ ...formData, investmentHorizon: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                <h3 className="font-medium text-white">Warunki strategii</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      RSI niski (kupno)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.rsiLow}
                      onChange={(e) =>
                        setFormData({ ...formData, rsiLow: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      RSI wysoki (sprzedaż)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.rsiHigh}
                      onChange={(e) =>
                        setFormData({ ...formData, rsiHigh: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.macdBuy}
                    onChange={(e) =>
                      setFormData({ ...formData, macdBuy: e.target.checked })
                    }
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-gray-300">
                    Kupuj gdy MACD przecina linię sygnału od dołu
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sma50Above200}
                    onChange={(e) =>
                      setFormData({ ...formData, sma50Above200: e.target.checked })
                    }
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-gray-300">
                    Wymagaj SMA 50 powyżej SMA 200 (trend wzrostowy)
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
                >
                  {editingStrategy ? "Zapisz zmiany" : "Utwórz strategię"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
