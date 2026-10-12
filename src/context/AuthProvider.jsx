import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "user";

const defaultUsers = [
  {
    id: "admin-1",
    name: "Admin",
    password: "admin123",
    role: "Admin",
  },
  {
    id: "teacher-1",
    name: "Teacher",
    password: "teacher123",
    role: "Teacher",
  },
];

function getUsers() {
  try {
    const savedUsers = JSON.parse(localStorage.getItem(USERS_KEY));

    if (Array.isArray(savedUsers)) {
      // Гарантируем наличие заранее созданных аккаунтов
      const users = [...savedUsers];

      defaultUsers.forEach((defaultUser) => {
        const exists = users.some((user) => user.id === defaultUser.id);

        if (!exists) {
          users.push(defaultUser);
        }
      });

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return users;
    }
  } catch {
    // Если данные повреждены, создаём список заново
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

function getSavedUser() {
  try {
    const savedUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

    if (savedUser?.isLogged) {
      return savedUser;
    }
  } catch {
    // Игнорируем некорректные данные
  }

  return {
    name: "",
    role: "",
    isLogged: false,
  };
}

export default function AuthProvider({ children }) {
  const [users, setUsers] = useState(getUsers);
  const [user, setCurrentUser] = useState(getSavedUser);

  function registerUser(newUser) {
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  }

  function setUser(value) {
    setCurrentUser((previousUser) => {
      const updatedUser =
        typeof value === "function" ? value(previousUser) : value;

      if (updatedUser?.isLogged) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }

      return updatedUser;
    });
  }

  function logout() {
    setUser({
      name: "",
      role: "",
      isLogged: false,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
