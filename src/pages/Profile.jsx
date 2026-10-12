import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: user?.username ?? "",
    email: user?.email ?? "",
  });

  useEffect(() => {
    setForm({
      username: user?.username ?? "",
      email: user?.email ?? "",
    });
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    setUser((prev) => ({
      ...prev,
      username: form.username.trim(),
      email: form.email.trim(),
    }));

    setIsEditing(false);
  }

  function handleCancel() {
    setForm({
      username: user?.username ?? "",
      email: user?.email ?? "",
    });

    setIsEditing(false);
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Личный кабинет</h1>
        <p>Управление личными данными и настройками аккаунта</p>
      </div>

      <div className="profile-layout">
        <div className="profile-card profile-user-card">
          <div className="profile-avatar">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>

          <h2>{user?.username || "Пользователь"}</h2>

          <p>{user?.email || "Email не указан"}</p>

          <span className="profile-role">{user?.role || "Студент"}</span>

          <div className="profile-user-info">
            <p>
              <strong>ID аккаунта:</strong> {user?.id || "Не указан"}
            </p>
            <p>
              <strong>Статус:</strong>{" "}
              {user?.isLogged ? "Авторизован" : "Не авторизован"}
            </p>
          </div>
        </div>

        <div className="profile-card profile-details-card">
          <div className="profile-card-header">
            <h2>Личные данные</h2>

            {!isEditing && (
              <button
                className="profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="username">Имя пользователя</label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">Электронная почта</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="profile-field">
                <label>Роль</label>
                <input value={user?.role || "Не указана"} disabled readOnly />
              </div>

              <div className="profile-field">
                <label>ID пользователя</label>
                <input value={user?.id || "Не указан"} disabled readOnly />
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button type="submit" className="profile-btn">
                  Сохранить
                </button>

                <button
                  type="button"
                  className="profile-btn profile-btn-secondary"
                  onClick={handleCancel}
                >
                  Отмена
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
