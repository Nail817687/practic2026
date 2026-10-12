import { useContext, useState } from "react";
import { StudentsContext } from "../context/StudentProvider";

export default function AddStudent({ close }) {
  let { students, setStudents } = useContext(StudentsContext);
  let [student, setStudent] = useState({
    name: "",
    group: "",
    yearStudy: "",
    grades: [],
    specialty: "",
  });

  let handleAddStudent = () => {
    fetch("https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setStudents([...students, student]);

    setStudent({
      name: "",
      group: "",
      yearStudy: "",
      grades: [],
      specialty: "",
    });
  };
  return (
    <div className="modal-overlay">
      <div className="form-add ">
        <h3>Добавлние студентов</h3>
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
            value={
              Array.isArray(student.grades)
                ? student.grades.join(", ")
                : student.grades
            }
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
        <button
          onClick={() => {
            handleAddStudent();
            close();
          }}
        >
          Добавить студента
        </button>
        <button onClick={close}>Отмена</button>
      </div>
    </div>
  );
}
