import { useState, useMemo } from "react";
import { Link } from "react-router";
import { WIG20_STOCKS, Stock } from "../../data/mockData";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Filter,
  ChevronRight,
} from "lucide-react";

type SortField = "symbol" | "currentPrice" | "volume" | "changePercent";
type SortDirection = "asc" | "desc";

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedStocks = useMemo(() => {
    let filtered = WIG20_STOCKS.filter((stock) => {
      const matchesSearch =
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        (!priceFilter.min || stock.currentPrice >= parseFloat(priceFilter.min)) &&
        (!priceFilter.max || stock.currentPrice <= parseFloat(priceFilter.max));

      return matchesSearch && matchesPrice;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, priceFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-500" />;
    }
    return (
      <ArrowUpDown
        className={`w-4 h-4 text-emerald-500 ${
          sortDirection === "desc" ? "rotate-180" : ""
        }`}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Spółki WIG20</h1>
          <p className="text-gray-400 mt-1">
            Lista wszystkich spółek z indeksu WIG20
          </p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Szukaj spółki po nazwie lub symbolu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-lg border transition-colors flex items-center gap-2 ${
              showFilters
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
            }`}
          >
            <Filter className="w-5 h-5" />
            Filtry
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
            <h3 className="text-white font-medium mb-3">Filtruj po cenie</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Cena minimalna (PLN)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceFilter.min}
                  onChange={(e) =>
                    setPriceFilter({ ...priceFilter, min: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Cena maksymalna (PLN)
                </label>
                <input
                  type="number"
                  placeholder="∞"
                  value={priceFilter.max}
                  onChange={(e) =>
                    setPriceFilter({ ...priceFilter, max: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-400 mb-4">
          Znaleziono: {filteredAndSortedStocks.length} spółek
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4">
                  <button
                    onClick={() => handleSort("symbol")}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Symbol
                    <SortIcon field="symbol" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  <span className="text-gray-400">Nazwa</span>
                </th>
                <th className="text-right py-3 px-4">
                  <button
                    onClick={() => handleSort("currentPrice")}
                    className="flex items-center gap-2 ml-auto text-gray-400 hover:text-white transition-colors"
                  >
                    Kurs
                    <SortIcon field="currentPrice" />
                  </button>
                </th>
                <th className="text-right py-3 px-4">
                  <button
                    onClick={() => handleSort("changePercent")}
                    className="flex items-center gap-2 ml-auto text-gray-400 hover:text-white transition-colors"
                  >
                    Zmiana
                    <SortIcon field="changePercent" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 hidden lg:table-cell">
                  <button
                    onClick={() => handleSort("volume")}
                    className="flex items-center gap-2 ml-auto text-gray-400 hover:text-white transition-colors"
                  >
                    Wolumen
                    <SortIcon field="volume" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 hidden xl:table-cell">
                  <span className="text-gray-400">P/E</span>
                </th>
                <th className="text-right py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{stock.symbol}</div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="text-gray-400 text-sm">{stock.name}</div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="text-white font-medium">
                      {stock.currentPrice.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      PLN
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        stock.changePercent >= 0 ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {stock.changePercent >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right hidden lg:table-cell">
                    <div className="text-gray-400 text-sm">
                      {stock.volume.toLocaleString("pl-PL")}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right hidden xl:table-cell">
                    <div className="text-gray-400 text-sm">
                      {stock.peRatio.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/stock/${stock.symbol}`}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors text-sm"
                    >
                      Szczegóły
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
