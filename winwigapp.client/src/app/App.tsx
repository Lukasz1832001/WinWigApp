import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" theme="dark" />
    </UserProvider>
  );
}