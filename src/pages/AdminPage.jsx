import { useEffect, useState } from "react";
import ListStudentAP from "../components/ListStudentAP";
import AddStudent from "../components/AddStudent";

export default function AdminPage() {
  let [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container gray-blue-bg" style={{ gap: "20px" }}>
      <div className="add-box">
        <h3>Добавить студента</h3>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Добавить
        </button>
      </div>
      {isModalOpen && (
        <AddStudent
          close={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <ListStudentAP />
    </div>
  );
}
