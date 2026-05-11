import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/dashboard/Dashboard";
import { StockDetails } from "./components/stocks/StockDetails";
import { Portfolio } from "./components/portfolio/Portfolio";
import { Strategies } from "./components/strategies/Strategies";
import { Wallet } from "./components/wallet/Wallet";
import { TransactionHistory } from "./components/transactions/TransactionHistory";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "stock/:symbol", Component: StockDetails },
      { path: "portfolio", Component: Portfolio },
      { path: "strategies", Component: Strategies },
      { path: "wallet", Component: Wallet },
      { path: "history", Component: TransactionHistory },
      { path: "*", Component: NotFound },
    ],
  },
]);
