import { useContext, useEffect, useMemo } from "react";
import { StudentsContext } from "../context/StudentProvider";

export default function Statistics() {
  const { students, setStudents } = useContext(StudentsContext);

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

  const statistics = useMemo(() => {
    const getGrades = (student) =>
      student.grades
        .filter(
          (grade) =>
            grade !== "" && grade != null && Number.isFinite(Number(grade)),
        )
        .map(Number);

    const studentsWithGrades = students.filter(
      (student) => getGrades(student).length > 0,
    );

    const allGrades = students.flatMap(getGrades);

    const averageScore = allGrades.length
      ? (
          allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length
        ).toFixed(2)
      : "—";

    const excellent = students.filter((student) => {
      const grades = getGrades(student);

      return (
        grades.length > 0 &&
        grades.every((grade) => grade >= 3) &&
        grades.reduce((sum, grade) => sum + grade, 0) / grades.length >= 4.5
      );
    }).length;

    const debts = students.filter((student) =>
      getGrades(student).some((grade) => grade < 3),
    ).length;

    const withoutGrades = students.filter(
      (student) => getGrades(student).length === 0,
    ).length;

    const groups = students.reduce((result, student) => {
      const group = student.group || "Без группы";
      result[group] = (result[group] || 0) + 1;
      return result;
    }, {});

    const groupData = Object.entries(groups)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total: students.length,
      studentsWithGrades: studentsWithGrades.length,
      averageScore,
      excellent,
      debts,
      withoutGrades,
      groupData,
    };
  }, [students]);

  const maxGroupCount = Math.max(
    1,
    ...statistics.groupData.map((group) => group.count),
  );

  return (
    <main className="statistics-page">
      <header className="statistics-header">
        <div>
          <p className="statistics-subtitle">УЧЕБНЫЙ ПРОЦЕСС</p>
          <h1>Статистика</h1>
          <p className="statistics-description">
            Основные показатели успеваемости студентов
          </p>
        </div>

        <div className="statistics-date">
          <span>Всего студентов</span>
          <strong>{statistics.total}</strong>
        </div>
      </header>

      <section className="statistics-cards">
        <article className="stat-card stat-blue">
          <div className="stat-card-top">
            <span>Всего студентов</span>
            <span className="stat-icon">♙</span>
          </div>
          <strong>{statistics.total}</strong>
          <p>Общее количество учащихся</p>
        </article>

        <article className="stat-card stat-purple">
          <div className="stat-card-top">
            <span>Средний балл</span>
            <span className="stat-icon">▤</span>
          </div>
          <strong>{statistics.averageScore}</strong>
          <p>Среднее значение всех оценок</p>
        </article>

        <article className="stat-card stat-green">
          <div className="stat-card-top">
            <span>Отличники</span>
            <span className="stat-icon">★</span>
          </div>
          <strong>{statistics.excellent}</strong>
          <p>Средний балл от 4,5 без оценок ниже 3</p>
        </article>

        <article className="stat-card stat-orange">
          <div className="stat-card-top">
            <span>Задолженности</span>
            <span className="stat-icon">!</span>
          </div>
          <strong>{statistics.debts}</strong>
          <p>Студенты с оценками ниже 3</p>
        </article>
      </section>

      <section className="statistics-panels">
        <article className="statistics-panel">
          <div className="panel-heading">
            <div>
              <h2>Студенты по группам</h2>
              <p>Количество учащихся в каждой группе</p>
            </div>
            <span className="panel-icon">▥</span>
          </div>

          {statistics.groupData.length === 0 ? (
            <p className="statistics-empty">Нет данных о студентах</p>
          ) : (
            <div className="group-chart">
              {statistics.groupData.map((group) => (
                <div className="group-row" key={group.name}>
                  <div className="group-row-info">
                    <span>{group.name}</span>
                    <strong>{group.count}</strong>
                  </div>

                  <div className="group-bar">
                    <div
                      className="group-bar-fill"
                      style={{
                        width: `${(group.count / maxGroupCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="statistics-panel overview-panel">
          <div className="panel-heading">
            <div>
              <h2>Общая сводка</h2>
              <p>Состояние успеваемости</p>
            </div>
            <span className="panel-icon">◷</span>
          </div>

          <div className="overview-row">
            <span className="overview-marker marker-green" />
            <span>Отличники</span>
            <strong>{statistics.excellent}</strong>
          </div>

          <div className="overview-row">
            <span className="overview-marker marker-orange" />
            <span>С задолженностями</span>
            <strong>{statistics.debts}</strong>
          </div>

          <div className="overview-row">
            <span className="overview-marker marker-gray" />
            <span>Без оценок</span>
            <strong>{statistics.withoutGrades}</strong>
          </div>

          <div className="overview-row">
            <span className="overview-marker marker-blue" />
            <span>С оценками</span>
            <strong>{statistics.studentsWithGrades}</strong>
          </div>

          <div className="overview-footer">
            Статистика сформирована на основе данных студентов
          </div>
        </article>
      </section>
    </main>
  );
}
