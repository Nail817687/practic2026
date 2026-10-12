import SliderHome from "../components/SliderHome";

export default function HomePage() {
  return (
    <div>
      <div className="container gray-bg">
        <SliderHome />
      </div>
      <div className="container gray-blue-bg">
        <div className="btw">
          <h3>Почему Хекслет</h3>
          <p>
            Всё, что нужно студенту колледжа, — в единой современной среде
            обучения.
          </p>
        </div>

        <div className="grid-btw">
          <div>
            <h4>Общеобразовательные курсы</h4>
            <p>
              Полный цикл ООД: языки, математика, естественные и общественные
              науки — 16 курсов.
            </p>
          </div>
          <div>
            <h4>Модули и специальность</h4>
            <p>
              Общеобязательные модули (ИКТ, экономика, соцнауки) и
              профессиональные модули специальности ТИС.
            </p>
          </div>
          <div>
            <h4>Расписание и журнал</h4>
            <p>
              Занятия по расписанию, учёт посещаемости и оценки — онлайн и
              всегда доступны.
            </p>
          </div>
          <div>
            <h4>Обратная связь</h4>
            <p>
              Задания с проверкой и комментариями преподавателя, тесты с
              мгновенным результатом.
            </p>
          </div>
        </div>
      </div>
      <div className="container gray-bg">
        <div className="about-box">
          <div className="about-txt">
            <h3>Колледж, где учат делом</h3>
            <p>
              Сотни студентов и десятки курсов в одной платформе.
              Общеобразовательные дисциплины, профессиональные модули и вся
              учебная жизнь колледжа — онлайн.
            </p>
          </div>
          <div className="rate-box-container">
            <div className="white-txt blue-box rate-box">
              <p style={{ fontSize: 60, marginBottom: 30 }}>648</p>
              <p style={{ fontSize: 17 }}>
                Активные пользователи, получающие доступ к нашим ресурсам
              </p>
            </div>
            <div className="white-txt dark-blue-box rate-box">
              <p style={{ fontSize: 60, marginBottom: 30 }}>21</p>
              <p style={{ fontSize: 17 }}>
                Созданные специально для вас курсы, которым вы можете доверять!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container gray-blue-bg">
        <div className="announcement">
          <div className="empty-block"></div>
          <div>
            <h3>Объявления сайта</h3>
            <div className="green-block">
              <p style={{ color: "#00434e" }}>Нет тем для обсуждения</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
