import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import Swal from "sweetalert2";

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (!storedUser) return null;

    try {
      const parsedUser: User = JSON.parse(storedUser);

      return {
        id: parsedUser.id,
        name: parsedUser.name,
        email: parsedUser.email,
        role: "role" in parsedUser && parsedUser.role === "admin" ? "admin" : "user",
      };
    } catch (error) {
      console.error("Error al parsear el usuario de localStorage", error);
      localStorage.removeItem("auth_user");
      return null;
    }
  });


  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    Swal.fire({
      title: "Sesión cerrada",
      text: "Cerraste tu sesión correctamente.",
      icon: "info",
    })
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
