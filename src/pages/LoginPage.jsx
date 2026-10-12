import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { users, setUser, registerUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();

    if (!cleanName || !password) {
      setError("Заполните все поля");
      return;
    }

    if (isRegister) {
      const exists = users.some(
        (item) => item.name.toLowerCase() === cleanName.toLowerCase(),
      );

      if (exists) {
        setError("Пользователь с таким именем уже существует");
        return;
      }

      if (password.length < 6) {
        setError("Пароль должен содержать минимум 6 символов");
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: cleanName,
        password,
        role: "Student",
      };

      registerUser(newUser);

      setSuccess("Регистрация успешна. Теперь войдите в аккаунт.");
      setIsRegister(false);
      setPassword("");
      return;
    }

    const foundUser = users.find(
      (item) =>
        item.name.toLowerCase() === cleanName.toLowerCase() &&
        item.password === password,
    );

    if (!foundUser) {
      setError("Неверное имя пользователя или пароль");
      return;
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      role: foundUser.role,
      isLogged: true,
    });

    navigate("/");
  }

  return (
    <div className="container gray-blue-bg height-auto">
      <div className="login-block box-shadow">
        <h3>{isRegister ? "Регистрация студента" : "Вход"}</h3>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="name">Имя пользователя</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Введите имя"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введите пароль"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
          />

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <button type="submit">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        <button
          type="button"
          className="login-switch"
          onClick={() => {
            setIsRegister((previous) => !previous);
            setError("");
            setSuccess("");
          }}
        >
          {isRegister
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Регистрация студента"}
        </button>
      </div>
    </div>
  );
}
