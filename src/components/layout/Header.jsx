import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export default function Header() {
  let { user, setUser } = useContext(AuthContext);

  return (
    <header>
      <div>
        <NavLink to="/">Главная</NavLink>
      </div>
      <div>
        {!user.isLogged && <NavLink to="/login">Войти</NavLink>}
        {user.isLogged && (
          <button
            onClick={() => {
              setUser({
                name: "",
                role: "",
                isLogged: false,
              });
            }}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}
