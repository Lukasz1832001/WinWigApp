import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-white mb-2">404</h1>
      <p className="text-gray-400 mb-6">Strona nie została znaleziona</p>
      <Link
        to="/"
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
      >
        Wróć do Dashboard
      </Link>
    </div>
  );
}
