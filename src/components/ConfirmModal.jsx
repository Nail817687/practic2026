export default function ConfirmModal({ func, id, close, text }) {
  return (
    <div className="modal-overlay" style={{ zIndex: "1001" }}>
      <div className="modal">
        <p>Подтвердить {text}</p>

        <button
          onClick={() => {
            func(id);
            close();
          }}
        >
          Подтвердить
        </button>

        <button className="cancel-btn" onClick={close}>
          Отмена
        </button>
      </div>
    </div>
  );
}
