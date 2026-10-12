import { useContext, useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { StudentsContext } from "../context/StudentProvider";

export default function EditModal({ id, close }) {
  let [isOpen, setIsOpen] = useState(false);
  let [student, setStudent] = useState({
    name: "",
    group: "",
    yearStudy: "",
    grades: [],
    specialty: "",
  });
  let [saveData, setSaveData] = useState({});
  let { students, setStudents } = useContext(StudentsContext);

  let handleEditStudent = () => {
    async function editStudent(id) {
      if (JSON.stringify(saveData) === JSON.stringify(student)) {
        return;
      }

      let res = await fetch(
        `https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        },
      );

      setStudents(
        students.map((item) => {
          return item.id == id ? student : item;
        }),
      );

      let data = await res.json();
      console.log(data);
    }

    editStudent(id);
  };

  useEffect(() => {
    let getStudent = async (id) => {
      let res = await fetch(
        `https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students/${id}`,
      );

      let data = await res.json();

      setStudent(data);
      setSaveData(data);
    };

    getStudent(id);
  }, []);

  return (
    <div>
      {isOpen && (
        <ConfirmModal
          id={id}
          func={handleEditStudent}
          text={"изменение"}
          close={close}
        />
      )}

      <div className="modal-overlay">
        <div className="form-add ">
          <h3>Редактирование студентов</h3>
          <label>
            ФИО
            <input
              type="text"
              placeholder="Введите ФИО"
              onChange={(e) => {
                setStudent({
                  ...student,
                  name: e.target.value,
                });
              }}
              value={student.name}
            />
          </label>
          <label>
            Год обучения
            <input
              type="text"
              placeholder="Введите год обучения"
              onChange={(e) => {
                setStudent({
                  ...student,
                  yearStudy: e.target.value,
                });
              }}
              value={student.yearStudy}
            />
          </label>
          <label>
            Группа
            <input
              type="text"
              placeholder="Введите группу"
              onChange={(e) => {
                setStudent({
                  ...student,
                  group: e.target.value,
                });
              }}
              value={student.group}
            />
          </label>
          <label>
            <span>
              Оценки<span style={{ color: "gray" }}>(через заятую)</span>
            </span>
            <input
              type="text"
              placeholder="Введите оценки"
              onChange={(e) => {
                setStudent({
                  ...student,
                  grades: e.target.value.split(",").map((item) => item.trim()),
                });
              }}
              value={student.grades}
            />
          </label>
          <label>
            Специальность
            <input
              type="text"
              placeholder="Введите специальность"
              onChange={(e) => {
                setStudent({
                  ...student,
                  specialty: e.target.value,
                });
              }}
              value={student.specialty}
            />
          </label>
          <button onClick={() => setIsOpen(true)}>Изменить информацию</button>
          <button onClick={close}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
