import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { LogIn } from "lucide-react";
import { useUser } from "../../context/UserContext";

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logowanie nie powiodło się');
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update UserContext so Layout.tsx renders immediately
      setUser(data.user);

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd podczas logowania");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-800">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-emerald-500/10 p-3 rounded-lg">
              <LogIn className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Witaj ponownie
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Zaloguj się do swojego konta tradingowego
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="twoj@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Hasło
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Nie masz konta?{" "}
              <Link to="/register" className="text-emerald-500 hover:text-emerald-400 font-medium">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          WIN_WIG Trading Platform © 2026
        </p>
      </div>
    </div>
  );
}

