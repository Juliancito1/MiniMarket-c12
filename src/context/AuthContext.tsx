import { createContext, useContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextType{
  user: User | null;
  login: (UserData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

