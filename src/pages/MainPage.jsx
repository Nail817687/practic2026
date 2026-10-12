import { useNavigate } from "react-router-dom";

export default function MainPage() {
  let navigate = useNavigate();

  return (
    <div className="container-section">
      <h3>Разделы</h3>
      <div className="section-box">
        <button
          onClick={() => {
            navigate("/students");
          }}
          className="btn-sections"
        >
          Список студентов
        </button>
        <button
          onClick={() => {
            navigate("/admin");
          }}
          className="btn-sections"
        >
          Админ панель
        </button>
        <button
          onClick={() => {
            navigate("/profile");
          }}
          className="btn-sections"
        >
          Профиль
        </button>
        <button
          onClick={() => {
            navigate("/schedule");
          }}
          className="btn-sections"
        >
          Расписание
        </button>
        <button
          onClick={() => {
            navigate("/statistics");
          }}
          className="btn-sections"
        >
          Статистика
        </button>
        <button
          onClick={() => {
            navigate("/performance");
          }}
          className="btn-sections"
        >
          Успеваемость
        </button>
      </div>
    </div>
  );
}
