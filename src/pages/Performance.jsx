import { useContext, useEffect, useMemo, useState } from "react";
import { StudentsContext } from "../context/StudentProvider";

function getAverage(student) {
  if (!Array.isArray(student.grades) || student.grades.length === 0) {
    return null;
  }

  return (
    student.grades.reduce((sum, grade) => sum + Number(grade), 0) /
    student.grades.length
  );
}

function hasDebt(student) {
  return (
    Array.isArray(student.grades) &&
    student.grades.some((grade) => grade !== "" && Number(grade) < 3)
  );
}

function getStatus(average, student) {
  if (average === null) return "Нет оценок";
  if (hasDebt(student)) return "Есть задолженности";
  if (average >= 4.5) return "Отлично";
  if (average >= 3.5) return "Хорошо";
  return "Удовлетворительно";
}

export default function Performance() {
  const { students, setStudents } = useContext(StudentsContext);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Все группы");
  const [selectedStatus, setSelectedStatus] = useState("Все студенты");

  useEffect(() => {
    async function getStudents() {
      try {
        const res = await fetch(
          "https://69d7acf29c5ebb0918c82b63.mockapi.io/api/v1/students",
        );

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
      } catch (error) {
        console.error(error);
      }
    }

    getStudents();
  }, [setStudents]);

  useEffect(() => {
    setGroups([
      ...new Set(students.map((student) => student.group).filter(Boolean)),
    ]);
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesName = student.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGroup =
        selectedGroup === "Все группы" || student.group === selectedGroup;

      const average = getAverage(student);

      const matchesStatus =
        selectedStatus === "Все студенты" ||
        (selectedStatus === "Отличники" &&
          average !== null &&
          average >= 4.5 &&
          !hasDebt(student)) ||
        (selectedStatus === "Задолженности" && hasDebt(student)) ||
        (selectedStatus === "Без оценок" && average === null);

      return matchesName && matchesGroup && matchesStatus;
    });
  }, [students, search, selectedGroup, selectedStatus]);

  const studentsWithGrades = filteredStudents.filter(
    (student) => getAverage(student) !== null,
  );

  const averageScore = studentsWithGrades.length
    ? (
        studentsWithGrades.reduce(
          (sum, student) => sum + getAverage(student),
          0,
        ) / studentsWithGrades.length
      ).toFixed(2)
    : "—";

  const excellentCount = studentsWithGrades.filter((student) => {
    const average = getAverage(student);
    return average >= 4.5 && !hasDebt(student);
  }).length;

  const debtCount = filteredStudents.filter(hasDebt).length;

  const noGradesCount = filteredStudents.filter(
    (student) => getAverage(student) === null,
  ).length;

  return (
    <main className="performance-page">
      <header className="performance-header">
        <div>
          <span className="performance-eyebrow">УЧЕБНЫЙ ПРОЦЕСС</span>
          <h1>Успеваемость</h1>
          <p>Оценки, результаты и академические показатели студентов</p>
        </div>

        <div className="performance-period">
          <span>Учебный год</span>
          <strong>2026 / 2027</strong>
        </div>
      </header>

      <section className="performance-stats">
        <article className="performance-stat">
          <div className="stat-icon blue-icon">♙</div>
          <div>
            <span>Студентов</span>
            <strong>{filteredStudents.length}</strong>
            <small>В выбранной выборке</small>
          </div>
        </article>

        <article className="performance-stat">
          <div className="stat-icon green-icon">↗</div>
          <div>
            <span>Средний балл</span>
            <strong>{averageScore}</strong>
            <small>По всем оценкам</small>
          </div>
        </article>

        <article className="performance-stat">
          <div className="stat-icon purple-icon">★</div>
          <div>
            <span>Отличники</span>
            <strong>{excellentCount}</strong>
            <small>От 4,5 без задолженностей</small>
          </div>
        </article>

        <article className="performance-stat">
          <div className="stat-icon red-icon">!</div>
          <div>
            <span>Задолженности</span>
            <strong>{debtCount}</strong>
            <small>Есть оценки ниже 3</small>
          </div>
        </article>

        <article className="performance-stat">
          <div className="stat-icon red-icon">—</div>
          <div>
            <span>Без оценок</span>
            <strong>{noGradesCount}</strong>
            <small>Нет выставленных оценок</small>
          </div>
        </article>
      </section>

      <section className="performance-panel">
        <div className="performance-panel-heading">
          <div>
            <h2>Результаты студентов</h2>
            <p>Сводная ведомость оценок</p>
          </div>

          <span className="performance-count">
            Записей: {filteredStudents.length}
          </span>
        </div>

        <div className="performance-filters">
          <label className="performance-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Поиск студента..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
            aria-label="Фильтр по группе"
          >
            <option value="Все группы">Все группы</option>

            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            aria-label="Фильтр по успеваемости"
          >
            <option value="Все студенты">Все студенты</option>
            <option value="Отличники">Отличники</option>
            <option value="Задолженности">С задолженностями</option>
            <option value="Без оценок">Без оценок</option>
          </select>
        </div>

        <div className="performance-table-wrapper">
          <table className="performance-table">
            <thead>
              <tr>
                <th>Студент</th>
                <th>Группа</th>
                <th>Специальность</th>
                <th>Курс</th>
                <th>Оценки</th>
                <th>Средний балл</th>
                <th>Статус</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => {
                const average = getAverage(student);

                return (
                  <tr key={student.id}>
                    <td className="performance-student">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>
                      <span>{student.name}</span>
                    </td>

                    <td>
                      <span className="group-badge">
                        {student.group || "—"}
                      </span>
                    </td>

                    <td>{student.specialty || "—"}</td>

                    <td>{student.yearStudy || "—"}</td>

                    <td>
                      <div className="grades-list">
                        {student.grades.map((grade, index) => (
                          <span key={index} className={`grade grade-${grade}`}>
                            {grade}
                          </span>
                        ))}

                        {student.grades.length === 0 && "Нет оценок"}
                      </div>
                    </td>

                    <td>
                      <strong className="average-grade">
                        {average === null ? "—" : average.toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`performance-status ${
                          average === null
                            ? "status-warning"
                            : hasDebt(student)
                              ? "status-danger"
                              : average >= 4.5
                                ? "status-excellent"
                                : average >= 3.5
                                  ? "status-good"
                                  : "status-warning"
                        }`}
                      >
                        {getStatus(average, student)}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="performance-empty">
                    Студенты не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="performance-footer">
          <span>Показано студентов: {filteredStudents.length}</span>
          <span>Оценивание по пятибалльной шкале</span>
        </footer>
      </section>
    </main>
  );
}
