import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="forbidden-page">
      <div className="forbidden-card">
        <h2 className="forbidden-title">Доступ ограничен</h2>

        <div className="forbidden-actions">
          <button className="forbidden-home-btn" onClick={() => navigate(-1)}>
            Назад
          </button>

          <button className="forbidden-home-btn" onClick={() => navigate("/")}>
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}
