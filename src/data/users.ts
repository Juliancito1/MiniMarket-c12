import type { User } from "../context/AuthContext";

export const usuarios: User[] = [
    {
      id: 1,
      name: "Tomas",
      email: "tomas@gmail.com",
      role: "user",
    },
    {
      id: 2,
      name: "Julian",
      email: "julian@gmail.com",
      role: "admin",
    },
  ];