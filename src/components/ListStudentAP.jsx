import { useContext, useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import EditModal from "./EditModal";
import { StudentsContext } from "../context/StudentProvider";

export default function ListStudentAP() {
  let { students, setStudents } = useContext(StudentsContext);
  let [isOpen, setIsOpen] = useState(false);
  let [deleteTd, setDeleteId] = useState(null);
  let [editId, setEditId] = useState(null);
  let [isOpenEdit, setIOpenEdit] = useState(false);
  let [filter, setFilter] = useState("");
  const [groups, setGroups] = useState([]);

  let handleDeleteStudent = (id) => {
    async function delStudent(id) {
      await fetch(
        `https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students/${id}`,
        { method: "DELETE" },
      );
    }

    delStudent(id);

    setStudents(students.filter((item) => item.id !== id));
  };

  let closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function getStudents() {
      let res = await fetch(
        "https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students",
      );

      let data = await res.json();

      setStudents(data);
    }

    getStudents();
  }, []);

  useEffect(() => {
    setGroups([...new Set(students.map((student) => student.group))]);
  }, [students]);

  return (
    <div className="students-block-py">
      {isOpen && (
        <ConfirmModal
          func={handleDeleteStudent}
          id={deleteTd}
          close={closeModal}
          text={"удаление"}
        />
      )}

      {isOpenEdit && (
        <EditModal
          id={editId}
          close={() => {
            setIOpenEdit(false);
          }}
        />
      )}

      <h3>Список студентов</h3>

      <select
        className="student-box-py"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="">Все группы</option>

        {groups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>

      <div className="student-box-py">
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <p>Имя</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Группа</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <p>Действие</p>
        </div>
      </div>
      {students.length == 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          Загрузка студентов...
        </div>
      )}
      {students
        .filter((item) => item.group.includes(filter))
        .map((item, i) => {
          return (
            <div className="student-box-py" key={i}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <p>{item.name}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>{item.group}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <button
                  className="del-btn"
                  onClick={() => {
                    setIsOpen(true);
                    setDeleteId(item.id);
                  }}
                >
                  <img src="src\assets\trash.svg" alt="del" />
                </button>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setIOpenEdit(true);
                    setEditId(item.id);
                  }}
                >
                  <img src="src\assets\pen.svg" alt="edit" />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
