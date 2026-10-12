import { useNavigate, useLocation } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  let location = useLocation();

  let goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="not-found-block box-shadow">
        <h2>Страница не найдена</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}
