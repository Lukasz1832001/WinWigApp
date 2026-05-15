import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateBalance: (newBalance: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Initialize user from localStorage immediately
const initializeUser = (): User | null => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
  }
  return null;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(initializeUser());

  const updateBalance = (newBalance: number) => {
    setUserState((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, balance: newBalance };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const handleSetUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, updateBalance }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
