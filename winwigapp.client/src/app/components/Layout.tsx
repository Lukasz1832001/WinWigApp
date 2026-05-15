import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Wallet,
  History,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/portfolio", icon: Briefcase, label: "Portfel" },
    { path: "/strategies", icon: TrendingUp, label: "Strategie" },
    { path: "/wallet", icon: Wallet, label: "Konto" },
    { path: "/history", icon: History, label: "Historia" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 mb-4">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-emerald-500">WIN_WIG</h1>
              </div>

              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gray-800 text-emerald-500"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800 rounded-lg">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {user.firstName || user.email}
                  </div>
                  <div className="text-xs text-emerald-500">
                    {new Intl.NumberFormat("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    }).format(user.balance || 100000)}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Wyloguj się"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-gray-800 text-emerald-500"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}

              <div className="px-3 py-4 border-t border-gray-800 mt-4">
                <div className="text-sm text-white mb-2">
                  {user.firstName || user.email}
                </div>
                <div className="text-sm text-emerald-500 mb-4">
                  {new Intl.NumberFormat("pl-PL", {
                    style: "currency",
                    currency: "PLN",
                  }).format(user.balance || 100000)}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-500 hover:text-red-400"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Wyloguj się
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
