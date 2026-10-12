import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export default function Footer() {
  let { user, setUser } = useContext(AuthContext);

  return (
    <footer>
      <div className="up">
        <div>
          <div>
            <h4>Обратная связь</h4>
            <a href="https://hexly.kz/">
              <img
                className="img-social"
                src="src\assets\global.svg"
                alt="global"
              />
            </a>
          </div>
          <div>
            <h4>Подпишитесь</h4>
            <a href="https://www.instagram.com/hexlet.edu.kz">
              <img
                className="img-social"
                src="src\assets\instagram.svg"
                alt="instagram"
              />
            </a>
          </div>
        </div>
        <div style={{ alignItems: "center" }}>
          {!user.isLogged && (
            <p>
              Вы не вошли в систему <NavLink to="/login">(Вход)</NavLink>
            </p>
          )}
          <a href="https://kzhexly.kz/admin/tool/dataprivacy/summary.php">
            Сводка хранения данных
          </a>
          <a href="https://download.moodle.org/mobile?version=2024042212.01&lang=ru&iosappid=633359593&androidappid=com.moodle.moodlemobile">
            Скачать мобильное приложение
          </a>
        </div>
        <div style={{ alignItems: "end" }}>
          <a href="https://download.moodle.org/mobile">
            Скачать мобильное приложение
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.moodle.moodlemobile">
            <img
              className="installer"
              src="src\assets\google-play.avif"
              alt="google play"
            />
          </a>
          <a href="https://apps.apple.com/app/id633359593">
            <img
              className="installer"
              src="src\assets\app-store.avif"
              alt="app store"
            />
          </a>
        </div>
      </div>
      <div className="down">
        <p>Тема оформления сайта разработана</p>
        <h2>ОБЕЗЬЯНОЙ</h2>
      </div>
    </footer>
  );
}
