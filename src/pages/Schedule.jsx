import { useState } from "react";

const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const scheduleData = {
  Понедельник: [
    {
      time: "08:30–09:50",
      subject: "Веб-разработка",
      teacher: "Иванов И. И.",
      room: "Ауд. 204",
      type: "Лекция",
    },
    {
      time: "10:00–11:20",
      subject: "Программирование",
      teacher: "Петров А. С.",
      room: "Ауд. 312",
      type: "Практика",
    },
    {
      time: "11:40–13:00",
      subject: "Базы данных",
      teacher: "Сидорова Е. В.",
      room: "Ауд. 108",
      type: "Лабораторная",
    },
    {
      time: "13:30–14:50",
      subject: "Математика",
      teacher: "Ким Д. А.",
      room: "Ауд. 215",
      type: "Практика",
    },
  ],
  Вторник: [
    {
      time: "08:30–09:50",
      subject: "Операционные системы",
      teacher: "Смирнов П. В.",
      room: "Ауд. 301",
      type: "Лекция",
    },
    {
      time: "10:00–11:20",
      subject: "Веб-разработка",
      teacher: "Иванов И. И.",
      room: "Ауд. 204",
      type: "Практика",
    },
    {
      time: "11:40–13:00",
      subject: "Английский язык",
      teacher: "Ахметова А. К.",
      room: "Ауд. 115",
      type: "Практика",
    },
  ],
  Среда: [
    {
      time: "09:00–10:20",
      subject: "Программирование",
      teacher: "Петров А. С.",
      room: "Ауд. 312",
      type: "Лабораторная",
    },
    {
      time: "10:30–11:50",
      subject: "Базы данных",
      teacher: "Сидорова Е. В.",
      room: "Ауд. 108",
      type: "Лекция",
    },
    {
      time: "12:10–13:30",
      subject: "Физическая культура",
      teacher: "Орлов Н. М.",
      room: "Спортзал",
      type: "Практика",
    },
  ],
  Четверг: [
    {
      time: "08:30–09:50",
      subject: "Математика",
      teacher: "Ким Д. А.",
      room: "Ауд. 215",
      type: "Лекция",
    },
    {
      time: "10:00–11:20",
      subject: "Операционные системы",
      teacher: "Смирнов П. В.",
      room: "Ауд. 301",
      type: "Практика",
    },
    {
      time: "11:40–13:00",
      subject: "Программирование",
      teacher: "Петров А. С.",
      room: "Ауд. 312",
      type: "Лабораторная",
    },
  ],
  Пятница: [
    {
      time: "08:30–09:50",
      subject: "Веб-разработка",
      teacher: "Иванов И. И.",
      room: "Ауд. 204",
      type: "Практика",
    },
    {
      time: "10:00–11:20",
      subject: "Английский язык",
      teacher: "Ахметова А. К.",
      room: "Ауд. 115",
      type: "Практика",
    },
    {
      time: "11:40–13:00",
      subject: "Базы данных",
      teacher: "Сидорова Е. В.",
      room: "Ауд. 108",
      type: "Лабораторная",
    },
  ],
  Суббота: [],
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Понедельник");
  const [selectedGroup, setSelectedGroup] = useState("ИС-23");
  const [search, setSearch] = useState("");

  const lessons = (scheduleData[selectedDay] || []).filter((lesson) =>
    `${lesson.subject} ${lesson.teacher} ${lesson.room}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <main className="schedule-page">
      <header className="schedule-header">
        <div>
          <p className="schedule-subtitle">УЧЕБНЫЙ ПРОЦЕСС</p>
          <h1>Расписание занятий</h1>
          <p className="schedule-description">
            Учебные пары и информация о занятиях
          </p>
        </div>

        <div className="schedule-summary">
          <span>Занятий за день</span>
          <strong>{(scheduleData[selectedDay] || []).length}</strong>
        </div>
      </header>

      <section className="schedule-controls">
        <label className="schedule-group">
          <span>Учебная группа</span>
          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
          >
            <option value="ИС-23">ИС-23</option>
            <option value="ИС-24">ИС-24</option>
            <option value="П-23">П-23</option>
            <option value="П-24">П-24</option>
          </select>
        </label>

        <label className="schedule-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Найти предмет или преподавателя..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>

      <nav className="schedule-days">
        {days.map((day, index) => (
          <button
            key={day}
            type="button"
            className={`schedule-day ${selectedDay === day ? "active" : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            <span className="schedule-day-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{day}</span>
          </button>
        ))}
      </nav>

      <section className="schedule-panel">
        <div className="schedule-panel-header">
          <div>
            <h2>{selectedDay}</h2>
            <p>
              Группа {selectedGroup} · {lessons.length} занятий
              {lessons.length === 1 ? "е" : ""}
            </p>
          </div>

          <span className="schedule-calendar-icon">▦</span>
        </div>

        {lessons.length === 0 ? (
          <div className="schedule-empty">
            <span className="schedule-empty-icon">▦</span>
            <h3>Занятий не найдено</h3>
            <p>На этот день нет занятий или поиск не дал результатов.</p>
          </div>
        ) : (
          <div className="schedule-lessons">
            {lessons.map((lesson, index) => (
              <article
                className="schedule-lesson"
                key={`${selectedDay}-${lesson.time}-${lesson.subject}`}
              >
                <div className="lesson-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="lesson-time">
                  <strong>{lesson.time}</strong>
                  <span>{index + 1}-я пара</span>
                </div>

                <div className="lesson-main">
                  <h3>{lesson.subject}</h3>
                  <p>{lesson.teacher}</p>
                </div>

                <div className="lesson-details">
                  <span
                    className={`lesson-type ${
                      lesson.type === "Лекция"
                        ? "type-lecture"
                        : lesson.type === "Лабораторная"
                          ? "type-lab"
                          : "type-practice"
                    }`}
                  >
                    {lesson.type}
                  </span>
                  <span className="lesson-room">
                    <span>⌖</span> {lesson.room}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
