import type { User } from "../context/AuthContext";

const REGISTERED_USERS_KEY = "registered_users";

export const usuarios: User[] = [
  {
    id: 1,
    name: "Tomas",
    email: "tomas@gmail.com",
    password: "tomas123",
    role: "user",
  },
  {
    id: 2,
    name: "Julian",
    email: "julian@gmail.com",
    password: "julian123",
    role: "admin",
  },
];

export const getRegisteredUsers = (): User[] => {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
  if (!storedUsers) return [];

  try {
    return JSON.parse(storedUsers) as User[];
  } catch (error) {
    console.error("No se pudieron leer los usuarios registrados", error);
    localStorage.removeItem(REGISTERED_USERS_KEY);
    return [];
  }
};

export const saveRegisteredUser = (user: User) => {
  const registeredUsers = getRegisteredUsers();
  localStorage.setItem(
    REGISTERED_USERS_KEY,
    JSON.stringify([...registeredUsers, user]),
  );
};