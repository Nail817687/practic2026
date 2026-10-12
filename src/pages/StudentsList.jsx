import { useContext, useEffect, useMemo, useState } from "react";
import { StudentsContext } from "../context/StudentProvider";

const API_URL = "https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students";

export default function StudentsList() {
  const { students, setStudents } = useContext(StudentsContext);

  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Все группы");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getStudents() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Не удалось загрузить студентов");
        }

        const data = await res.json();

        const normalizedStudents = data.map((student) => ({
          ...student,
          name: student.name ?? "",
          group: student.group ?? "",
          yearStudy: student.yearStudy ?? "",
          grades: Array.isArray(student.grades) ? student.grades : [],
          specialty: student.specialty ?? "",
        }));

        setStudents(normalizedStudents);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить список студентов.");
      } finally {
        setLoading(false);
      }
    }

    getStudents();
  }, [setStudents]);

  const groups = useMemo(
    () => [
      ...new Set(students.map((student) => student.group).filter(Boolean)),
    ],
    [students],
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.specialty.toLowerCase().includes(searchValue) ||
        student.group.toLowerCase().includes(searchValue);

      const matchesGroup =
        selectedGroup === "Все группы" || student.group === selectedGroup;

      return matchesSearch && matchesGroup;
    });
  }, [students, search, selectedGroup]);

  function getAverage(grades) {
    const validGrades = grades
      .filter(
        (grade) =>
          grade !== "" && grade != null && Number.isFinite(Number(grade)),
      )
      .map(Number);

    if (validGrades.length === 0) {
      return "—";
    }

    return (
      validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length
    ).toFixed(2);
  }

  return (
    <main className="students-page">
      <header className="students-header">
        <div>
          <p className="students-subtitle">УЧЕБНЫЙ ПРОЦЕСС</p>
          <h1>Список студентов</h1>
          <p className="students-description">
            Просмотр и поиск информации об учащихся
          </p>
        </div>

        <div className="students-total">
          <span>Всего студентов</span>
          <strong>{students.length}</strong>
        </div>
      </header>

      <section className="students-toolbar">
        <label className="students-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Поиск по студента..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <select
          className="students-group-select"
          value={selectedGroup}
          onChange={(event) => setSelectedGroup(event.target.value)}
        >
          <option value="Все группы">Все группы</option>

          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </section>

      <section className="students-table-panel">
        <div className="students-table-heading">
          <div>
            <h2>Студенты</h2>
            <p>Найдено записей: {filteredStudents.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="students-message">Загрузка студентов...</div>
        ) : error ? (
          <div className="students-message students-error">
            {error}
            <button type="button" onClick={() => window.location.reload()}>
              Повторить
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="students-message">Студенты не найдены</div>
        ) : (
          <div className="students-table-scroll">
            <table className="students-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Студент</th>
                  <th>Группа</th>
                  <th>Специальность</th>
                  <th>Курс</th>
                  <th>Оценки</th>
                  <th>Средний балл</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id ?? `${student.name}-${index}`}>
                    <td className="students-number">{index + 1}</td>

                    <td>
                      <div className="student-name-cell">
                        <div className="student-avatar">
                          {student.name.charAt(0).toUpperCase() || "?"}
                        </div>
                        <strong>{student.name || "Без имени"}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="student-group-badge">
                        {student.group || "Не указана"}
                      </span>
                    </td>

                    <td>{student.specialty || "Не указана"}</td>

                    <td>
                      {student.yearStudy ? `${student.yearStudy} курс` : "—"}
                    </td>

                    <td>
                      <div className="student-grades">
                        {student.grades.length > 0
                          ? student.grades.join(", ")
                          : "Нет оценок"}
                      </div>
                    </td>

                    <td>
                      <strong className="student-average">
                        {getAverage(student.grades)}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
